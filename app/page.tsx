'use client';

import { useAccount, useReadContract } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import TokenStats from '@/components/TokenStats';
import AdminPanel from '@/components/AdminPanel';
import MinterPanel from '@/components/MinterPanel';
import TransferPanel from '@/components/TransferPanel';
import RoleBadges from '@/components/RoleBadges';
import { CONTRACT_ADDRESS, ADWAIT_TOKEN_ABI } from '@/lib/wagmi';

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: isAdmin } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'isAdmin',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: isMinter } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: ADWAIT_TOKEN_ABI,
    functionName: 'isMinter',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AdwaitToken DApp
                  </h1>
                  <p className="text-xs text-gray-600">ERC20 with Role-Based Access Control</p>
                </div>
              </div>
              <RoleBadges />
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-2xl p-12 text-center max-w-md">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome!</h2>
              <p className="text-gray-600 mb-8">
                Connect your wallet to interact with the AdwaitToken smart contract. 
                View your balance, transfer tokens, and access role-based features.
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <TokenStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {isAdmin && <AdminPanel />}
                {isMinter && <MinterPanel />}
                {!isAdmin && !isMinter && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">No Special Roles</h3>
                      <p className="text-gray-500 text-sm">
                        You don't have ADMIN or MINTER roles. You can still view token stats and transfer your tokens below.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <TransferPanel />
                
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About Roles
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex gap-3">
                      <span className="text-red-600 font-bold">🔐</span>
                      <div>
                        <strong className="text-red-600">ADMIN:</strong> Can pause/unpause the contract and grant/revoke minter roles
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-emerald-600 font-bold">🪙</span>
                      <div>
                        <strong className="text-emerald-600">MINTER:</strong> Can mint new tokens to any address (when not paused)
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-blue-600 font-bold">👤</span>
                      <div>
                        <strong className="text-blue-600">USER:</strong> Can transfer tokens and view balances
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-8 text-center border-t border-gray-200 mt-16">
        <p className="text-gray-600 text-sm mb-2">
          Built with Next.js, TypeScript, Tailwind CSS, Wagmi, and RainbowKit
        </p>
        <p className="text-gray-500 text-xs">
          Deployed on Monad Testnet • Contract: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
        </p>
      </footer>
    </div>
  );
}