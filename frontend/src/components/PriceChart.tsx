/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Shield } from "lucide-react";
import { Asset, formatUSD, formatPercent } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PriceChartProps {
  selectedAsset: Asset | null;
}

// Generate realistic candlestick data based on asset price
function generateCandlestickData(basePrice: number, days: number = 90) {
  const data: { time: number; open: number; high: number; low: number; close: number }[] = [];
  let currentPrice = basePrice * 0.85; // Start 15% lower
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const volatility = 0.02 + Math.random() * 0.03; // 2-5% daily volatility
    const trend = (basePrice - currentPrice) / basePrice * 0.1; // Drift toward current price
    const change = (Math.random() - 0.45 + trend) * volatility;

    const open = currentPrice;
    const close = currentPrice * (1 + change);
    const high = Math.max(open, close) * (1 + Math.random() * 0.015);
    const low = Math.min(open, close) * (1 - Math.random() * 0.015);

    data.push({
      time: Math.floor(date.getTime() / 1000),
      open,
      high,
      low,
      close,
    });

    currentPrice = close;
  }

  return data;
}

export function PriceChart({ selectedAsset }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candlestickSeriesRef = useRef<any>(null);
  const [timeframe, setTimeframe] = useState("1D");
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current || !selectedAsset) return;

    // Dynamic import for SSR compatibility
    void import("lightweight-charts").then(({ createChart }) => {
      if (!chartContainerRef.current) return;

      // Clear any existing chart
      if (chartRef.current) {
        chartRef.current.remove();
      }

      // Create chart
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: "transparent" },
          textColor: "#9CA3AF",
        },
        grid: {
          vertLines: { color: "rgba(255, 255, 255, 0.05)" },
          horzLines: { color: "rgba(255, 255, 255, 0.05)" },
        },
        crosshair: {
          vertLine: {
            color: "#F7B731",
            labelBackgroundColor: "#F7B731",
          },
          horzLine: {
            color: "#F7B731",
            labelBackgroundColor: "#F7B731",
          },
        },
        rightPriceScale: {
          borderColor: "rgba(255, 255, 255, 0.1)",
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: "rgba(255, 255, 255, 0.1)",
          timeVisible: true,
          secondsVisible: false,
        },
        handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: true,
          vertTouchDrag: true,
        },
      });

      // Add candlestick series
      const candlestickSeries = (chart as any).addCandlestickSeries({
        upColor: "#10B981",
        downColor: "#EF4444",
        borderUpColor: "#10B981",
        borderDownColor: "#EF4444",
        wickUpColor: "#10B981",
        wickDownColor: "#EF4444",
      });

      // Generate and set data
      const data = generateCandlestickData(selectedAsset.price);
      candlestickSeries.setData(data as any);

      // Add price line for current price
      candlestickSeries.createPriceLine({
        price: selectedAsset.price,
        color: "#F7B731",
        lineWidth: 1,
        lineStyle: 2, // Dashed
        axisLabelVisible: true,
        title: "Current",
      });

      // Fit content
      chart.timeScale().fitContent();

      // Store refs
      chartRef.current = chart;
      candlestickSeriesRef.current = candlestickSeries;
      setIsChartReady(true);

      // Handle resize
      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        candlestickSeriesRef.current = null;
        setIsChartReady(false);
      }
    };
  }, [selectedAsset]);

  // Update data when timeframe changes
  useEffect(() => {
    if (!candlestickSeriesRef.current || !selectedAsset || !isChartReady) return;

    const daysMap: Record<string, number> = {
      "1H": 1,
      "4H": 3,
      "1D": 90,
      "1W": 365,
    };

    const data = generateCandlestickData(selectedAsset.price, daysMap[timeframe] || 90);
    candlestickSeriesRef.current.setData(data as any);
    chartRef.current?.timeScale().fitContent();
  }, [timeframe, selectedAsset, isChartReady]);

  if (!selectedAsset) {
    return (
      <div className="flex-1 bg-card border border-border rounded-xl flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-16 h-16 text-text-muted mx-auto mb-4" />
          <p className="text-xl text-text-secondary">Select an asset to trade</p>
          <p className="text-sm text-text-muted mt-2">
            Choose from 17 Pre-IPO companies
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      {/* Chart Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-sm font-bold text-gold border border-border overflow-hidden">
              {selectedAsset.logo ? (
                <img
                  src={selectedAsset.logo}
                  alt={selectedAsset.symbol}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                selectedAsset.symbol.slice(0, 2)
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                {selectedAsset.name}{" "}
                <span className="text-text-muted">(PRE-IPO)</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-text-primary">
                  {formatUSD(selectedAsset.price)}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    selectedAsset.change24h >= 0 ? "text-success" : "text-danger"
                  )}
                >
                  {formatPercent(selectedAsset.change24h)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="badge-gold flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>Encrypted Data Stream</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 relative min-h-[300px]">
        <div ref={chartContainerRef} className="absolute inset-0" />
      </div>

      {/* Time Frame Selector */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="flex gap-2">
          {["1H", "4H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                tf === timeframe
                  ? "bg-gold/20 text-gold"
                  : "text-text-muted hover:text-text-primary hover:bg-card-hover"
              )}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex gap-2 text-xs text-text-muted">
          <span>Scroll to zoom</span>
          <span>|</span>
          <span>Drag to pan</span>
        </div>
      </div>
    </div>
  );
}
