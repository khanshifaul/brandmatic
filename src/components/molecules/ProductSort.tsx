'use client';

interface SortOption {
  value: string;
  label: string;
}

interface ProductSortProps {
  options: SortOption[];
  currentSort: string;
  onSortChange: (value: string) => void;
}

export function ProductSort({ options, currentSort, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-1.5 text-sm rounded-md border border-border bg-background"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
} 