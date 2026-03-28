import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

export async function initDb() {
  const schema = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      wallet_address TEXT UNIQUE NOT NULL,
      master_key_hash TEXT UNIQUE NOT NULL,
      total_spent BIGINT DEFAULT 0,
      total_earned BIGINT DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS staked_keys (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      owner_id UUID REFERENCES users(id),
      provider TEXT NOT NULL,
      encrypted_key TEXT NOT NULL,
      spend_limit BIGINT DEFAULT 1000000,
      current_usage BIGINT DEFAULT 0,
      status TEXT DEFAULT 'active',
      health_score FLOAT DEFAULT 1.0,
      last_used TIMESTAMP WITH TIME ZONE
    );

    CREATE TABLE IF NOT EXISTS api_logs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      consumer_id UUID REFERENCES users(id),
      staker_key_id UUID REFERENCES staked_keys(id),
      tokens_in INTEGER,
      tokens_out INTEGER,
      cost_monad BIGINT,
      status_code INTEGER,
      ip_address TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await db.query(schema);
    console.log("✅ Database schema initialized.");
  } catch (error) {
    console.error("❌ Failed to initialize database schema:", error);
    throw error;
  }
}
