'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, Search, Filter } from 'lucide-react';
import {
  companies,
  Company,
  CompanyCategory,
  formatValuation,
  getRankChangeDisplay,
  categoryColors,
  categoryIcons,
} from '@/lib/companyData';

const allCategories: CompanyCategory[] = [
  'AI',
  'AEROSPACE',
  'FINTECH',
  'DATA',
  'SOCIAL',
  'DEFENSE',
  'CRYPTO',
  'CLOUD',
  'DESIGN',
  'ROBOTICS',
  'BIOTECH',
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory | 'ALL'>('ALL');

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || company.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold">The Setter 30</h1>
          </div>
          <p className="text-gray-400 text-lg">
            The most sought-after venture-backed companies in the secondary market
          </p>
          <p className="text-gray-500 text-sm mt-1">Q3 2025 Rankings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                selectedCategory === 'ALL'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Company Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.symbol} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No companies found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: Company }) {
  const rankChange = getRankChangeDisplay(company.rankChange);

  return (
    <Link href={`/companies/${company.symbol}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xl">
              {categoryIcons[company.category]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm font-medium">#{company.rank}</span>
                <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors">
                  {company.name}
                </h3>
              </div>
              <span className="text-gray-500 text-xs">{company.symbol}</span>
            </div>
          </div>

          {/* Rank Change */}
          <div className={`flex items-center gap-1 ${rankChange.color}`}>
            {company.rankChange === 'NEW' ? (
              <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 rounded">NEW</span>
            ) : company.rankChange > 0 ? (
              <>
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">{rankChange.text}</span>
              </>
            ) : company.rankChange < 0 ? (
              <>
                <ArrowDown className="w-4 h-4" />
                <span className="text-sm font-medium">{rankChange.text}</span>
              </>
            ) : (
              <span className="text-sm">-</span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{company.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-xs">Valuation</span>
            <p className="text-emerald-400 font-bold text-lg">
              {formatValuation(company.valuationBn)}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              categoryColors[company.category]
            }`}
          >
            {company.category}
          </span>
        </div>

        {/* Trade Button */}
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Trade on Shadow Protocol</span>
            <span className="text-emerald-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Trade &rarr;
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
