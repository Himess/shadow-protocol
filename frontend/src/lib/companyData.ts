// Company data based on "The Setter 30" Q3 2025
// Source: Secondary market valuations

// Same categories as Markets page
export type CompanyCategory = 'AI' | 'AEROSPACE' | 'FINTECH' | 'DATA' | 'SOCIAL';

export interface Company {
  rank: number;
  symbol: string;
  name: string;
  description: string;
  category: CompanyCategory;
  valuationBn: number; // Billion USD
  rankChange: number | 'NEW'; // positive = up, negative = down, 0 = same
  logo?: string;
  // Company details
  founded: number;
  hq: string;
  ceo: string;
  employees: string;
  website: string;
}

// Logo URLs from Clearbit
const LOGOS: Record<string, string> = {
  anthropic: 'https://logo.clearbit.com/anthropic.com',
  spacex: 'https://logo.clearbit.com/spacex.com',
  openai: 'https://logo.clearbit.com/openai.com',
  anduril: 'https://logo.clearbit.com/anduril.com',
  perplexity: 'https://logo.clearbit.com/perplexity.ai',
  stripe: 'https://logo.clearbit.com/stripe.com',
  groq: 'https://logo.clearbit.com/groq.com',
  xai: 'https://logo.clearbit.com/x.ai',
  databricks: 'https://logo.clearbit.com/databricks.com',
  kraken: 'https://logo.clearbit.com/kraken.com',
  crusoe: 'https://logo.clearbit.com/crusoe.ai',
  canva: 'https://logo.clearbit.com/canva.com',
  glean: 'https://logo.clearbit.com/glean.com',
  revolut: 'https://logo.clearbit.com/revolut.com',
  ripple: 'https://logo.clearbit.com/ripple.com',
  neuralink: 'https://logo.clearbit.com/neuralink.com',
  figureai: 'https://logo.clearbit.com/figure.ai',
  scaleai: 'https://logo.clearbit.com/scale.com',
  bytedance: 'https://logo.clearbit.com/bytedance.com',
  ramp: 'https://logo.clearbit.com/ramp.com',
  shieldai: 'https://logo.clearbit.com/shield.ai',
  lambda: 'https://logo.clearbit.com/lambdalabs.com',
  apptronik: 'https://logo.clearbit.com/apptronik.com',
  rippling: 'https://logo.clearbit.com/rippling.com',
  cursor: 'https://logo.clearbit.com/cursor.com',
  polymarket: 'https://logo.clearbit.com/polymarket.com',
  cerebras: 'https://logo.clearbit.com/cerebras.net',
  replit: 'https://logo.clearbit.com/replit.com',
  elevenlabs: 'https://logo.clearbit.com/elevenlabs.io',
  vercel: 'https://logo.clearbit.com/vercel.com',
  discord: 'https://logo.clearbit.com/discord.com',
};

