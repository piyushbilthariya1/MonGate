import { db } from "../lib/db.js";

interface AggregatedUsage {
  userId: string;
  wallet: string;
  totalTokens: number;
  totalCostMonad: number;
}

/**
 * AntiGravity Batcher: Aggregates usage logs for on-chain settlement.
 */
export class BatcherService {
  private static IS_RUNNING = false;

  static async runAggregation() {
    if (this.IS_RUNNING) return;
    this.IS_RUNNING = true;

    console.log("📊 [BATCHER] Starting usage aggregation...");

    try {
      // 1. Fetch pending logs with user wallet addresses
      const query = `
        SELECT 
          l.id, 
          l.consumer_id, 
          u1.wallet_address as consumer_wallet,
          l.staker_key_id, 
          u2.wallet_address as staker_wallet,
          l.tokens_in + l.tokens_out as total_tokens,
          l.cost_monad
        FROM api_logs l
        JOIN users u1 ON l.consumer_id = u1.id
        JOIN staked_keys s ON l.staker_key_id = s.id
        JOIN users u2 ON s.owner_id = u2.id
        WHERE l.tx_hash IS NULL
        LIMIT 1000
      `;

      const res = await db.query(query);

      if (res.rows.length === 0) {
        console.log("📊 [BATCHER] No pending logs to aggregate.");
        this.IS_RUNNING = false;
        return;
      }

      // 2. Aggregate counts
      const consumerSummary: Record<string, AggregatedUsage> = {};
      const stakerSummary: Record<string, AggregatedUsage> = {};
      const logIds: string[] = [];

      for (const row of res.rows) {
        logIds.push(row.id);

        // Aggregate Consumer Usage
        if (!consumerSummary[row.consumer_id]) {
          consumerSummary[row.consumer_id] = { 
            userId: row.consumer_id, 
            wallet: row.consumer_wallet, 
            totalTokens: 0, 
            totalCostMonad: 0 
          };
        }
        consumerSummary[row.consumer_id].totalTokens += row.total_tokens;
        consumerSummary[row.consumer_id].totalCostMonad += Number(row.cost_monad);

        // Aggregate Staker Earnings
        if (!stakerSummary[row.staker_wallet]) {
          stakerSummary[row.staker_wallet] = { 
            userId: row.staker_key_id, 
            wallet: row.staker_wallet, 
            totalTokens: 0, 
            totalCostMonad: 0 
          };
        }
        stakerSummary[row.staker_wallet].totalTokens += row.total_tokens;
        stakerSummary[row.staker_wallet].totalCostMonad += Number(row.cost_monad);
      }

      // 3. Generate Settlement Manifest
      const manifest = {
        batchId: `batch-${Date.now()}`,
        timestamp: new Date().toISOString(),
        consumers: Object.values(consumerSummary),
        stakers: Object.values(stakerSummary),
        logCount: logIds.length
      };

      console.log("📜 [BATCHER] Settlement Manifest Prepared:", JSON.stringify(manifest, null, 2));

      // 4. Mark logs as 'processing' (In a real scenario, update with batchId)
      const updateQuery = `
        UPDATE api_logs 
        SET tx_hash = $1 
        WHERE id = ANY($2)
      `;
      await db.query(updateQuery, [`PENDING_${manifest.batchId}`, logIds]);

      console.log(`✅ [BATCHER] Successfully aggregated ${logIds.length} logs.`);

    } catch (error) {
      console.error("❌ [BATCHER] Aggregation failed:", error);
    } finally {
      this.IS_RUNNING = false;
    }
  }

  static start(intervalMs: number = 300000) {
    setInterval(() => this.runAggregation(), intervalMs);
    console.log(`🚀 [BATCHER] Worker started with ${intervalMs / 1000}s interval.`);
  }
}
