import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className = "",
}) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return (
    totalPages > 1 && (
      <div
        className={
          (className ? `${className} ` : "") +
          "flex flex-col items-center justify-center justify-center gap-4 border-t border-gray-200 bg-gray-50 px-4 py-6 dark:border-gray-700 dark:bg-navy-700 sm:flex-row sm:justify-center md:gap-3 md:py-4"
        }
      >
        <p className="text-xs text-gray-600 dark:text-gray-400 sm:hidden">
          {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)}{" "}
          of {totalItems}
        </p>
        <div className="flex items-center gap-2 sm:gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-xs font-bold text-navy-700 transition hover:bg-gray-100 disabled:opacity-30 dark:border-gray-700 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600 sm:px-4 sm:py-2"
          >
            Previous
          </button>
          <div className="flex items-center gap-1 sm:gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`rounded-lg px-2 py-2 text-xs font-bold transition sm:px-3 ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "border-2 border-gray-200 bg-white text-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-xs font-bold text-navy-700 transition hover:bg-gray-100 disabled:opacity-30 dark:border-gray-700 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600 sm:px-4 sm:py-2"
          >
            Next
          </button>
        </div>
      </div>
    )
  );
}
