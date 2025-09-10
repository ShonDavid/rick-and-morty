import { useMemo, type FunctionComponent } from "react";
import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  totalItems?: number;
  itemsPerPage?: number;
}

const DELTA = 2;

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
  totalItems,
  itemsPerPage = 20,
}) => {
  const visiblePages = useMemo(() => {
    const range: number[] = [];
    const rangeWithDots = [];

    if (totalPages <= 1) {
      return [1];
    }

    for (
      let i = Math.max(2, currentPage - DELTA);
      i <= Math.min(totalPages - 1, currentPage + DELTA);
      i++
    ) {
      range.push(i);
    }

    rangeWithDots.push(1);

    if (currentPage - DELTA > 2) {
      rangeWithDots.push("...");
    }

    rangeWithDots.push(...range);

    if (currentPage + DELTA < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }, [totalPages, currentPage]);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !loading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="pagination__info">
        {totalItems && (
          <span className="pagination__count">
            Showing {startItem}-{endItem} of {totalItems} characters
          </span>
        )}
      </div>

      <div className="pagination__controls">
        <button
          className="pagination__button pagination__button--prev"
          onClick={handlePrevious}
          disabled={currentPage === 1 || loading}
          aria-label="Previous page"
        >
          Previous
        </button>

        <div className="pagination__pages-list">
          {visiblePages.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`dots-${index}`} className="pagination__dots">
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                className={`pagination__button pagination__button--page ${
                  isActive ? "pagination__button--active" : ""
                }`}
                onClick={() => handlePageClick(pageNumber)}
                disabled={loading}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          className="pagination__button pagination__button--next"
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
