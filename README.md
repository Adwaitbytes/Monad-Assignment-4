# 🪙 AdwaitToken DApp

> A beautiful, modern frontend for interacting with the AdwaitToken ERC20 smart contract on Monad Testnet. Built for Session 4 Workshop Assignment.

![Status](https://img.shields.io/badge/status-live-success)
![Network](https://img.shields.io/badge/network-Monad%20Testnet-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ What This Does

This is a **fully functional Web3 DApp** that lets you interact with an ERC20 token contract that has role-based permissions. Think of it like a mini token management dashboard where different users can do different things based on their roles.

**In plain English:**
- 👑 **Admins** can control everything - pause the whole system, give people minting powers
- 🎨 **Minters** can create new tokens out of thin air
- 👤 **Regular users** can send tokens to each other

The UI automatically detects what permissions you have and shows you only what you can actually do. No confusing buttons that don't work!

---

## 🚀 Getting Started (For Non-Developers)

### What You Need
1. A computer with internet 😄
2. **MetaMask** browser extension ([Install here](https://metamask.io/download/))
3. Some test MON tokens (free from Monad faucet)
4. **Node.js** installed ([Download here](https://nodejs.org/) - get the LTS version)

### Step 1: Get Your Wallet Ready
1. Install MetaMask if you haven't
2. Add Monad Testnet to MetaMask:
   - Network Name: `Monad Testnet`
   - RPC URL: `https://testnet-rpc.monad.xyz`
   - Chain ID: `41454`
   - Currency Symbol: `MON`
3. Get free test MON from the [Monad Faucet](https://faucet.monad.xyz/)

### Step 2: Run This App
Open your terminal (Command Prompt on Windows, Terminal on Mac) and type:

```bash
# 1. Go to the project folder
cd frontend-workshop

# 2. Install everything (this might take a minute)
npm install

# 3. Start the app
npm run dev
```

You'll see something like `ready - started server on http://localhost:3000`

### Step 3: Open It!
Go to your browser and visit: **http://localhost:3000**

That's it! Click "Connect Wallet" and start playing around! 🎉

---

## 🎯 What Can You Actually Do?

### For Everyone (Regular Users)
- ✅ **See Token Stats**: Check total supply, your balance, if contract is paused
- ✅ **Transfer Tokens**: Send ADW tokens to your friends (or yourself from another wallet)
- ✅ **View Roles**: See if you have any special permissions

### For Minters (The Token Creators)
Everything above, plus:
- 🪙 **Mint Tokens**: Create brand new tokens and send them to anyone
- 📊 **Watch Supply Grow**: See the total supply increase as you mint

### For Admins (The Big Bosses)
Everything above, plus:
- ⏸️ **Pause Contract**: Freeze all transfers and minting (emergency brake)
- ▶️ **Unpause Contract**: Resume normal operations
- ➕ **Grant Minter Role**: Give someone permission to mint tokens
- ➖ **Revoke Minter Role**: Take away someone's minting powers

---

## 🎨 Features That Make This Special

### Smart Role Detection
The app looks at your wallet and automatically shows/hides features based on what you're allowed to do. No clutter!

### Real-Time Updates
Your balance, total supply, and contract status update automatically every few seconds. No need to refresh!

### Beautiful Design
- Gradient backgrounds and smooth animations
- Color-coded panels (red for admin, green for minter, blue for transfers)
- Responsive on phones, tablets, and desktops
- Loading states so you always know what's happening

### Error Prevention
- Can't submit empty forms
- Address validation (won't let you send to invalid addresses)
- Clear error messages when something goes wrong
- Warnings when contract is paused

---

## 📱 How to Use It (Step-by-Step)

### Transferring Tokens
1. Find the **"Transfer Tokens"** panel (blue background)
2. Paste the recipient's wallet address
3. Type how many tokens (e.g., `100`)
4. Click **"Transfer Tokens"**
5. Confirm in MetaMask
6. Wait a few seconds - done! ✅

### Minting New Tokens (If You're a Minter)
1. Find the **"Minter Controls"** panel (green background)
2. Paste who should receive the tokens
3. Type the amount (e.g., `1000`)
4. Click **"Mint Tokens"**
5. Confirm in MetaMask
6. Watch the total supply go up! 📈

### Pausing the Contract (If You're an Admin)
1. Find **"Admin Controls"** panel (red/pink background)
2. Click **"Pause Contract"**
3. Confirm in MetaMask
4. The status badge will turn red
5. Try transferring - it won't work! (That's the point)
6. Click **"Unpause Contract"** to fix it

---

## 🛠️ Tech Stack (For Developers)

Built with the latest and greatest:

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript (fully typed!)
- **Styling**: Tailwind CSS 4 (new version!)
- **Web3**: 
  - Wagmi 2.x (for contract interactions)
  - Viem 2.x (low-level Ethereum interactions)
  - RainbowKit 2.x (beautiful wallet connection)
- **Network**: Monad Testnet
- **Smart Contract**: OpenZeppelin ERC20 + AccessControl + Pausable

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

## 🔧 Configuration

### Contract Details
- **Address**: `0x415696d8de20e48fa218662fee430dc8857fb4ab`
- **Network**: Monad Testnet
- **Token Name**: AdwaitToken
- **Symbol**: ADWT
- **Decimals**: 18

You can change these in `lib/wagmi.ts` if you deploy your own contract!

### WalletConnect Project ID
To use WalletConnect, get a free project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) and update it in `lib/wagmi.ts`:

```typescript
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID'
```

---

## 🐛 Common Issues & Solutions

### "Cannot connect wallet"
- Make sure MetaMask is unlocked
- Check you're on Monad Testnet (not Ethereum mainnet!)
- Try refreshing the page

### "Transaction failed: insufficient permissions"
- You don't have the required role for that action
- Ask an admin to grant you the role

### "Execution reverted: EnforcedPause"
- The contract is paused!
- Only an admin can unpause it
- Check the status badge at the top

### "Not enough balance"
- You're trying to send more tokens than you have
- Check your balance in the stats panel

### App won't start / npm install fails
- Make sure you have Node.js 18 or higher
- Try deleting `node_modules` and running `npm install` again
- Check your internet connection

---

## 🎓 Learning Resources

Want to understand how this works? Check out:

- [Wagmi Documentation](https://wagmi.sh) - React hooks for Web3
- [RainbowKit Docs](https://www.rainbowkit.com/) - Wallet connection UI
- [Next.js App Router](https://nextjs.org/docs) - Modern React framework
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/) - Secure smart contract library
- [Monad Docs](https://docs.monad.xyz/) - Learn about Monad blockchain

---

## 📝 Assignment Checklist

✅ ERC20 token contract with roles (Admin + Minter)  
✅ Deployment to Monad Testnet  
✅ Frontend for token interaction  
✅ Admin UI (pause/unpause, role management)  
✅ Minter UI (mint tokens)  
✅ Dynamic UI based on connected wallet  
✅ Transfer functionality  
✅ Balance display  
✅ Real-time updates  
✅ Beautiful, modern design  
✅ Error handling  
✅ Documentation (you're reading it!)  

---

## 🤝 Contributing

Found a bug? Want to add a feature? Feel free to:
1. Fork this repo
2. Make your changes
3. Submit a pull request

All contributions welcome! 💙

---

## 📄 License

MIT License - do whatever you want with this code! Learn, modify, share.

---

## 🙏 Acknowledgments

- Built for the Foundry Workshop Session 4 Assignment
- Powered by [Monad Testnet](https://monad.xyz/)
- UI inspired by modern DeFi applications
- OpenZeppelin for battle-tested smart contract libraries

---

## 📞 Questions?

If you're stuck or something isn't working:
1. Check the **Common Issues** section above
2. Read the error message carefully (they're usually helpful!)
3. Try searching the error on Google
4. Ask in the workshop Discord/Telegram

---

**Made with ❤️ and lots of ☕**

*Happy minting! 🪙*
