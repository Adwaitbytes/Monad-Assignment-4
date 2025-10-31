'use client';

import { useAccount, useReadContract } from 'wagmi';
import { CONTRACT_ADDRESS, ADWAIT_TOKEN_ABI } from '@/lib/wagmi';
import { formatUnits } from 'viem';

export default function TokenStats() {
  const { address } = useAccount();

  const { data: name } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'totalSupply',
    query: {
      refetchInterval: 3000,
    },
  });

  const { data: userBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 3000,
    },
  });

  const { data: isPaused } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'paused',
    query: {
      refetchInterval: 3000,
    },
  });

  const formatTokenAmount = (amount: bigint | undefined) => {
    if (!amount) return '0';
    return parseFloat(formatUnits(amount, 18)).toLocaleString('en-US', {
      maximumFractionDigits: 4,
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {name || 'AdwaitToken'} ({symbol || 'ADWT'})
          </h2>
          <p className="text-sm text-gray-600 mt-1 font-mono">{CONTRACT_ADDRESS}</p>
        </div>
        <div className="flex items-center gap-2">
          {isPaused ? (
            <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              Paused
            </span>
          ) : (
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Supply</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatTokenAmount(totalSupply as bigint)} {symbol || 'ADWT'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Your Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {address ? `${formatTokenAmount(userBalance as bigint)} ${symbol || 'ADWT'}` : 'Connect Wallet'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
