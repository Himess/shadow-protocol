"use client";

import { Asset, formatUSD } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, Clock, Lock, BarChart3 } from "lucide-react";

interface MarketInfoProps {
  selectedAsset: Asset | null;
}

// Simulated market data with seeded randomness
function generateMarketData(asset: Asset) {
  const seed = asset.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (offset: number) => {
    const x = Math.sin(seed + offset) * 10000;
    return x - Math.floor(x);
  };

  const baseVolume = asset.price * 1000000 * (0.5 + random(1));
  const baseLiquidity = asset.price * 5000000 * (0.3 + random(4) * 0.7);

  return {
    volume24h: baseVolume,
    volumeChange: (random(5) - 0.3) * 30,
    openInterest: baseVolume * 0.4,
    fundingRate: (random(2) - 0.5) * 0.02,
    liquidity: baseLiquidity,
    trades24h: Math.floor(500 + random(6) * 2000),
    longRatio: 45 + random(3) * 20,
    nextFunding: Math.floor(random(7) * 8 * 60), // minutes
  };
}

export function MarketInfo({ selectedAsset }: MarketInfoProps) {
  if (!selectedAsset) {
    return null;
  }

  const marketData = generateMarketData(selectedAsset);

  return (
    <div className="bg-card border border-border rounded-xl p-3 flex-shrink-0">
      {/* Compact horizontal layout */}
      <div className="flex items-center gap-6 overflow-x-auto">
        {/* Volume */}
        <div className="flex items-center gap-2 min-w-fit">
          <BarChart3 className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">24h Vol</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-text-primary">
                {formatUSD(marketData.volume24h)}
              </span>
              <span
                className={cn(
                  "text-xs flex items-center",
                  marketData.volumeChange >= 0 ? "text-success" : "text-danger"
                )}
              >
                {marketData.volumeChange >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Open Interest */}
        <div className="flex items-center gap-2 min-w-fit">
          <Activity className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">Open Interest</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-text-primary">
                {formatUSD(marketData.openInterest)}
              </span>
              <Lock className="w-3 h-3 text-gold" />
            </div>
          </div>
        </div>

        {/* Funding Rate */}
        <div className="flex items-center gap-2 min-w-fit">
          <DollarSign className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">Funding</span>
            <span
              className={cn(
                "text-sm font-semibold block",
                marketData.fundingRate >= 0 ? "text-success" : "text-danger"
              )}
            >
              {marketData.fundingRate >= 0 ? "+" : ""}
              {(marketData.fundingRate * 100).toFixed(4)}%
            </span>
          </div>
        </div>

        {/* Next Funding */}
        <div className="flex items-center gap-2 min-w-fit">
          <Clock className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">Next Funding</span>
            <span className="text-sm font-semibold text-text-primary block">
              {Math.floor(marketData.nextFunding / 60)}h {marketData.nextFunding % 60}m
            </span>
          </div>
        </div>

        {/* 24h Trades */}
        <div className="flex items-center gap-2 min-w-fit">
          <Users className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">24h Trades</span>
            <span className="text-sm font-semibold text-text-primary block">
              {marketData.trades24h.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Liquidity */}
        <div className="flex items-center gap-2 min-w-fit">
          <DollarSign className="w-4 h-4 text-text-muted" />
          <div>
            <span className="text-xs text-text-muted">Liquidity</span>
            <span className="text-sm font-semibold text-text-primary block">
              {formatUSD(marketData.liquidity)}
            </span>
          </div>
        </div>

        {/* Long/Short Ratio - Visual bar */}
        <div className="flex items-center gap-2 min-w-fit ml-auto">
          <div>
            <span className="text-xs text-text-muted">Long/Short</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-background rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-success transition-all duration-500"
                  style={{ width: `${marketData.longRatio}%` }}
                />
                <div
                  className="h-full bg-danger transition-all duration-500"
                  style={{ width: `${100 - marketData.longRatio}%` }}
                />
              </div>
              <span className="text-xs text-text-muted">
                {marketData.longRatio.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
