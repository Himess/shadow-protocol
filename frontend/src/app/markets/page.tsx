"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components";
import { ASSETS, CATEGORIES, Asset, formatUSD, formatPercent, formatMarketCap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Lock,
  Activity,
  Users,
  DollarSign,
  ArrowRight,
  Cpu,
  Rocket,
  CreditCard,
  Database,
  Users as UsersIcon,
  BarChart3,
  Shield,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";

// Category icons
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  AI: <Cpu className="w-5 h-5" />,
  AEROSPACE: <Rocket className="w-5 h-5" />,
  FINTECH: <CreditCard className="w-5 h-5" />,
  DATA: <Database className="w-5 h-5" />,
  SOCIAL: <UsersIcon className="w-5 h-5" />,
};

// Sort types
type SortField = "name" | "price" | "change" | "marketCap" | "volume" | "oi" | "funding" | "longRatio";
type SortDirection = "asc" | "desc";

// Generate mock market data with seeded randomness based on asset id
function generateMarketData(asset: Asset) {
  // Use asset id to generate consistent random values
  const seed = asset.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const baseVolume = asset.price * 1000000 * (0.5 + random(1));
  return {
    volume24h: baseVolume,
    openInterest: baseVolume * 0.4,
    fundingRate: (random(2) - 0.5) * 0.02,
    longRatio: 45 + random(3) * 20,
  };
}

// Platform stats
const PLATFORM_STATS = {
  totalVolume: 847500000,
  totalTrades: 12847,
  totalUsers: 3241,
  totalOI: 156000000,
};

