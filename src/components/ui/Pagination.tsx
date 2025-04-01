export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    disabled = false
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}) {
    return (
        <div className="flex justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || disabled}
                className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={disabled}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 text-gray-700'
                    } ${disabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {page}
                </button>
            ))}
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || disabled}
                className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>
    );
}