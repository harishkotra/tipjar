"use client"; 
import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, Signer, Contract } from 'ethers';

const tipJarAddress = "0xdcfc07d4d03bb20f971898c194b10715a5d6af91"; 
const tipJarABI = [
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "InvalidInitialization",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotInitializing",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "version",
				"type": "uint64"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "rescueERC20",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_tokenSymbol",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_sourceChain",
				"type": "string"
			}
		],
		"name": "tip",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_sourceChain",
				"type": "string"
			}
		],
		"name": "tipNative",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sourceChain",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TipNativeReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tipper",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenSymbol",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "sourceChain",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TipReceived",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdrawEther",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawEther",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "WithdrawTokens",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "tipAt",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "tipper",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "tokenAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "tokenSymbol",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourceChain",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct UniversalTipJar.Tip",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTips",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const PUSH_TESTNET_CHAIN_ID = '42101';
const PUSH_TESTNET_CHAIN_ID_HEX = '0xA475';

// Only using native tipping now, so no need for ERC20 ABI or tokens
type Tip = { tipper: string; amount: string; tokenSymbol: string; sourceChain: string; timestamp: string; };

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  
  const [formInput, setFormInput] = useState({ amount: '', sourceChain: 'Polygon' });

  // Function to check network and handle wallet connection
  const connectAndCheckNetwork = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId.toString() !== PUSH_TESTNET_CHAIN_ID) {
        setIsWrongNetwork(true);
        try {
          // Prompt user to switch to Push Chain Testnet
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: PUSH_TESTNET_CHAIN_ID_HEX }],
          });
          // After switching, re-check connection
          const newProvider = new BrowserProvider(window.ethereum);
          const signer = await newProvider.getSigner();
          setAccount(await signer.getAddress());
          setIsWrongNetwork(false);

        } catch (switchError: any) {
          if (switchError.code === 4902) {
             alert('Please add Push Chain Testnet to your MetaMask and try again. RPC: https://testnet.push.org/rpc, ChainID: 42101');
          } else {
            console.error("Failed to switch network", switchError);
          }
          return;
        }
      }
      // If already on the correct network, just connect
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
      setIsWrongNetwork(false);

    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  useEffect(() => {
    if (account && !isWrongNetwork) {
      fetchTips();
    }
    
    // Add listeners for account and network changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', () => window.location.reload());
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
         if (accounts.length > 0) {
          setAccount(accounts[0]);
         } else {
          setAccount(null);
          setTips([]);
         }
      });
    }
  }, [account, isWrongNetwork]);


  async function fetchTips() {
    if (typeof window.ethereum === "undefined" || isWrongNetwork) return;
    setFetching(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(tipJarAddress, tipJarABI, provider);
      const tipCount = Number(await contract.totalTips());
      const tipsArray: Tip[] = [];

      for (let i = tipCount - 1; i >= 0; i--) {
        const tip = await contract.tipAt(i);
        // Your contract now correctly stores ETH as symbol "ETH"
        const formattedAmount = ethers.formatEther(tip.amount);

        tipsArray.push({
          tipper: tip.tipper,
          amount: formattedAmount,
          tokenSymbol: tip.tokenSymbol,
          sourceChain: tip.sourceChain,
          timestamp: new Date(Number(tip.timestamp) * 1000).toLocaleString()
        });
      }
      setTips(tipsArray);
    } catch (error) { console.error("Could not fetch tips:", error); }
    setFetching(false);
  }

  async function handleNativeTip() {
    if (!formInput.amount) return alert("Please enter an amount.");
    if (typeof window.ethereum === "undefined") return;
    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tipJarContract = new ethers.Contract(tipJarAddress, tipJarABI, signer);
      const tipAmountInEther = ethers.parseEther(formInput.amount);
      
      const tipTx = await tipJarContract.tipNative(formInput.sourceChain, { value: tipAmountInEther });
      await tipTx.wait();
      
      console.log("Tip sent successfully!");
      await fetchTips(); 
      setFormInput({ amount: '', sourceChain: 'Polygon' });
    } catch (error) { console.error("Native tip failed:", error); alert("Tipping failed."); }
    setLoading(false);
  }

  return (
    <main className="main">
      <h1 className="title">Universal Tip Jar ⚡️</h1>
      <p className="description">Powered by Push Chain</p>

      {!account ? (
        <button className="connect-button" onClick={connectAndCheckNetwork}>Connect Wallet</button>
      ) : (
        <div className="wallet-info">Connected: {`${account.slice(0, 6)}...${account.slice(-4)}`}</div>
      )}

      {isWrongNetwork && account && (
        <div className="card" style={{ borderColor: 'red', backgroundColor: '#fff5f5' }}>
          <h2 style={{ color: '#c53030' }}>Wrong Network</h2>
          <p>Please switch your MetaMask to the **Push Chain Testnet** to use this dApp.</p>
        </div>
      )}

      {account && !isWrongNetwork && (
        <div className="card">
          <h2>Send a Tip (Native PUSH)</h2>
          <input
            placeholder="Amount in PUSH (e.g., 0.01)"
            className="input"
            onChange={e => setFormInput({ ...formInput, amount: e.target.value })}
            value={formInput.amount}
            type="number"
          />
          <select
            className="input"
            value={formInput.sourceChain}
            onChange={e => setFormInput({ ...formInput, sourceChain: e.target.value })}
          >
            <option value="Polygon">Polygon</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Solana">Solana (Simulated)</option>
            <option value="Base">Base</option>
          </select>
          <button className="button" onClick={handleNativeTip} disabled={loading}>
            {loading ? "Sending..." : "Send Tip"}
          </button>
        </div>
      )}

      <div className="grid">
        <div className="grid-header">
          <h2>Live Tip Feed</h2>
          <button onClick={fetchTips} disabled={fetching || isWrongNetwork} className="refresh-button">
            {fetching ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {tips.length > 0 ? (
          tips.map((tip, index) => (
            <div key={index} className="tip-card">
              <p><b>From:</b> {`${tip.tipper.slice(0, 6)}...${tip.tipper.slice(-4)}`}</p>
              <p><b>Amount:</b> {tip.amount} {tip.tokenSymbol}</p>
              <p><b>Chain:</b> {tip.sourceChain}</p>
              <p><b>Time:</b> {tip.timestamp}</p>
            </div>
          ))
        ) : (
          <p>{fetching ? "Loading tips..." : "No tips yet. Be the first!"}</p>
        )}
      </div>
    </main>
  );
}