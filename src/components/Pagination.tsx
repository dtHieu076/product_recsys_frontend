import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    limit: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    limit,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalItems / limit);

    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        range.push(1);
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (totalPages > 1) {
            range.push(totalPages);
        }

        l = range.length;
        for (let i = 0; i < l; i++) {
            if (rangeWithDots.length > 0 && i !== 0 && range[i] - rangeWithDots[rangeWithDots.length - 1] !== 1) {
                rangeWithDots.push('...');
            }
            if (range[i] !== '...') {
                rangeWithDots.push(range[i]);
            } else {
                rangeWithDots.push('...');
            }
        }
        return rangeWithDots;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center mt-12 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
                Previous
            </button>
            {visiblePages.map((page, index) => (
                <React.Fragment key={index}>
                    {page === '...' ? (
                        <span className="px-4 py-2 text-sm text-gray-500">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(Number(page))}
                            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${currentPage === page
                                    ? 'bg-black text-white border-black shadow-sm'
                                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400'
                                }`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
                Next
            </button>
        </div>
    );
};
