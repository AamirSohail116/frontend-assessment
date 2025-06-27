/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useWatchlistStore } from "@/app/store/watchlist";
import {
  getHistoricalData,
  getStockQuote,
  HistoricalData,
} from "@/app/lib/alphaVantage";
import StockLineChart from "@/app/components/LineChart";
import StockBarChart from "@/app/components/BarChart";

export default function StockDetailPage() {
  const params = useParams();
  const symbol = params.symbol as string;

  const [stockQuote, setStockQuote] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);

  const { isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlistStore();

  const isWatched = isInWatchlist(symbol);

  const toggleWatchlist = () => {
    if (isWatched) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const quote = await getStockQuote(symbol);
        const historical = await getHistoricalData(symbol);
        setStockQuote(quote);
        setHistoricalData(historical);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading stock data...</p>
      </div>
    );
  }

  if (!stockQuote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Stock not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-32">
      <Link href="/" className="inline-flex items-center mb-4 text-blue-500">
        <ArrowLeft size={16} className="mr-2" /> Back to Home
      </Link>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {stockQuote.name} ({stockQuote.symbol})
        </h1>
        <button
          onClick={toggleWatchlist}
          className={`flex items-center px-4 py-2 rounded-lg ${
            isWatched
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Star
            size={20}
            className="mr-2"
            fill={isWatched ? "currentColor" : "none"}
          />
          {isWatched ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Current Price</p>
            <p className="text-2xl font-bold text-gray-600">
              ${stockQuote.price.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-600">Change</p>
            <p
              className={`text-2xl font-bold ${
                stockQuote.changePercent.startsWith("-")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {stockQuote.changePercent}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Price Trend
          </h2>
          <StockLineChart data={historicalData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Trading Volume
          </h2>
          <StockBarChart data={historicalData} />
        </div>
      </div>
    </div>
  );
}
