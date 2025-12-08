// Company data based on "The Setter 30" Q3 2025
// Source: Secondary market valuations

export type CompanyCategory =
  | 'AI'
  | 'AEROSPACE'
  | 'FINTECH'
  | 'DATA'
  | 'SOCIAL'
  | 'DEFENSE'
  | 'CRYPTO'
  | 'CLOUD'
  | 'DESIGN'
  | 'ROBOTICS'
  | 'BIOTECH';

export interface Company {
  rank: number;
  symbol: string;
  name: string;
  description: string;
  category: CompanyCategory;
  valuationBn: number; // Billion USD
  rankChange: number | 'NEW'; // positive = up, negative = down, 0 = same
  // TODO: Add these fields later
  // founded?: number;
  // hq?: string;
  // twitter?: string;
  // website?: string;
  // fundingRounds?: FundingRound[];
  // revenue?: number;
  // employees?: number;
}

export const companies: Company[] = [
  {
    rank: 1,
    symbol: 'ANTHROPIC',
    name: 'Anthropic',
    description: 'AI Engine - Creator of Claude, focusing on AI safety and research',
    category: 'AI',
    valuationBn: 183.0,
    rankChange: 2,
  },
  {
    rank: 2,
    symbol: 'SPACEX',
    name: 'SpaceX',
    description: 'Aerospace Transport Systems - Reusable rockets, Starlink, Mars missions',
    category: 'AEROSPACE',
    valuationBn: 400.0,
    rankChange: -1,
  },
  {
    rank: 3,
    symbol: 'OPENAI',
    name: 'OpenAI',
    description: 'AI Engine - Creator of ChatGPT and GPT models',
    category: 'AI',
    valuationBn: 500.0,
    rankChange: 2,
  },
  {
    rank: 4,
    symbol: 'ANDURIL',
    name: 'Anduril',
    description: 'Defense Tech - Autonomous defense systems and AI-powered military tech',
    category: 'DEFENSE',
    valuationBn: 30.5,
    rankChange: -2,
  },
  {
    rank: 5,
    symbol: 'PERPLEXITY',
    name: 'Perplexity',
    description: 'AI Search Engine - AI-powered answer engine',
    category: 'AI',
    valuationBn: 20.0,
    rankChange: 2,
  },
  {
    rank: 6,
    symbol: 'STRIPE',
    name: 'Stripe',
    description: 'Payment Platform - Online payment processing infrastructure',
    category: 'FINTECH',
    valuationBn: 91.5,
    rankChange: -2,
  },
  {
    rank: 7,
    symbol: 'GROQ',
    name: 'Groq',
    description: 'AI and Computer Hardware - Ultra-fast AI inference chips',
    category: 'AI',
    valuationBn: 6.9,
    rankChange: 2,
  },
  {
    rank: 8,
    symbol: 'XAI',
    name: 'xAI',
    description: 'AI Engine - Elon Musk\'s AI company, creator of Grok',
    category: 'AI',
    valuationBn: 113.0,
    rankChange: 0,
  },
  {
    rank: 9,
    symbol: 'DATABRICKS',
    name: 'Databricks',
    description: 'Data Analytics Platform - Unified data analytics and AI platform',
    category: 'DATA',
    valuationBn: 100.0,
    rankChange: 3,
  },
  {
    rank: 10,
    symbol: 'KRAKEN',
    name: 'Kraken',
    description: 'Cryptocurrency Exchange and Services',
    category: 'CRYPTO',
    valuationBn: 15.0,
    rankChange: 1,
  },
  {
    rank: 11,
    symbol: 'CRUSOE',
    name: 'Crusoe',
    description: 'AI Cloud Infrastructure - Clean energy AI data centers',
    category: 'CLOUD',
    valuationBn: 10.0,
    rankChange: 7,
  },
  {
    rank: 12,
    symbol: 'CANVA',
    name: 'Canva',
    description: 'Online Graphic Design Platform',
    category: 'DESIGN',
    valuationBn: 40.0,
    rankChange: 8,
  },
  {
    rank: 13,
    symbol: 'GLEAN',
    name: 'Glean',
    description: 'AI-Powered Enterprise Search Platform',
    category: 'AI',
    valuationBn: 7.2,
    rankChange: 1,
  },
  {
    rank: 14,
    symbol: 'REVOLUT',
    name: 'Revolut',
    description: 'Money Transfer Platform - Digital banking and finance',
    category: 'FINTECH',
    valuationBn: 45.0,
    rankChange: 'NEW',
  },
  {
    rank: 15,
    symbol: 'RIPPLE',
    name: 'Ripple',
    description: 'Digital Payment Network and Protocol',
    category: 'CRYPTO',
    valuationBn: 15.0,
    rankChange: 'NEW',
  },
  {
    rank: 16,
    symbol: 'NEURALINK',
    name: 'Neuralink',
    description: 'Neuroprosthetics Development - Brain-computer interfaces',
    category: 'BIOTECH',
    valuationBn: 9.7,
    rankChange: -6,
  },
  {
    rank: 17,
    symbol: 'FIGUREAI',
    name: 'Figure AI',
    description: 'AI Robotics Company - Humanoid robots',
    category: 'ROBOTICS',
    valuationBn: 39.5,
    rankChange: -2,
  },
  {
    rank: 18,
    symbol: 'SCALEAI',
    name: 'Scale AI',
    description: 'AI Training and Data Annotation Platform',
    category: 'AI',
    valuationBn: 14.0,
    rankChange: -12,
  },
  {
    rank: 19,
    symbol: 'BYTEDANCE',
    name: 'ByteDance',
    description: 'Social Media Platform - TikTok parent company',
    category: 'SOCIAL',
    valuationBn: 330.0,
    rankChange: -3,
  },
  {
    rank: 20,
    symbol: 'RAMP',
    name: 'Ramp',
    description: 'Corporate Spending and Expense Management',
    category: 'FINTECH',
    valuationBn: 22.5,
    rankChange: -1,
  },
  {
    rank: 21,
    symbol: 'SHIELDAI',
    name: 'Shield AI',
    description: 'Defense Tech - Autonomous aircraft systems',
    category: 'DEFENSE',
    valuationBn: 5.3,
    rankChange: -8,
  },
  {
    rank: 22,
    symbol: 'LAMBDA',
    name: 'Lambda',
    description: 'AI Hardware and Cloud Solutions Company',
    category: 'CLOUD',
    valuationBn: 2.5,
    rankChange: 4,
  },
  {
    rank: 23,
    symbol: 'APPTRONIK',
    name: 'Apptronik',
    description: 'AI Robotics Company - Humanoid robots for industry',
    category: 'ROBOTICS',
    valuationBn: 1.8,
    rankChange: 4,
  },
  {
    rank: 24,
    symbol: 'RIPPLING',
    name: 'Rippling',
    description: 'Human Resource Management Platform',
    category: 'DATA',
    valuationBn: 16.8,
    rankChange: 'NEW',
  },
  {
    rank: 25,
    symbol: 'CURSOR',
    name: 'Cursor (Anysphere)',
    description: 'AI Software Development Platform - AI code editor',
    category: 'AI',
    valuationBn: 9.9,
    rankChange: -1,
  },
  {
    rank: 26,
    symbol: 'POLYMARKET',
    name: 'Polymarket',
    description: 'Cryptocurrency-Based Prediction Market',
    category: 'CRYPTO',
    valuationBn: 1.0,
    rankChange: 'NEW',
  },
  {
    rank: 27,
    symbol: 'CEREBRAS',
    name: 'Cerebras',
    description: 'AI and Computer Hardware - Largest AI chips',
    category: 'AI',
    valuationBn: 4.3,
    rankChange: 3,
  },
  {
    rank: 28,
    symbol: 'REPLIT',
    name: 'Replit',
    description: 'AI Software Creation Platform - Browser-based IDE',
    category: 'AI',
    valuationBn: 3.0,
    rankChange: 'NEW',
  },
  {
    rank: 29,
    symbol: 'ELEVENLABS',
    name: 'Eleven Labs',
    description: 'AI Voice Generation Platform',
    category: 'AI',
    valuationBn: 6.6,
    rankChange: 'NEW',
  },
  {
    rank: 30,
    symbol: 'VERCEL',
    name: 'Vercel',
    description: 'Frontend Cloud Platform - Next.js creators',
    category: 'CLOUD',
    valuationBn: 9.0,
    rankChange: -5,
  },
];

