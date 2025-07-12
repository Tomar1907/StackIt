"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Search, X, Loader2 } from "lucide-react";

interface DebouncedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  className?: string;
  initialValue?: string;
}

export default function DebouncedSearch({
  onSearch,
  placeholder = "Search questions...",
  debounceMs = 300,
  isLoading = false,
  className = "",
  initialValue = "",
}: DebouncedSearchProps) {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery] = useDebounce(query, debounceMs);

  // Trigger search when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query);
    },
    [query, onSearch],
  );

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          autoComplete="off"
          spellCheck="false"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white text-gray-400 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Hints */}
      {query.length > 0 && query.length < 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-400">
          Type at least 3 characters to search
        </div>
      )}

      {/* Quick Actions */}
      {query.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-800 border border-gray-700 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Quick searches:</div>
          <div className="flex flex-wrap gap-2">
            {["react", "javascript", "typescript", "nextjs", "css"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-full text-xs transition-colors duration-200"
                >
                  #{tag}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </form>
  );
}

// Advanced search component with filters
interface AdvancedSearchProps extends DebouncedSearchProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags?: string[];
  sortBy?: "newest" | "oldest" | "votes" | "answers";
  onSortChange?: (sort: "newest" | "oldest" | "votes" | "answers") => void;
}

export function AdvancedSearch({
  selectedTags,
  onTagsChange,
  availableTags = [
    "react",
    "javascript",
    "typescript",
    "nextjs",
    "css",
    "html",
    "nodejs",
    "python",
  ],
  sortBy = "newest",
  onSortChange,
  ...searchProps
}: AdvancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        onTagsChange(selectedTags.filter((t) => t !== tag));
      } else {
        onTagsChange([...selectedTags, tag]);
      }
    },
    [selectedTags, onTagsChange],
  );

  return (
    <div className="space-y-4">
      <DebouncedSearch {...searchProps} />

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
          />
        </svg>
        Advanced Filters {showFilters ? "▼" : "▶"}
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-4">
          {/* Sort Options */}
          {onSortChange && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="votes">Most Voted</option>
                <option value="answers">Most Answered</option>
              </select>
            </div>
          )}

          {/* Tag Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedTags.length > 0 || sortBy !== "newest") && (
            <button
              onClick={() => {
                onTagsChange([]);
                onSortChange?.("newest");
              }}
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}