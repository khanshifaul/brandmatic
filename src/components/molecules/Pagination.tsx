'use client';

import { Button } from '../atoms/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showEllipsis = totalPages > 7;

  const getVisiblePages = () => {
    if (!showEllipsis) return pages;

    if (currentPage <= 4) {
      return [...pages.slice(0, 5), '...', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', ...pages.slice(totalPages - 5)];
    }

    return [
      1,
      '...',
      ...pages.slice(currentPage - 2, currentPage + 1),
      '...',
      totalPages,
    ];
  };

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        title="Go to previous page"
      >
        Previous
      </Button>

      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2">
              {page}
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(Number(page))}
              title={`Go to page ${page}`}
            >
              {page}
            </Button>
          )
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="Go to next page"
      >
        Next
      </Button>
    </nav>
  );
} 