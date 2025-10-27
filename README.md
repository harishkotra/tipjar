# Universal Tip Jar ⚡️

A simple dApp demonstrating a cross-chain tipping platform, built for the **Push Chain Hackathon**.

## Core Concept

Creators and projects have audiences across many blockchains (Ethereum, Polygon, Solana, etc.), but their supporters can't easily tip them without the friction of bridging assets.

The Universal Tip Jar is a Minimum Viable Product (MVP) that solves this. It's a single smart contract deployed on the **Push Chain Testnet** that can accept tips *representing* users from any blockchain. This showcases the "shared app experience" vision of Push Chain, where a single dApp serves a universal audience.

[Deployed Contract](https://donut.push.network/address/0xdCFc07D4D03bB20F971898c194B10715a5d6Af91?tab=txs)

<img width="1355" height="990" alt="image" src="https://github.com/user-attachments/assets/64a1f2a3-b384-4955-aceb-764b8c00fb7c" />


## Key Features

*   **Tip with Native Currency:** Send tips using the native currency of the connected chain (e.g., test PUSH on Push Chain Testnet).
*   **Simulate Cross-Chain Tipping:** A dropdown menu allows users to specify their "source chain" (e.g., Polygon, Solana), which is recorded on-chain with the tip.
*   **Live Tip Feed:** A real-time feed displays all tips sent to the contract, showing the tipper's address, amount, and simulated source chain.
*   **Connect with MetaMask:** Simple, one-click wallet connection.
*   **Built on Push Chain:** The smart contract is deployed and operates on the Push Chain Testnet.

## Tech Stack

*   **Smart Contract:** Solidity, OpenZeppelin Upgradeable
*   **Frontend:** Next.js (App Router), React, TypeScript
*   **Blockchain Interaction:** Ethers.js
*   **Deployment:** Remix IDE
*   **Network:** Push Chain Testnet

## Getting Started: Running Locally

Follow these steps to run the dApp on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v16+)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [MetaMask](https://metamask.io/) browser extension

### 1. Clone the Repository

```bash
git clone https://github.com/harishkotra/tipjar
cd tipjar
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure the Smart Contract

You need to deploy the `UniversalTipJar.sol` contract to a testnet first. We recommend using the **Push Chain Testnet**.

*   **Deploy the contract** using Remix IDE (as per the previous instructions).
*   **Crucially, call the `initialize()` function** after deployment.
*   Copy the deployed contract address and its ABI.

Once you have them, open `app/page.tsx` and replace the placeholder values:

```tsx
// app/page.tsx

// --- PASTE YOUR DEPLOYED CONTRACT ADDRESS AND ABI HERE ---
const tipJarAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; 
const tipJarABI = [ /* YOUR_CONTRACT_ABI */ ];

// --- CONFIGURE THE CORRECT NETWORK ---
const PUSH_TESTNET_CHAIN_ID = '42101'; // Push Chain Testnet
```

### 4. Configure MetaMask

Add the Push Chain Testnet to your MetaMask:
*   **Network Name:** Push Chain Testnet
*   **New RPC URL:** `https://testnet.push.org/rpc`
*   **Chain ID:** `42101`
*   **Currency Symbol:** `PUSH`
*   Get test tokens from the faucet in the [Push Protocol Discord](https://discord.gg/pushprotocol).

### 5. Run the dApp

```bash
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000) to see the dApp in action. Make sure your MetaMask is connected to the Push Chain Testnet.
