'use client';

import { Button } from '../atoms/button';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, value: string) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const hasActiveFilters = Object.values(selectedFilters).some(
    (values) => values.length > 0
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            title="Clear all filters"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {filters.map((group) => (
          <div key={group.id} className="space-y-2">
            <h3 className="font-medium">{group.label}</h3>
            <div className="space-y-1">
              {group.options.map((option) => {
                const isSelected = selectedFilters[group.id]?.includes(option.value);
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onFilterChange(group.id, option.value)}
                    title={`Filter by ${option.label}`}
                    className="w-full justify-start"
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 