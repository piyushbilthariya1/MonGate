import { ethers } from "ethers";
import { redis, redisKeys } from "../lib/redis.js";
import { db } from "../lib/db.js";
import dotenv from "dotenv";

dotenv.config();

const MONAD_RPC = process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz";
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

const ABI = [
  "event Deposit(address indexed user, uint256 amount)",
  "function getBalance(address user) view returns (uint256)"
];

/**
 * MonadListener: Monitors the blockchain for deposits and updates platform credits.
 */
export class MonadListener {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(MONAD_RPC);
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, this.provider);
  }

  async startListening() {
    console.log(`📡 [MONAD] Listening for Deposits on ${CONTRACT_ADDRESS}...`);

    this.contract.on("Deposit", async (userAddress: string, amount: bigint) => {
      console.log(`💰 [MONAD] Deposit Detected: ${userAddress} -> ${ethers.formatEther(amount)} MON`);

      try {
        // 1. Resolve Wallet Address to UserId
        const res = await db.query(
          "SELECT id FROM users WHERE wallet_address = $1",
          [userAddress]
        );

        if (res.rows.length === 0) {
          console.warn(`⚠️ [MONAD] Deposit from unknown wallet ${userAddress}. Ignoring.`);
          return;
        }

        const userId = res.rows[0].id;
        
        // 2. Conver MON amount to Credits (e.g., 1 MON = 1,000,000 Credits)
        const creditsToUpdate = Number(ethers.formatEther(amount)) * 1000000;

        // 3. Atomically update Redis balance
        const newBalance = await redis.incrby(redisKeys.userCredits(userId), creditsToUpdate);
        
        console.log(`✅ [MONAD] User ${userId} credits updated: +${creditsToUpdate}. New balance: ${newBalance}`);

      } catch (error) {
        console.error(`❌ [MONAD] Failed to process deposit for ${userAddress}:`, error);
      }
    });

    // Handle provider errors
    this.provider.on("error", (error) => {
      console.error("⛔ [MONAD] Provider Error:", error);
    });
  }
}
