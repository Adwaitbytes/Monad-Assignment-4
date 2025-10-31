# AdwaitToken DApp

A web interface for interacting with the AdwaitToken ERC20 smart contract deployed on Monad Testnet. This project was built as part of the Session 4 Workshop Assignment.

## Overview

This DApp provides a frontend interface for an ERC20 token contract with role-based access control. The application dynamically adapts its UI based on the connected wallet's permissions, showing only relevant features to each user.

**Role Capabilities:**
- **Admin**: Pause/unpause contract operations, grant or revoke minter permissions
- **Minter**: Create and distribute new tokens (when contract is active)
- **User**: Transfer tokens and view account balances

The interface automatically detects your wallet's role and displays the appropriate controls.

---

## Getting Started

### Prerequisites
- Node.js 18 or higher ([Download](https://nodejs.org/))
- MetaMask browser extension ([Install](https://metamask.io/download/))
- Test MON tokens from the Monad faucet
- Internet connection

### Network Configuration
Add Monad Testnet to MetaMask:
- Network Name: `Monad Testnet`
- RPC URL: `https://testnet-rpc.monad.xyz`
- Chain ID: `41454`
- Currency Symbol: `MON`

Get test tokens from the [Monad Faucet](https://faucet.monad.xyz/)

### Installation

```bash
# Navigate to project directory
cd frontend-workshop

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Features by Role

### Standard User
- View token statistics (total supply, personal balance, contract status)
- Transfer tokens to other addresses
- Check role permissions

### Minter
All standard user features, plus:
- Mint new tokens to any address
- Monitor total supply changes

### Admin
All features above, plus:
- Pause and unpause contract operations
- Grant minter role to addresses
- Revoke minter role from addresses

---

## Key Features

### Automatic Role Detection
The interface queries your connected wallet's permissions and displays only the relevant controls for your role.

### Live Data Updates
Token balances, total supply, and contract status refresh automatically every 3 seconds without manual page reloads.

### User Interface
- Color-coded panels for different role functions
- Responsive design for desktop and mobile devices
- Transaction loading states and confirmations
- Form validation before submission

### Error Handling
- Address format validation
- Balance checks before transfers
- Clear error messages for failed transactions
- Contract pause state warnings

---

## Usage Instructions

### Transferring Tokens
1. Locate the Transfer Tokens panel
2. Enter the recipient's wallet address
3. Specify the token amount
4. Submit the transaction and confirm in MetaMask
5. Wait for blockchain confirmation

### Minting Tokens (Minter Role Required)
1. Access the Minter Controls panel
2. Enter the recipient address and amount
3. Submit and confirm the transaction
4. The total supply will update after confirmation

### Managing Contract State (Admin Role Required)
1. Use the Admin Controls panel to pause or unpause
2. When paused, all transfers and minting operations are blocked
3. Unpause to restore normal contract functionality

### Managing Minter Roles (Admin Role Required)
1. Enter the target wallet address
2. Use "Grant Minter Role" to add permissions
3. Use "Revoke Minter Role" to remove permissions

---

## Technology Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Web3 Libraries**: 
  - Wagmi 2.x for contract interactions
  - Viem 2.x for Ethereum utilities
  - RainbowKit 2.x for wallet connectivity
- **Network**: Monad Testnet
- **Smart Contract**: OpenZeppelin ERC20, AccessControl, and Pausable modules

---

## 📁 Project Structure

```
frontend-workshop/
├── app/
│   ├── page.tsx              # Main app page with role detection
│   ├── layout.tsx            # Root layout with Web3 providers
│   └── globals.css           # Global styles
│
├── components/
│   ├── TokenStats.tsx        # Shows supply, balance, status
│   ├── AdminPanel.tsx        # Pause/unpause, role management
│   ├── MinterPanel.tsx       # Mint new tokens
│   ├── TransferPanel.tsx     # Send tokens to others
│   └── RoleBadges.tsx        # Visual role indicators
│
├── lib/
│   ├── wagmi.ts              # Web3 config + contract ABI
│   └── contract.ts           # Contract utilities (if needed)
│
└── public/                   # Static assets
```

---

## Configuration

### Contract Information
- Address: `0x415696d8de20e48fa218662fee430dc8857fb4ab`
- Network: Monad Testnet
- Token Name: AdwaitToken
- Symbol: ADWT
- Decimals: 18

Contract configuration can be modified in `lib/wagmi.ts`.

### WalletConnect Setup
Obtain a project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) and update `lib/wagmi.ts`:

```typescript
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID'
```

---

## Troubleshooting

### Wallet Connection Issues
- Verify MetaMask is unlocked and connected to Monad Testnet
- Refresh the page if connection fails
- Check browser console for error messages

### Transaction Failures
**Insufficient Permissions**: Your wallet lacks the required role for this operation. Contact an admin for role assignment.

**EnforcedPause Error**: The contract is currently paused. Only admins can unpause operations.

**Insufficient Balance**: Transaction amount exceeds your token balance.

### Installation Problems
- Ensure Node.js version 18 or higher is installed
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`
- Verify internet connectivity for package downloads

---

## Documentation References

- [Wagmi Documentation](https://wagmi.sh) - Web3 React hooks
- [RainbowKit Documentation](https://www.rainbowkit.com/) - Wallet connection
- [Next.js Documentation](https://nextjs.org/docs) - React framework
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) - Smart contract libraries
- [Monad Documentation](https://docs.monad.xyz/) - Monad blockchain

---

## Project Checklist

- [x] ERC20 token contract with role-based access control
- [x] Deployment to Monad Testnet
- [x] Frontend interface for token interactions
- [x] Admin controls (pause/unpause, role management)
- [x] Minter interface for token creation
- [x] Dynamic UI based on wallet permissions
- [x] Token transfer functionality
- [x] Real-time balance and supply updates
- [x] Form validation and error handling
- [x] Documentation

## License

MIT License - See LICENSE file for details.

## References

- Foundry Workshop Session 4 Assignment
- [Monad Testnet](https://monad.xyz/)
- [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
