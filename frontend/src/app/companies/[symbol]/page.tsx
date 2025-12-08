'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  TrendingUp,
  Building2,
  DollarSign,
  BarChart3,
  Globe,
  Twitter,
} from 'lucide-react';
import {
  getCompanyBySymbol,
  formatValuation,
  getRankChangeDisplay,
  categoryColors,
  categoryIcons,
  companies,
} from '@/lib/companyData';

export default function CompanyDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const company = getCompanyBySymbol(symbol.toUpperCase());

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Company Not Found</h1>
          <p className="text-gray-400 mb-6">The company you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/companies"
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            View All Companies
          </Link>
        </div>
      </div>
    );
  }

  const rankChange = getRankChangeDisplay(company.rankChange);

  // Get similar companies (same category)
  const similarCompanies = companies
    .filter((c) => c.category === company.category && c.symbol !== company.symbol)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/companies"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Companies
        </Link>
      </div>

      {/* Company Header */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left Side */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center text-3xl">
                {categoryIcons[company.category]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-gray-500 text-sm font-medium">Rank #{company.rank}</span>
                  <div className={`flex items-center gap-1 ${rankChange.color}`}>
                    {company.rankChange === 'NEW' ? (
                      <span className="text-xs font-bold px-2 py-1 bg-blue-500/20 rounded">NEW</span>
                    ) : company.rankChange > 0 ? (
                      <>
                        <ArrowUp className="w-4 h-4" />
                        <span className="text-sm">{rankChange.text}</span>
                      </>
                    ) : company.rankChange < 0 ? (
                      <>
                        <ArrowDown className="w-4 h-4" />
                        <span className="text-sm">{rankChange.text}</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <p className="text-gray-400">{company.description}</p>
              </div>
            </div>

            {/* Right Side - Trade Button */}
            <div className="flex flex-col items-end gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium border ${
                  categoryColors[company.category]
                }`}
              >
                {categoryIcons[company.category]} {company.category}
              </span>
              <Link
                href={`/trade?asset=${company.symbol}`}
                className="px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Trade {company.symbol}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Valuation */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <span className="text-gray-400">Last Round Valuation</span>
            </div>
            <p className="text-3xl font-bold text-emerald-400">
              {formatValuation(company.valuationBn)}
            </p>
            <p className="text-gray-500 text-sm mt-1">Q3 2025 Secondary Market</p>
          </div>

          {/* Rank */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Setter 30 Rank</span>
            </div>
            <p className="text-3xl font-bold">#{company.rank}</p>
            <p className="text-gray-500 text-sm mt-1">of 30 companies</p>
          </div>

          {/* Category */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">Business Category</span>
            </div>
            <p className="text-3xl font-bold">{company.category}</p>
            <p className="text-gray-500 text-sm mt-1">{categoryIcons[company.category]} Sector</p>
          </div>
        </div>
      </div>

      {/* About Section - TODO Placeholder */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">About {company.name}</h2>
          <p className="text-gray-400 mb-4">{company.description}</p>

          {/* TODO: Add more company details */}
          <div className="bg-gray-800/50 border border-dashed border-gray-700 rounded-lg p-6 mt-4">
            <p className="text-gray-500 text-center">
              More company details coming soon...
              <br />
              <span className="text-sm">
                (Founded year, HQ location, employee count, funding history, revenue, etc.)
              </span>
            </p>
          </div>

          {/* Placeholder Links */}
          <div className="flex gap-4 mt-6">
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed"
            >
              <Globe className="w-4 h-4" />
              Website
            </button>
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              disabled
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-500 rounded-lg cursor-not-allowed"
            >
              <ExternalLink className="w-4 h-4" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Trading Section */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 border border-emerald-500/30 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Trade {company.name} on Shadow Protocol</h3>
              <p className="text-gray-400">
                Open encrypted leveraged positions with complete privacy
              </p>
            </div>
            <Link
              href={`/trade?asset=${company.symbol}`}
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-bold text-lg flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Start Trading
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Companies */}
      {similarCompanies.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <h2 className="text-xl font-bold mb-4">Similar Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarCompanies.map((similar) => (
              <Link
                key={similar.symbol}
                href={`/companies/${similar.symbol}`}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-xl">
                    {categoryIcons[similar.category]}
                  </div>
                  <div>
                    <h3 className="font-bold">{similar.name}</h3>
                    <span className="text-gray-500 text-sm">#{similar.rank}</span>
                  </div>
                </div>
                <p className="text-emerald-400 font-bold">{formatValuation(similar.valuationBn)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