export const companies: Company[] = [
  {
    rank: 1,
    symbol: 'ANTHROPIC',
    name: 'Anthropic',
    description: 'AI safety company and creator of Claude AI assistant',
    category: 'AI',
    valuationBn: 61.0,
    rankChange: 2,
    logo: LOGOS.anthropic,
    founded: 2021,
    hq: 'San Francisco, CA',
    ceo: 'Dario Amodei',
    employees: '1,000+',
    website: 'anthropic.com',
  },
  {
    rank: 2,
    symbol: 'SPACEX',
    name: 'SpaceX',
    description: 'Aerospace manufacturer - Falcon rockets, Starlink, Starship',
    category: 'AEROSPACE',
    valuationBn: 350.0,
    rankChange: -1,
    logo: LOGOS.spacex,
    founded: 2002,
    hq: 'Hawthorne, CA',
    ceo: 'Elon Musk',
    employees: '13,000+',
    website: 'spacex.com',
  },
  {
    rank: 3,
    symbol: 'OPENAI',
    name: 'OpenAI',
    description: 'AI research lab - Creator of ChatGPT, GPT-4, DALL-E',
    category: 'AI',
    valuationBn: 157.0,
    rankChange: 0,
    logo: LOGOS.openai,
    founded: 2015,
    hq: 'San Francisco, CA',
    ceo: 'Sam Altman',
    employees: '3,000+',
    website: 'openai.com',
  },
  {
    rank: 4,
    symbol: 'STRIPE',
    name: 'Stripe',
    description: 'Online payment processing platform for internet businesses',
    category: 'FINTECH',
    valuationBn: 70.0,
    rankChange: 1,
    logo: LOGOS.stripe,
    founded: 2010,
    hq: 'San Francisco, CA',
    ceo: 'Patrick Collison',
    employees: '8,000+',
    website: 'stripe.com',
  },
  {
    rank: 5,
    symbol: 'DATABRICKS',
    name: 'Databricks',
    description: 'Unified data analytics and AI platform',
    category: 'DATA',
    valuationBn: 62.0,
    rankChange: 3,
    logo: LOGOS.databricks,
    founded: 2013,
    hq: 'San Francisco, CA',
    ceo: 'Ali Ghodsi',
    employees: '7,000+',
    website: 'databricks.com',
  },
  {
    rank: 6,
    symbol: 'BYTEDANCE',
    name: 'ByteDance',
    description: 'Social media giant - TikTok, Douyin, Toutiao parent company',
    category: 'SOCIAL',
    valuationBn: 300.0,
    rankChange: -2,
    logo: LOGOS.bytedance,
    founded: 2012,
    hq: 'Beijing, China',
    ceo: 'Liang Rubo',
    employees: '150,000+',
    website: 'bytedance.com',
  },
  {
    rank: 7,
    symbol: 'XAI',
    name: 'xAI',
    description: 'AI company building Grok - Elon Musk\'s AI venture',
    category: 'AI',
    valuationBn: 50.0,
    rankChange: 2,
    logo: LOGOS.xai,
    founded: 2023,
    hq: 'Austin, TX',
    ceo: 'Elon Musk',
    employees: '100+',
    website: 'x.ai',
  },
  {
    rank: 8,
    symbol: 'REVOLUT',
    name: 'Revolut',
    description: 'Digital banking app with currency exchange and crypto trading',
    category: 'FINTECH',
    valuationBn: 45.0,
    rankChange: 'NEW',
    logo: LOGOS.revolut,
    founded: 2015,
    hq: 'London, UK',
    ceo: 'Nikolay Storonsky',
    employees: '8,000+',
    website: 'revolut.com',
  },
  {
    rank: 9,
    symbol: 'CANVA',
    name: 'Canva',
    description: 'Online graphic design platform with drag-and-drop interface',
    category: 'DATA',
    valuationBn: 26.0,
    rankChange: 1,
    logo: LOGOS.canva,
    founded: 2012,
    hq: 'Sydney, Australia',
    ceo: 'Melanie Perkins',
    employees: '4,000+',
    website: 'canva.com',
  },
  {
    rank: 10,
    symbol: 'ANDURIL',
    name: 'Anduril',
    description: 'Defense technology - Autonomous systems and AI warfare',
    category: 'AEROSPACE',
    valuationBn: 14.0,
    rankChange: -3,
    logo: LOGOS.anduril,
    founded: 2017,
    hq: 'Costa Mesa, CA',
    ceo: 'Palmer Luckey',
    employees: '2,500+',
    website: 'anduril.com',
  },
  {
    rank: 11,
    symbol: 'PERPLEXITY',
    name: 'Perplexity',
    description: 'AI-powered answer engine with real-time web search',
    category: 'AI',
    valuationBn: 9.0,
    rankChange: 5,
    logo: LOGOS.perplexity,
    founded: 2022,
    hq: 'San Francisco, CA',
    ceo: 'Aravind Srinivas',
    employees: '100+',
    website: 'perplexity.ai',
  },
  {
    rank: 12,
    symbol: 'DISCORD',
    name: 'Discord',
    description: 'Voice, video and text chat platform for communities',
    category: 'SOCIAL',
    valuationBn: 15.0,
    rankChange: 0,
    logo: LOGOS.discord,
    founded: 2015,
    hq: 'San Francisco, CA',
    ceo: 'Jason Citron',
    employees: '700+',
    website: 'discord.com',
  },
  {
    rank: 13,
    symbol: 'KRAKEN',
    name: 'Kraken',
    description: 'Cryptocurrency exchange platform',
    category: 'FINTECH',
    valuationBn: 10.0,
    rankChange: -2,
    logo: LOGOS.kraken,
    founded: 2011,
    hq: 'San Francisco, CA',
    ceo: 'Dave Ripley',
    employees: '3,000+',
    website: 'kraken.com',
  },
  {
    rank: 14,
    symbol: 'RIPPLE',
    name: 'Ripple',
    description: 'Digital payment network and XRP cryptocurrency',
    category: 'FINTECH',
    valuationBn: 11.0,
    rankChange: 'NEW',
    logo: LOGOS.ripple,
    founded: 2012,
    hq: 'San Francisco, CA',
    ceo: 'Brad Garlinghouse',
    employees: '900+',
    website: 'ripple.com',
  },
  {
    rank: 15,
    symbol: 'SHIELDAI',
    name: 'Shield AI',
    description: 'Defense AI company - Autonomous aircraft systems',
    category: 'AEROSPACE',
    valuationBn: 5.3,
    rankChange: -4,
    logo: LOGOS.shieldai,
    founded: 2015,
    hq: 'San Diego, CA',
    ceo: 'Ryan Tseng',
    employees: '1,000+',
    website: 'shield.ai',
  },
  {
    rank: 16,
    symbol: 'GROQ',
    name: 'Groq',
    description: 'AI inference chip company - Ultra-fast LPU processors',
    category: 'AI',
    valuationBn: 2.8,
    rankChange: 3,
    logo: LOGOS.groq,
    founded: 2016,
    hq: 'Mountain View, CA',
    ceo: 'Jonathan Ross',
    employees: '300+',
    website: 'groq.com',
  },
  {
    rank: 17,
    symbol: 'SCALEAI',
    name: 'Scale AI',
    description: 'AI training data platform and annotation services',
    category: 'AI',
    valuationBn: 14.0,
    rankChange: -5,
    logo: LOGOS.scaleai,
    founded: 2016,
    hq: 'San Francisco, CA',
    ceo: 'Alexandr Wang',
    employees: '1,500+',
    website: 'scale.com',
  },
  {
    rank: 18,
    symbol: 'RAMP',
    name: 'Ramp',
    description: 'Corporate card and spend management platform',
    category: 'FINTECH',
    valuationBn: 7.65,
    rankChange: 1,
    logo: LOGOS.ramp,
    founded: 2019,
    hq: 'New York, NY',
    ceo: 'Eric Glyman',
    employees: '1,000+',
    website: 'ramp.com',
  },
  {
    rank: 19,
    symbol: 'VERCEL',
    name: 'Vercel',
    description: 'Frontend cloud platform - Creators of Next.js',
    category: 'DATA',
    valuationBn: 3.5,
    rankChange: -3,
    logo: LOGOS.vercel,
    founded: 2015,
    hq: 'San Francisco, CA',
    ceo: 'Guillermo Rauch',
    employees: '500+',
    website: 'vercel.com',
  },
  {
    rank: 20,
    symbol: 'RIPPLING',
    name: 'Rippling',
    description: 'HR, IT, and finance platform for businesses',
    category: 'DATA',
    valuationBn: 13.5,
    rankChange: 'NEW',
    logo: LOGOS.rippling,
    founded: 2016,
    hq: 'San Francisco, CA',
    ceo: 'Parker Conrad',
    employees: '3,000+',
    website: 'rippling.com',
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
    return { text: 'NEW', color: 'text-info' };
  }
  if (change > 0) {
    return { text: `${change}`, color: 'text-success' };
  }
  if (change < 0) {
    return { text: `${Math.abs(change)}`, color: 'text-danger' };
  }
  return { text: '-', color: 'text-text-muted' };
}

// Same icons as Markets page
export const categoryIcons: Record<CompanyCategory, string> = {
  AI: '🤖',
  AEROSPACE: '🚀',
  FINTECH: '💳',
  DATA: '📊',
  SOCIAL: '📱',
};
