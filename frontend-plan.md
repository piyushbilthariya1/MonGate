MonKey Vault: Frontend Architecture & Design Plan

This document serves as the master blueprint for the MonKey Vault (AntiGravity Bridge) frontend. It outlines the visual language, page structures, and Web3 integration logic.

🏗️ 1. Technical Stack & Design Tokens

Core Stack

Framework: Next.js 15 (App Router)

Styling: Tailwind CSS + Framer Motion (Animations)

Components: Shadcn/UI (Customized for Dark/Neon)

Web3: RainbowKit + Wagmi + Viem (Monad Testnet)

State: TanStack Query (Server state) + Zustand (UI state)

Charts: Recharts (Usage analytics)

Visual Identity (The Monad Aesthetic)

Primary BG: #030303 (Deep Obsidian)

Secondary BG: #0A0A0A (Card background)

Accent Color: #836EFB (Monad Purple)

Success Color: #00FFA3 (Neon Mint)

Typography:

Display: Cal Sans or Inter Bold

Body: Geist Sans

Code: JetBrains Mono

🗺️ 2. Information Architecture (Sitemap)

Public Layer (/)

Landing Page (Hero, Features, Pricing simulation).

Consumer Layer (/dashboard/consumer) - For API Buyers

Overview (Balance, Active Keys).

API Console (Key generation, Model testing).

Usage History (Tokens, Logs).

Staker Layer (/dashboard/staker) - For Key Providers

Vault Overview (Active keys, Total earnings).

Key Management (Stake new key, Health monitor).

Earnings (Withdrawal history).

Admin Layer (/admin) - Restricted

System Health (Batcher status, Guardian logs).

📄 3. Page Breakdown

A. The Landing Page (/)

Hero Section: "Unleash AI Liquidity on Monad." Animated terminal showing a proxy call.

Feature Grid:

Fluid Credits: No credit card required.

Zero Latency: Powered by AntiGravity.

Staker Rewards: Earn while your keys sleep.

Live Ticker: Real-time stats from the backend (Total batches settled, Active stakers).

B. Consumer Dashboard (/dashboard/consumer)

Credit Meter: A glowy radial progress bar showing remaining credits in MON.

Master Key Card: A secure card component to reveal/copy the Master API Key.

Playground Tab: A mini-chat interface to test models (Gemini-pro, GPT-4) using the bridge.

Transaction Table: List of recent API calls with links to the Monad Explorer for settled batches.

C. Staker Portal (/dashboard/staker)

Earning Stats: Large cards showing "Claimable Balance" and "Life-time Earnings."

Staking Wizard: A multi-step form:

Select Provider (Google, OpenAI, Anthropic).

Input API Key (Encrypted in-browser before submission).

Set Monthly Spend Limit.

Health Pulse: A real-time grid of staked keys with "Glowing Status Indicators" (Green = Healthy, Yellow = Cool-down, Red = Blacklisted).

⛓️ 4. Web3 & Backend Integration

Authentication Flow

User clicks "Connect Wallet."

App checks if the user exists in the backend DB.

Signature Challenge: Backend sends a nonce; User signs it via Metamask/Rabby.

JWT is issued and stored in HttpOnly cookies.

Monad Smart Contract Interaction

depositFunds(): Call the Escrow contract to lock MON for credits.

claimEarnings(): For stakers to pull their share from settled batches.

Event Listener: Frontend watches for Deposit events to instantly update UI balance without page refresh.

🛠️ 5. Shared Components Library

Terminal.tsx: A reusable code-block component for documentation and live logs.

StatusBadge.tsx: Dynamic badge with pulse animation for key health.

WalletButton.tsx: Custom RainbowKit button styled with Monad Purple.

CreditCard.tsx: Visual card representing the user's API access.

📅 6. Execution Roadmap

Week 1: Setup Next.js, Shadcn, and RainbowKit. Build the Landing Page.

Week 2: Implement Web3 Auth and the Consumer Dashboard (UI + Mock Data).

Week 3: Build the Staker Portal and Encryption logic for Key Submission.

Week 4: Connect real Backend APIs, implement Recharts, and Final Polish.
