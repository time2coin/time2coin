/**
 * time2coin P2P Web Bluetooth (BLE) & Cryptographic Offline Sync Module
 * File: lib/modules/time2coin-bluetooth-p2p.ts
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import * as ed from '@noble/ed25519';

export interface OfflineTransactionReceipt {
  id?: number;
  nonce: string;
  senderId: string;
  receiverId: string;
  grossMinutes: number;
  timestamp: number;
  serviceTitle: string;
  senderSignature: string;
  receiverSignature?: string;
  synced: boolean;
  replicatedPeersCount: number;
}

interface Time2CoinOfflineDB extends DBSchema {
  transactions: { key: number; value: OfflineTransactionReceipt; indexes: { 'by-synced': boolean; 'by-nonce': string } };
  keys: { key: string; value: { publicKey: string; privateKey: string } };
  gossip_cache: { key: string; value: { nonce: string; rawReceipt: OfflineTransactionReceipt; receivedAt: number } };
}

export const TIME2COIN_BLE_SERVICE_UUID = 'e48a0001-8b21-4f1a-b892-9a0022334455';
export const TIME2COIN_BLE_CHARACTERISTIC_UUID = 'e48a0002-8b21-4f1a-b892-9a0022334455';

let dbPromise: Promise<IDBPDatabase<Time2CoinOfflineDB>> | null = null;

export function getOfflineDB() {
  if (!dbPromise) {
    dbPromise = openDB<Time2CoinOfflineDB>('time2coin-offline-ledger', 2, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('transactions')) {
          const txStore = db.createObjectStore('transactions', { keyPath: 'id', autoIncrement: true });
          txStore.createIndex('by-synced', 'synced');
          txStore.createIndex('by-nonce', 'nonce', { unique: true });
        }
        if (!db.objectStoreNames.contains('keys')) db.createObjectStore('keys');
        if (!db.objectStoreNames.contains('gossip_cache')) db.createObjectStore('gossip_cache', { keyPath: 'nonce' });
      },
    });
  }
  return dbPromise;
}

export async function gossipSyncWithNearbyPeer(peerReceipts: OfflineTransactionReceipt[]): Promise<number> {
  const db = await getOfflineDB();
  let newReceiptsSaved = 0;

  for (const receipt of peerReceipts) {
    const existing = await db.get('gossip_cache', receipt.nonce);
    if (!existing) {
      await db.put('gossip_cache', { nonce: receipt.nonce, rawReceipt: receipt, receivedAt: Date.now() });
      newReceiptsSaved++;
    }
  }
  return newReceiptsSaved;
}
