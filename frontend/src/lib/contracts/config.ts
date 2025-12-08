// Contract addresses - Update after deployment
export const CONTRACTS = {
  // Zama Devnet (chain ID: 8009)
  shadowVault: "0x..." as `0x${string}`,
  shadowOracle: "0x..." as `0x${string}`,
  shadowUsd: "0x..." as `0x${string}`,
  shadowLiquidityPool: "0x..." as `0x${string}`,
} as const;

// Zama Devnet chain config
export const ZAMA_DEVNET = {
  id: 8009,
  name: "Zama Devnet",
  network: "zama-devnet",
  nativeCurrency: {
    decimals: 18,
    name: "Zama",
    symbol: "ZAMA",
  },
  rpcUrls: {
    default: {
      http: ["https://devnet.zama.ai"],
    },
    public: {
      http: ["https://devnet.zama.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "Zama Explorer",
      url: "https://explorer.devnet.zama.ai",
    },
  },
  testnet: true,
} as const;

// FHE Gateway URL for decryption
export const FHE_GATEWAY_URL = "https://gateway.devnet.zama.ai";

// Asset IDs (keccak256 of asset symbols)
export const ASSET_IDS: Record<string, `0x${string}`> = {
  openai: "0x" as `0x${string}`, // keccak256("OPENAI")
  anthropic: "0x" as `0x${string}`,
  xai: "0x" as `0x${string}`,
  perplexity: "0x" as `0x${string}`,
  groq: "0x" as `0x${string}`,
  spacex: "0x" as `0x${string}`,
  anduril: "0x" as `0x${string}`,
  shieldai: "0x" as `0x${string}`,
  stripe: "0x" as `0x${string}`,
  revolut: "0x" as `0x${string}`,
  ripple: "0x" as `0x${string}`,
  kraken: "0x" as `0x${string}`,
  databricks: "0x" as `0x${string}`,
  canva: "0x" as `0x${string}`,
  vercel: "0x" as `0x${string}`,
  bytedance: "0x" as `0x${string}`,
  discord: "0x" as `0x${string}`,
};

// LP Pool Constants
export const LP_CONSTANTS = {
  LOCK_PERIOD: 24 * 60 * 60, // 24 hours in seconds
  EPOCH_DURATION: 24 * 60 * 60, // 24 hours in seconds
  MAX_UTILIZATION: 8000, // 80% in basis points
  PROTOCOL_FEE_SHARE: 5000, // 50% in basis points
} as const;
