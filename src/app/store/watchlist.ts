import { create } from "zustand";

interface WatchlistState {
  watchlist: string[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  isInWatchlist: (symbol: string) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  watchlist: [],
  addToWatchlist: (symbol) =>
    set((state) => ({
      watchlist: [...state.watchlist, symbol],
    })),
  removeFromWatchlist: (symbol) =>
    set((state) => ({
      watchlist: state.watchlist.filter((s) => s !== symbol),
    })),
  isInWatchlist: (symbol) => get().watchlist.includes(symbol),
}));
