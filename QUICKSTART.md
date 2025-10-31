# 🚀 Quick Start Guide

## For Complete Beginners

### 1️⃣ Install Node.js
Download from: https://nodejs.org/ (get the LTS version - the one that says "Recommended")

### 2️⃣ Install MetaMask
- Go to: https://metamask.io/download/
- Click "Install MetaMask for Chrome" (or your browser)
- Follow the setup wizard

### 3️⃣ Add Monad Testnet to MetaMask
1. Open MetaMask
2. Click the network dropdown (says "Ethereum Mainnet")
3. Click "Add Network" → "Add a network manually"
4. Fill in:
   - **Network name**: `Monad Testnet`
   - **RPC URL**: `https://testnet-rpc.monad.xyz`
   - **Chain ID**: `41454`
   - **Currency symbol**: `MON`
5. Click "Save"

### 4️⃣ Get Test MON Tokens
- Go to: https://faucet.monad.xyz/
- Paste your wallet address
- Click "Request MON"
- Wait a few seconds

### 5️⃣ Run the App
Open terminal (Command Prompt on Windows, Terminal on Mac):

```bash
cd frontend-workshop
npm install
npm run dev
```

### 6️⃣ Open in Browser
Go to: http://localhost:3000

### 7️⃣ Connect Your Wallet
Click "Connect Wallet" button → Select MetaMask → Approve

---

## Common Terminal Commands

```bash
# Go into project folder
cd frontend-workshop

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Stop the server
Press Ctrl+C

# Build for production
npm run build

# Run production build
npm start
```

---

## Wallet Shortcuts

- **Open MetaMask**: Click the fox icon in your browser
- **Switch Network**: Click network name at top
- **View Address**: Click account name to copy
- **Add Test MON**: Same as step 4 above

---

## Need Help?

1. **App won't start**: Make sure Node.js is installed (run `node --version`)
2. **Can't connect wallet**: Check you're on Monad Testnet in MetaMask
3. **Transaction fails**: Make sure you have test MON for gas
4. **Button is gray**: You might not have the required role

Check the full README.md for detailed troubleshooting!

---

**That's it! You're ready to go! 🎉**
