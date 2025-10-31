'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, ADWAIT_TOKEN_ABI } from '@/lib/wagmi';
import { isAddress } from 'viem';

export default function AdminPanel() {
  const [minterAddress, setMinterAddress] = useState('');
  const [revokeAddress, setRevokeAddress] = useState('');
  const [actionType, setActionType] = useState<'pause' | 'unpause' | 'grant' | 'revoke' | null>(null);

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handlePause = async () => {
    try {
      setActionType('pause');
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'pause',
      });
    } catch (error) {
      console.error('Error pausing contract:', error);
      alert('Failed to pause contract. Make sure you have ADMIN role.');
    } finally {
      setActionType(null);
    }
  };

  const handleUnpause = async () => {
    try {
      setActionType('unpause');
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'unpause',
      });
    } catch (error) {
      console.error('Error unpausing contract:', error);
      alert('Failed to unpause contract. Make sure you have ADMIN role.');
    } finally {
      setActionType(null);
    }
  };

  const handleGrantMinter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddress(minterAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      setActionType('grant');
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'grantMinterRole',
        args: [minterAddress as `0x${string}`],
      });
      setMinterAddress('');
    } catch (error) {
      console.error('Error granting minter role:', error);
      alert('Failed to grant minter role. Make sure you have ADMIN role.');
    } finally {
      setActionType(null);
    }
  };

  const handleRevokeMinter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAddress(revokeAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    try {
      setActionType('revoke');
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'revokeMinterRole',
        args: [revokeAddress as `0x${string}`],
      });
      setRevokeAddress('');
    } catch (error) {
      console.error('Error revoking minter role:', error);
      alert('Failed to revoke minter role. Make sure you have ADMIN role.');
    } finally {
      setActionType(null);
    }
  };

  const isLoading = isPending || isConfirming;

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Admin Controls</h3>
          <p className="text-sm text-gray-600">Manage contract state and roles</p>
        </div>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">✅ Transaction confirmed!</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Pause/Unpause Controls */}
        <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-red-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pause Controls
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Pause to stop all transfers and minting. Unpause to resume normal operations.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handlePause}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading && actionType === 'pause' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                '⏸️ Pause Contract'
              )}
            </button>
            <button
              onClick={handleUnpause}
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading && actionType === 'unpause' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                '▶️ Unpause Contract'
              )}
            </button>
          </div>
        </div>

        {/* Grant Minter Role */}
        <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-orange-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Grant Minter Role
          </h4>
          <form onSubmit={handleGrantMinter} className="space-y-3">
            <input
              type="text"
              value={minterAddress}
              onChange={(e) => setMinterAddress(e.target.value)}
              placeholder="0x... (Address to grant minter role)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !minterAddress}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading && actionType === 'grant' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                '✅ Grant Minter Role'
              )}
            </button>
          </form>
        </div>

        {/* Revoke Minter Role */}
        <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-red-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
            </svg>
            Revoke Minter Role
          </h4>
          <form onSubmit={handleRevokeMinter} className="space-y-3">
            <input
              type="text"
              value={revokeAddress}
              onChange={(e) => setRevokeAddress(e.target.value)}
              placeholder="0x... (Address to revoke minter role)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || !revokeAddress}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {isLoading && actionType === 'revoke' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                '❌ Revoke Minter Role'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
