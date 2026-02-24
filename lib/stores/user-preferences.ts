"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPreferencesState {
  // Watchlist
  watchlist: string[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;

  // Featured chart on dashboard
  featuredSymbol: string;
  setFeaturedSymbol: (symbol: string) => void;

  // Academy progress
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  resetProgress: () => void;

  // Recent searches
  recentSearches: string[];
  addRecentSearch: (symbol: string) => void;
}

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      // Watchlist
      watchlist: ["EURUSD", "BTCUSD", "XAUUSD"],
      addToWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.includes(symbol)
            ? state.watchlist
            : [...state.watchlist, symbol],
        })),
      removeFromWatchlist: (symbol) =>
        set((state) => ({
          watchlist: state.watchlist.filter((s) => s !== symbol),
        })),

      // Featured chart
      featuredSymbol: "EURUSD",
      setFeaturedSymbol: (symbol) => set({ featuredSymbol: symbol }),

      // Academy
      completedLessons: [],
      markLessonComplete: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      resetProgress: () => set({ completedLessons: [] }),

      // Recent searches
      recentSearches: [],
      addRecentSearch: (symbol) =>
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== symbol);
          return {
            recentSearches: [symbol, ...filtered].slice(0, 10),
          };
        }),
    }),
    {
      name: "finvest-preferences",
    }
  )
);
