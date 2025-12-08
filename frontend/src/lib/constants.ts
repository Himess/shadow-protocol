// Pre-IPO Assets Data
export const CATEGORIES = {
  AI: { id: 0, name: "AI & ML" },
  AEROSPACE: { id: 1, name: "Aerospace" },
  FINTECH: { id: 2, name: "FinTech" },
  DATA: { id: 3, name: "Data" },
  SOCIAL: { id: 4, name: "Social" },
} as const;

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  category: keyof typeof CATEGORIES;
  logo?: string;
  marketCap: number; // Market cap in billions (e.g., 250 = $250B)
}

// Logo URLs from Clearbit/public sources
const LOGOS = {
  openai: "https://logo.clearbit.com/openai.com",
  anthropic: "https://logo.clearbit.com/anthropic.com",
  xai: "https://logo.clearbit.com/x.ai",
  perplexity: "https://logo.clearbit.com/perplexity.ai",
  groq: "https://logo.clearbit.com/groq.com",
  spacex: "https://logo.clearbit.com/spacex.com",
  anduril: "https://logo.clearbit.com/anduril.com",
  shieldai: "https://logo.clearbit.com/shield.ai",
  stripe: "https://logo.clearbit.com/stripe.com",
  revolut: "https://logo.clearbit.com/revolut.com",
  ripple: "https://logo.clearbit.com/ripple.com",
  kraken: "https://logo.clearbit.com/kraken.com",
  databricks: "https://logo.clearbit.com/databricks.com",
  canva: "https://logo.clearbit.com/canva.com",
  vercel: "https://logo.clearbit.com/vercel.com",
  bytedance: "https://logo.clearbit.com/bytedance.com",
  discord: "https://logo.clearbit.com/discord.com",
};

export const ASSETS: Asset[] = [
  // AI & ML (prices based on valuation per share estimates)
  { id: "openai", symbol: "OPENAI", name: "OpenAI", price: 250, change24h: 2.5, category: "AI", logo: LOGOS.openai, marketCap: 157 },
  { id: "anthropic", symbol: "ANTHROPIC", name: "Anthropic", price: 95, change24h: 1.8, category: "AI", logo: LOGOS.anthropic, marketCap: 61 },
  { id: "xai", symbol: "XAI", name: "xAI", price: 60, change24h: -0.5, category: "AI", logo: LOGOS.xai, marketCap: 50 },
  { id: "perplexity", symbol: "PERPLEXITY", name: "Perplexity", price: 12, change24h: 3.2, category: "AI", logo: LOGOS.perplexity, marketCap: 9 },
  { id: "groq", symbol: "GROQ", name: "Groq", price: 4.5, change24h: 5.1, category: "AI", logo: LOGOS.groq, marketCap: 2.8 },

  // Aerospace
  { id: "spacex", symbol: "SPACEX", name: "SpaceX", price: 180, change24h: 1.2, category: "AEROSPACE", logo: LOGOS.spacex, marketCap: 350 },
  { id: "anduril", symbol: "ANDURIL", name: "Anduril", price: 16, change24h: -1.5, category: "AEROSPACE", logo: LOGOS.anduril, marketCap: 14 },
  { id: "shieldai", symbol: "SHIELDAI", name: "Shield AI", price: 3.2, change24h: 0.8, category: "AEROSPACE", logo: LOGOS.shieldai, marketCap: 2.8 },

  // FinTech
  { id: "stripe", symbol: "STRIPE", name: "Stripe", price: 48, change24h: 0.9, category: "FINTECH", logo: LOGOS.stripe, marketCap: 70 },
  { id: "revolut", symbol: "REVOLUT", name: "Revolut", price: 24, change24h: 2.1, category: "FINTECH", logo: LOGOS.revolut, marketCap: 45 },
  { id: "ripple", symbol: "RIPPLE", name: "Ripple", price: 8.5, change24h: -2.3, category: "FINTECH", logo: LOGOS.ripple, marketCap: 11 },
  { id: "kraken", symbol: "KRAKEN", name: "Kraken", price: 8, change24h: 1.7, category: "FINTECH", logo: LOGOS.kraken, marketCap: 10 },

  // Data & Enterprise
  { id: "databricks", symbol: "DATABRICKS", name: "Databricks", price: 55, change24h: 1.5, category: "DATA", logo: LOGOS.databricks, marketCap: 62 },
  { id: "canva", symbol: "CANVA", name: "Canva", price: 22, change24h: 0.3, category: "DATA", logo: LOGOS.canva, marketCap: 26 },
  { id: "vercel", symbol: "VERCEL", name: "Vercel", price: 5.5, change24h: 4.2, category: "DATA", logo: LOGOS.vercel, marketCap: 3.5 },

  // Social & Consumer
  { id: "bytedance", symbol: "BYTEDANCE", name: "ByteDance", price: 165, change24h: -0.8, category: "SOCIAL", logo: LOGOS.bytedance, marketCap: 300 },
  { id: "discord", symbol: "DISCORD", name: "Discord", price: 9, change24h: 1.9, category: "SOCIAL", logo: LOGOS.discord, marketCap: 15 },
];

// Contract Addresses (Sepolia Testnet - to be updated after deployment)
export const CONTRACT_ADDRESSES = {
  SHADOW_VAULT: "0x...",
  SHADOW_ORACLE: "0x...",
  SHADOW_USD: "0x...",
} as const;

// Leverage Options
export const LEVERAGE_OPTIONS = [1, 2, 3, 5, 10] as const;

// Format helpers
export const formatUSD = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
};

export const formatEncrypted = (): string => {
  return "••••••••";
};

export const formatMarketCap = (billions: number): string => {
  if (billions >= 1000) {
    return `$${(billions / 1000).toFixed(1)}T`;
  }
  return `$${billions.toFixed(1)}B`;
};
