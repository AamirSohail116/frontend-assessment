/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import {
  searchStocks,
  getHistoricalData,
  StockSearchResult,
  HistoricalData,
} from "../lib/alphaVantage";
import StockLineChart from "./LineChart";
import StockBarChart from "./BarChart";
import { Star, Eye } from "lucide-react";
import { useWatchlistStore } from "../store/watchlist";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlistStore();

  const handleSearch = async () => {
    setError(null);
    if (!query) return;

    setLoading(true);
    try {
      const data = await searchStocks(query);
      setResults(data);
      if (data.length > 0) {
        setSelectedStock(data[0].symbol);
      }
    } catch (err: any) {
      if (err.message === "API_RATE_LIMIT") {
        setError("API rate limit exceeded. Please try again later.");
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (selectedStock) {
        setError(null);
        setLoading(true);
        try {
          const data = await getHistoricalData(selectedStock);
          setHistoricalData(data);
        } catch (err: any) {
          if (err.message === "API_RATE_LIMIT") {
            setError("API rate limit exceeded for historical data.");
          } else {
            setError("Failed to fetch historical data.");
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHistoricalData();
  }, [selectedStock]);

  const toggleWatchlist = (symbol: string) => {
    if (isInWatchlist(symbol)) {
      removeFromWatchlist(symbol);
    } else {
      addToWatchlist(symbol);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
        <p className="font-medium">API Notice:</p>
        <p>
          Free AlphaVantage API has daily limits. Data may be unavailable if
          limits are exceeded.
        </p>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          className="border p-2 rounded-full text-gray-900 flex-1"
          placeholder="Search by name or symbol"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-full disabled:bg-gray-300"
          onClick={handleSearch}
          disabled={loading || !query}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-800">
          {error}
        </div>
      )}

      {loading && !error && (
        <div className="text-center py-8">
          <p>Loading data...</p>
        </div>
      )}

      {!loading && results.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          <p>Search for stocks by symbol or company name</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Symbol</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Region</th>
                  <th className="py-3 px-4 text-left">Currency</th>
                  <th className="py-3 px-4 text-left">Match Score</th>
                  <th className="py-3 px-4 text-left">Actions</th>{" "}
                </tr>
              </thead>
              <tbody>
                {results.map((stock) => {
                  const isWatched = isInWatchlist(stock.symbol);
                  return (
                    <tr
                      key={stock.symbol}
                      className={`border-t hover:bg-blue-50 cursor-pointer ${
                        selectedStock === stock.symbol ? "bg-gray-300" : ""
                      }`}
                      onClick={() => setSelectedStock(stock.symbol)}
                    >
                      <td className="py-3 px-4 font-semibold">
                        {stock.symbol}
                      </td>
                      <td className="py-3 px-4">{stock.name}</td>
                      <td className="py-3 px-4">{stock.type}</td>
                      <td className="py-3 px-4">{stock.region}</td>
                      <td className="py-3 px-4">{stock.currency}</td>
                      <td className="py-3 px-4">
                        {(stock.matchScore * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWatchlist(stock.symbol);
                            }}
                            className={`flex items-center px-3 py-1 rounded-md ${
                              isWatched
                                ? "bg-red-500 text-white"
                                : "bg-[#a78bfa] text-white hover:bg-gray-200"
                            }`}
                          >
                            <Star
                              size={16}
                              className="mr-1"
                              fill={isWatched ? "currentColor" : "none"}
                            />
                            {isWatched ? "Remove" : "Watchlist"}
                          </button>
                          <Link
                            href={`/stock/${stock.symbol}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center px-3 py-1 bg-white border border-[#82ca9d] text-[#82ca9d] rounded-md hover:bg-blue-200"
                          >
                            <Eye size={16} className="mr-1" />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {selectedStock && historicalData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <StockLineChart data={historicalData} />
              </div>
              <div>
                <StockBarChart data={historicalData} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
