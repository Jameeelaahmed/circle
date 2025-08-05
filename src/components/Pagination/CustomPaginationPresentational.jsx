import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomPaginationPresentational({ pageCount, currentPage, onPageChange, pages }) {


    return (
        <div className="flex justify-center gap-2 mt-6 mb-8">
            <button
                className="bg-main text-primary rounded-md px-3 py-2 cursor-pointer font-medium border border-border transition hover:bg-primary hover:text-white"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft size={20} />
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    className={`bg-main text-primary rounded-md px-3 py-2 cursor-pointer font-medium border border-border transition hover:bg-primary hover:text-white ${currentPage === page ? 'bg-primary text-white border-primary' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </button>
            ))}
            <button
                className="bg-main text-primary rounded-md px-3 py-2 cursor-pointer font-medium border border-border transition hover:bg-primary hover:text-white"
                disabled={currentPage === pageCount - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};
