# 🛸 Backend Strategy: AntiGravity API Bridge (Monad Powered)

This document outlines the backend architecture for the AntiGravity API Bridge. The backend is designed for ultra-high throughput to handle thousands of concurrent AI inference proxies while ensuring decentralized financial settlement on Monad.

---

## 🏗️ 1. Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Core Framework** | AntiGravity (High-performance Go/Rust based) |
| **Blockchain** | Monad (Solidity Smart Contracts for Escrow/Settlement) |
| **Database** | PostgreSQL (Primary) + Redis (Real-time Rate Limiting & Health) |
| **AI Proxy Engine** | Custom Proxy Logic (Inspired by LiteLLM) |
| **Encryption** | AES-256-GCM (For storing User 2's API Keys) |
| **Messaging** | RabbitMQ / NATS (For asynchronous token billing) |

---

## 🛰️ 2. System Architecture

### A. The Smart API Gateway (The Proxy)
The entry point for User 1 (Consumer). It must be stateless and horizontally scalable.

**Request Flow:**
1. **Authenticate:** Verify Master-Key from User 1.
2. **Balance Check:** Check Redis for available Credit Balance (Cached from Monad).
3. **Dynamic Routing:** Fetch an active User 2 key from the "Healthy Pool" for the requested model.
4. **Proxy:** Forward request to the provider (OpenAI/Gemini/Anthropic).
5. **Response Streaming:** Stream chunks back to User 1 to minimize latency.

### B. Usage Monitor & Billing (The Accountant)
Post-request logic that calculates costs and handles ledger updates.

*   **Token Counting:** Uses `tiktoken` or model-specific decoders.
*   **Internal Ledger:** Deducts credits from User 1 and credits User 2's "Pending Balance."
*   **Batcher:** Gathers thousands of transactions and commits a summary to the Monad Smart Contract every 5–10 minutes to save on gas.

### C. Key Vault (Security Layer)
Where User 2 (Staker) uploads and manages their API keys.

*   **Encryption:** Keys are encrypted using a Master Secret Key (MSK) stored in a Hardware Security Module (HSM).
*   **Isolation:** The proxy engine only decrypts the key in memory during the request lifecycle.

---

## ⛓️ 3. Monad Smart Contract Logic

The Escrow Contract handles the trustless exchange of value.

*   `deposit()`: User 1 locks $MON or stablecoins into the platform.
*   `claimRewards()`: User 2 withdraws earned credits after usage verification.
*   `settleBatch()`: Admin-only function that updates balances based on off-chain AntiGravity logs (**Proof-of-Compute**).

---

## 📊 4. Database Schema (PostgreSQL)

### `users` (Consumers & Stakers)
*   `id`: Wallet Address (Primary Key)
*   `master_api_key`: Hashed API key for authentication
*   `total_spent`: Cumulative credit usage
*   `total_earned`: Cumulative earnings for stakers

### `staked_keys` (The Inventory)
*   `id`: Unique Identifier
*   `owner_id`: FK to `users.id`
*   `provider`: Provider name (e.g., "google_gemini", "openai")
*   `encrypted_key`: The actual key (AES-256 encrypted)
*   `spend_limit`: Maximum credits this key can consume
*   `current_usage`: Tracked usage for the limit
*   `status`: `Active`, `Limited`, or `Revoked`

### `api_logs` (For Transparency)
*   `id`: Log ID
*   `consumer_id`: User who made the request
*   `staker_key_id`: Key that fulfilled the request
*   `tokens_used`: Total token count (In + Out)
*   `cost_monad`: Calculated cost in $MON equivalent
*   `tx_hash`: Reference to the on-chain settlement transaction

---

## 🛠️ 5. Key API Endpoints

### Consumer Endpoints (NPM Package)
*   `POST /v1/chat/completions` — Standard OpenAI-compatible inference endpoint.
*   `GET /v1/balance` — Check remaining platform credits.

### Staker Endpoints (Dashboard)
*   `POST /v1/vault/stake` — Add a new API key to the pool.
*   `GET /v1/vault/status` — Real-time health check of all staked keys.
*   `POST /v1/vault/withdraw` — Trigger a claim request on Monad.

---

## 🛡️ 6. Performance & Security Features

*   **Fail-over Routing:** If a User 2 key returns a `429` (Rate Limit) or `401` (Invalid), the system automatically retries with a different key in the pool within **<10ms**.
*   **Circuit Breaker:** If all keys for a specific model (e.g., GPT-4) are failing, the API returns a friendly "High Demand" error instead of hanging.
*   **Zero-Knowledge Logging:** Optional feature where request/response bodies are never stored; only token counts are logged for billing.

---

## 📅 7. Execution Phases

1.  **Phase 1:** Core Proxy logic (AntiGravity) + Hardcoded Keys.
2.  **Phase 2:** PostgreSQL + Encryption integration for User 2 keys.
3.  **Phase 3:** Monad Smart Contract deployment + Batch Settlement Engine.
4.  **Phase 4:** Token-based rate limiting and advanced health monitoring.