// Helper functions
export function getCompanyBySymbol(symbol: string): Company | undefined {
  return companies.find(c => c.symbol === symbol);
}

export function getCompaniesByCategory(category: CompanyCategory): Company[] {
  return companies.filter(c => c.category === category);
}

export function getTopCompanies(limit: number = 10): Company[] {
  return companies.slice(0, limit);
}

export function formatValuation(valuationBn: number): string {
  if (valuationBn >= 100) {
    return `$${valuationBn.toFixed(0)}B`;
  }
  return `$${valuationBn.toFixed(1)}B`;
}

export function getRankChangeDisplay(change: number | 'NEW'): { text: string; color: string } {
  if (change === 'NEW') {
    return { text: 'NEW', color: 'text-blue-400' };
  }
  if (change > 0) {
    return { text: `${change}`, color: 'text-green-400' };
  }
  if (change < 0) {
    return { text: `${Math.abs(change)}`, color: 'text-red-400' };
  }
  return { text: '-', color: 'text-gray-400' };
}

export const categoryColors: Record<CompanyCategory, string> = {
  AI: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  AEROSPACE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  FINTECH: 'bg-green-500/20 text-green-400 border-green-500/30',
  DATA: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  SOCIAL: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  DEFENSE: 'bg-red-500/20 text-red-400 border-red-500/30',
  CRYPTO: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  CLOUD: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  DESIGN: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/30',
  ROBOTICS: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  BIOTECH: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

export const categoryIcons: Record<CompanyCategory, string> = {
  AI: '🤖',
  AEROSPACE: '🚀',
  FINTECH: '💳',
  DATA: '📊',
  SOCIAL: '📱',
  DEFENSE: '🛡️',
  CRYPTO: '₿',
  CLOUD: '☁️',
  DESIGN: '🎨',
  ROBOTICS: '🦾',
  BIOTECH: '🧬',
};
