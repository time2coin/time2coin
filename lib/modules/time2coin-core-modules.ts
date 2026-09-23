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
