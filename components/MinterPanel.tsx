'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, ADWAIT_TOKEN_ABI } from '@/lib/wagmi';
import { isAddress, parseUnits } from 'viem';

export default function MinterPanel() {
  const [mintAddress, setMintAddress] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAddress(mintAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    if (!mintAmount || parseFloat(mintAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const amountInWei = parseUnits(mintAmount, 18);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'mint',
        args: [mintAddress as `0x${string}`, amountInWei],
      });
      setMintAddress('');
      setMintAmount('');
    } catch (error) {
      console.error('Error minting tokens:', error);
      alert('Failed to mint tokens. Make sure you have MINTER role and contract is not paused.');
    }
  };

  const isLoading = isPending || isConfirming;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Minter Controls</h3>
          <p className="text-sm text-gray-600">Mint new tokens to any address</p>
        </div>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">✅ Tokens minted successfully!</p>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-emerald-100">
        <form onSubmit={handleMint} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={mintAddress}
              onChange={(e) => setMintAddress(e.target.value)}
              placeholder="0x... (Address to receive tokens)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (in tokens)
            </label>
            <input
              type="number"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              placeholder="100"
              step="0.000000000000000001"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter the amount of tokens you want to mint (supports up to 18 decimals)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !mintAddress || !mintAmount}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {isPending ? 'Awaiting Confirmation...' : 'Confirming Transaction...'}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Mint Tokens
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Only accounts with the MINTER role can mint tokens. 
            The contract must not be paused for minting to work.
          </p>
        </div>
      </div>
    </div>
  );
}