// Sortable Header Component
function SortableHeader({
  field,
  label,
  currentSort,
  currentDirection,
  onSort,
  className,
}: {
  field: SortField;
  label: string;
  currentSort: SortField;
  currentDirection: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
}) {
  const isActive = currentSort === field;

  return (
    <th
      className={cn(
        "px-6 py-4 font-medium cursor-pointer hover:bg-card-hover transition-colors select-none",
        className
      )}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        <span>{label}</span>
        {isActive ? (
          currentDirection === "asc" ? (
            <ChevronUp className="w-4 h-4 text-gold" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gold" />
          )
        ) : (
          <ArrowUpDown className="w-3 h-3 text-text-muted opacity-50" />
        )}
      </div>
    </th>
  );
}

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("marketCap");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to desc (highest first)
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter and sort assets
  const sortedAssets = useMemo(() => {
    const filtered = selectedCategory
      ? ASSETS.filter(a => a.category === selectedCategory)
      : ASSETS;

    return [...filtered].sort((a, b) => {
      const dataA = generateMarketData(a);
      const dataB = generateMarketData(b);

      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        case "change":
          comparison = a.change24h - b.change24h;
          break;
        case "marketCap":
          comparison = a.marketCap - b.marketCap;
          break;
        case "volume":
          comparison = dataA.volume24h - dataB.volume24h;
          break;
        case "oi":
          comparison = dataA.openInterest - dataB.openInterest;
          break;
        case "funding":
          comparison = dataA.fundingRate - dataB.fundingRate;
          break;
        case "longRatio":
          comparison = dataA.longRatio - dataB.longRatio;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [selectedCategory, sortField, sortDirection]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 px-4 md:px-6 pb-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Markets</h1>
          <p className="text-text-muted">
            Trade Pre-IPO synthetic assets with encrypted positions
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-text-muted mb-2">
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs uppercase">24h Volume</span>
            </div>
            <p className="text-xl font-bold text-text-primary">
              {formatUSD(PLATFORM_STATS.totalVolume)}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-text-muted mb-2">
              <Activity className="w-4 h-4" />
              <span className="text-xs uppercase">Open Interest</span>
            </div>
            <p className="text-xl font-bold text-text-primary flex items-center gap-2">
              {formatUSD(PLATFORM_STATS.totalOI)}
              <Lock className="w-4 h-4 text-gold" />
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-text-muted mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs uppercase">24h Trades</span>
            </div>
            <p className="text-xl font-bold text-text-primary">
              {PLATFORM_STATS.totalTrades.toLocaleString()}
            </p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-text-muted mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs uppercase">Active Traders</span>
            </div>
            <p className="text-xl font-bold text-text-primary">
              {PLATFORM_STATS.totalUsers.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
              selectedCategory === null
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-card border border-border text-text-muted hover:text-text-primary"
            )}
          >
            All Markets
          </button>
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2",
                selectedCategory === key
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "bg-card border border-border text-text-muted hover:text-text-primary"
              )}
            >
              {CATEGORY_ICONS[key]}
              {category.name}
            </button>
          ))}
        </div>

        {/* Info about sorting */}
        <div className="flex items-center gap-2 mb-4 text-xs text-text-muted">
          <ArrowUpDown className="w-3 h-3" />
          <span>Click column headers to sort</span>
        </div>

        {/* Markets Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-border text-left text-xs text-text-muted uppercase tracking-wider">
                <SortableHeader
                  field="name"
                  label="Market"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="price"
                  label="Price"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="change"
                  label="24h Change"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="marketCap"
                  label="Market Cap"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="volume"
                  label="24h Volume"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="oi"
                  label="Open Interest"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="funding"
                  label="Funding"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="longRatio"
                  label="Long/Short"
                  currentSort={sortField}
                  currentDirection={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedAssets.map((asset) => {
                const marketData = generateMarketData(asset);
                return (
                  <tr key={asset.id} className="hover:bg-card-hover transition-colors">
                    {/* Market */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-sm font-bold text-gold border border-border overflow-hidden">
                          {asset.logo ? (
                            <img
                              src={asset.logo}
                              alt={asset.symbol}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            asset.symbol.slice(0, 2)
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">{asset.name}</p>
                          <p className="text-xs text-text-muted">{asset.symbol}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="font-semibold text-text-primary">
                        {formatUSD(asset.price)}
                      </span>
                    </td>

                    {/* 24h Change */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "flex items-center gap-1 font-medium",
                          asset.change24h >= 0 ? "text-success" : "text-danger"
                        )}
                      >
                        {asset.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {formatPercent(asset.change24h)}
                      </span>
                    </td>

                    {/* Market Cap */}
                    <td className="px-6 py-4">
                      <span className="text-text-primary font-medium">
                        {formatMarketCap(asset.marketCap)}
                      </span>
                    </td>

                    {/* Volume */}
                    <td className="px-6 py-4">
                      <span className="text-text-primary">
                        {formatUSD(marketData.volume24h)}
                      </span>
                    </td>

                    {/* Open Interest */}
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-text-primary">
                        {formatUSD(marketData.openInterest)}
                        <Lock className="w-3 h-3 text-gold" />
                      </span>
                    </td>

                    {/* Funding Rate */}
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "font-medium",
                          marketData.fundingRate >= 0 ? "text-success" : "text-danger"
                        )}
                      >
                        {marketData.fundingRate >= 0 ? "+" : ""}
                        {(marketData.fundingRate * 100).toFixed(4)}%
                      </span>
                    </td>

                    {/* Long/Short */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-background rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-success"
                            style={{ width: `${marketData.longRatio}%` }}
                          />
                          <div
                            className="h-full bg-danger"
                            style={{ width: `${100 - marketData.longRatio}%` }}
                          />
                        </div>
                        <span className="text-xs text-text-muted">
                          {marketData.longRatio.toFixed(0)}%
                        </span>
                      </div>
                    </td>

                    {/* Trade Button */}
                    <td className="px-6 py-4">
                      <Link
                        href={`/trade?asset=${asset.id}`}
                        className="flex items-center gap-1 px-4 py-2 bg-gold/20 text-gold rounded-lg font-medium text-sm hover:bg-gold/30 transition-colors"
                      >
                        Trade
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Encrypted Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-gold">
          <Shield className="w-4 h-4" />
          <span className="text-sm">All positions are encrypted with FHE</span>
        </div>
      </main>
    </div>
  );
}
