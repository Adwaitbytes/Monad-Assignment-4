/**
 * Contract utilities and helper functions for AdwaitToken
 * 
 * This file contains reusable helper functions for working with the AdwaitToken contract.
 * Most contract interactions are done directly via Wagmi hooks in components.
 */

import { formatUnits, parseUnits } from 'viem';

/**
 * Format token amount from wei to human-readable format
 * @param amount Amount in wei (smallest unit)
 * @param decimals Token decimals (default: 18)
 * @returns Formatted string with commas
 */
export function formatTokenAmount(amount: bigint | undefined, decimals: number = 18): string {
  if (!amount) return '0';
  return parseFloat(formatUnits(amount, decimals)).toLocaleString('en-US', {
    maximumFractionDigits: 4,
  });
}

/**
 * Parse human-readable amount to wei
 * @param amount Human-readable amount (e.g., "100.5")
 * @param decimals Token decimals (default: 18)
 * @returns Amount in wei
 */
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  return parseUnits(amount, decimals);
}

/**
 * Shorten an Ethereum address for display
 * @param address Full address
 * @param chars Number of chars to show at start/end (default: 4)
 * @returns Shortened address (e.g., "0x1234...5678")
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Get role name from bytes32 hash
 * @param roleHash The keccak256 hash of the role
 * @returns Human-readable role name
 */
export function getRoleName(roleHash: string): string {
  const roles: Record<string, string> = {
    '0x0000000000000000000000000000000000000000000000000000000000000000': 'DEFAULT_ADMIN',
    '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6': 'MINTER',
  };
  return roles[roleHash] || 'UNKNOWN_ROLE';
}

/**
 * Check if an error is due to user rejection
 * @param error Error object
 * @returns True if user rejected the transaction
 */
export function isUserRejection(error: any): boolean {
  return (
    error?.message?.includes('User rejected') ||
    error?.message?.includes('User denied') ||
    error?.code === 4001
  );
}

/**
 * Get a user-friendly error message
 * @param error Error object
 * @returns User-friendly error message
 */
export function getErrorMessage(error: any): string {
  if (isUserRejection(error)) {
    return 'Transaction cancelled by user';
  }
  
  if (error?.message?.includes('EnforcedPause')) {
    return 'Contract is paused. Only admin can unpause it.';
  }
  
  if (error?.message?.includes('AccessControlUnauthorizedAccount')) {
    return 'You do not have permission to perform this action';
  }
  
  if (error?.message?.includes('ERC20InsufficientBalance')) {
    return 'Insufficient token balance';
  }
  
  return error?.message || 'Transaction failed';
}

