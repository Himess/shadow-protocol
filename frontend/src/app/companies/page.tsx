'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components';
import { ArrowUp, ArrowDown, ArrowRight, Search, Lock, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  companies,
  Company,
  CompanyCategory,
  formatValuation,
  getRankChangeDisplay,
  categoryIcons,
} from '@/lib/companyData';

const allCategories: CompanyCategory[] = [
  'AI',
  'AEROSPACE',
  'FINTECH',
  'DATA',
  'SOCIAL',
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-gold" />
            <h1 className="text-3xl font-bold text-text-primary">The Setter 30</h1>
          </div>
          <p className="text-text-muted">
            The most sought-after venture-backed companies in the secondary market
          </p>
          <p className="text-text-muted text-sm mt-1 flex items-center gap-2">
            <Lock className="w-3 h-3 text-gold" />
            Q3 2025 Rankings
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              selectedCategory === 'ALL'
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-card border border-border text-text-muted hover:text-text-primary"
            )}
          >
            All Companies
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2",
                selectedCategory === cat
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "bg-card border border-border text-text-muted hover:text-text-primary"
              )}
            >
              {categoryIcons[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.symbol} company={company} />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            No companies found matching your criteria
          </div>
        )}

        {/* Encrypted Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gold">
          <Lock className="w-4 h-4" />
          <span className="text-sm">All trading positions are encrypted with FHE</span>
        </div>
      </main>
    </div>
  );
}

function CompanyCard({ company }: { company: Company }) {
  const rankChange = getRankChangeDisplay(company.rankChange);

  return (
    <Link href={`/companies/${company.symbol}`}>
      <div className="card-hover cursor-pointer group h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center overflow-hidden">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <span className={company.logo ? 'hidden' : 'text-xl'}>{categoryIcons[company.category]}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-sm font-medium">#{company.rank}</span>
                <h3 className="font-bold text-text-primary group-hover:text-gold transition-colors">
                  {company.name}
                </h3>
              </div>
              <span className="text-text-muted text-xs">{company.symbol}</span>
            </div>
          </div>

          {/* Rank Change */}
          <div className={cn("flex items-center gap-1",
            company.rankChange === 'NEW' ? 'text-info' :
            typeof company.rankChange === 'number' && company.rankChange > 0 ? 'text-success' :
            typeof company.rankChange === 'number' && company.rankChange < 0 ? 'text-danger' : 'text-text-muted'
          )}>
            {company.rankChange === 'NEW' ? (
              <span className="text-xs font-bold px-2 py-1 bg-info/20 text-info rounded">NEW</span>
            ) : typeof company.rankChange === 'number' && company.rankChange > 0 ? (
              <>
                <ArrowUp className="w-4 h-4" />
                <span className="text-sm font-medium">{rankChange.text}</span>
              </>
            ) : typeof company.rankChange === 'number' && company.rankChange < 0 ? (
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
        <p className="text-text-muted text-sm mb-4 line-clamp-2">{company.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-text-muted text-xs">Valuation</span>
            <p className="text-gold font-bold text-lg">
              {formatValuation(company.valuationBn)}
            </p>
          </div>

          <span className="badge-gold">
            {company.category}
          </span>
        </div>

        {/* Trade Button */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-text-muted text-sm">Trade on Shadow Protocol</span>
            <span className="text-gold text-sm font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Trade <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
