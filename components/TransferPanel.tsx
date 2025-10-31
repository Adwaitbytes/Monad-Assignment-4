'use client';

import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, ADWAIT_TOKEN_ABI } from '@/lib/wagmi';
import { isAddress, parseUnits } from 'viem';

export default function TransferPanel() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const { writeContractAsync, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAddress(recipientAddress)) {
      alert('Please enter a valid Ethereum address');
      return;
    }

    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const amountInWei = parseUnits(transferAmount, 18);
      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: ADWAIT_TOKEN_ABI,
        functionName: 'transfer',
        args: [recipientAddress as `0x${string}`, amountInWei],
      });
      setRecipientAddress('');
      setTransferAmount('');
    } catch (error) {
      console.error('Error transferring tokens:', error);
      alert('Failed to transfer tokens. Check your balance and ensure contract is not paused.');
    }
  };

  const isLoading = isPending || isConfirming;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Transfer Tokens</h3>
          <p className="text-sm text-gray-600">Send tokens to another address</p>
        </div>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">✅ Transfer completed successfully!</p>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-blue-100">
        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x... (Address to send tokens to)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (in tokens)
            </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="10"
              step="0.000000000000000001"
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter the amount of tokens you want to transfer (supports up to 18 decimals)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !recipientAddress || !transferAmount}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Transfer Tokens
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            <strong>⚠️ Note:</strong> Make sure you have enough tokens in your balance. 
            Transfers are blocked when the contract is paused.
          </p>
        </div>
      </div>
    </div>
  );
}
