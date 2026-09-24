/**
 * time2coin Comprehensive Modular Application Engine
 * File: lib/modules/time2coin-core-modules.ts
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';
import * as ed from '@noble/ed25519';

// =================================================================------------
// MODULE 1: AUTH, USER PROFILES, DOUBLE-BLIND RATINGS & TRUST GATES
// =================================================================------------

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  timeBalanceMinutes: number;
  trustScore: number;
  totalCompletedExchanges: number;
  isBlacklistedByMerchants?: string[];
}

export function calculateUpdatedTrustScore(
  currentScore: number,
  totalReviews: number,
  newRating: number
): { newTrustScore: number; updatedCount: number } {
  if (newRating < 1 || newRating > 5) throw new Error('Rating must be between 1 and 5 stars.');
  const updatedCount = totalReviews + 1;
  const newTrustScore = Number(((currentScore * totalReviews + newRating) / updatedCount).toFixed(2));
  return { newTrustScore, updatedCount };
}

export function checkMerchantTrustGate(
  user: UserProfile,
  merchantId: string,
  minTrustThreshold: number = 4.5,
  minCompletedTrades: number = 3
): { eligible: boolean; reason?: string } {
  if (user.isBlacklistedByMerchants?.includes(merchantId)) {
    return { eligible: false, reason: 'User has been blocked by this merchant due to past performance.' };
  }
  if (user.totalCompletedExchanges < minCompletedTrades) {
    return { eligible: false, reason: `Requires at least ${minCompletedTrades} completed peer-to-peer time trades.` };
  }
  if (user.trustScore < minTrustThreshold) {
    return { eligible: false, reason: `Requires a minimum trust score of ${minTrustThreshold}★.` };
  }
  return { eligible: true };
}

// =================================================================------------
// MODULE 2: LEDGER CORE & ESCROW STATE MACHINE
// =================================================================------------

export type TransactionStatus = 
  | 'REQUESTED' | 'ESCROW_LOCKED' | 'SERVICE_DELIVERED' | 'VERIFIED_AND_PAID' | 'DISPUTED' | 'RATED';

export interface Feature5Split {
  grossMinutes: number;
  netReceiverMinutes: number;
  mutualAidMinutes: number;
  maintainerMinutes: number;
}

export function calculateFeature5Split(grossMinutes: number): Feature5Split {
  if (grossMinutes <= 0) throw new Error('Gross duration must be greater than zero.');
  const netReceiverMinutes = Math.floor(grossMinutes * 0.95);
  const totalReserve = grossMinutes - netReceiverMinutes;
  const mutualAidMinutes = Number((totalReserve * 0.8).toFixed(2));
  const maintainerMinutes = Number((totalReserve * 0.2).toFixed(2));

  return { grossMinutes, netReceiverMinutes, mutualAidMinutes, maintainerMinutes };
}

// =================================================================------------
// MODULE 4: OFFLINE BLE MESH, ED25519 & GOSSIP PROTOCOL
// =================================================================------------

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
  synced: number; // 0 = false, 1 = true
  replicatedPeersCount: number;
}

interface Time2CoinOfflineDB extends DBSchema {
  transactions: {
    key: number;
    value: OfflineTransactionReceipt;
    indexes: {
      'by-synced': number;
      'by-nonce': string;
    };
  };
  keys: {
    key: string;
    value: { publicKey: string; privateKey: string };
  };
  gossip_cache: {
    key: string;
    value: { nonce: string; rawReceipt: OfflineTransactionReceipt; receivedAt: number };
  };
}

// =================================================================------------
// MODULE 5 & 6: MERCHANT CLEARINGHOUSE, B2B CSR & FRAUD SHIELD
// =================================================================------------

export function checkMerchantSettlementEligibility(
  accumulatedTimeCoins: number,
  minThresholdMinutes: number = 500
): { eligible: boolean; minsShort: number } {
  if (accumulatedTimeCoins >= minThresholdMinutes) return { eligible: true, minsShort: 0 };
  return { eligible: false, minsShort: minThresholdMinutes - accumulatedTimeCoins };
}

export function evaluateTransactionForFraud(
  recentRedemptionsInHour: number,
  merchantAverageHourlyRate: number
): { flagForAudit: boolean; reason?: string } {
  if (recentRedemptionsInHour > merchantAverageHourlyRate * 5 && recentRedemptionsInHour > 30) {
    return { flagForAudit: true, reason: 'Automated Fraud Trigger: Unusual redemption surge detected. Transaction placed on AUDIT_HOLD.' };
  }
  return { flagForAudit: false };
}
