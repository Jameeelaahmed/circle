import CustomPaginationPresentational from "./CustomPaginationPresentational"

function CustomPaginationContainer({ pageCount, currentPage, onPageChange }) {
    if (pageCount <= 1) return null;

    const pages = Array.from({ length: pageCount }, (_, i) => i);
    return (
        <CustomPaginationPresentational
            pageCount={pageCount}
            currentPage={currentPage}
            onPageChange={onPageChange}
            pages={pages}
        />
    )
}

export default CustomPaginationContainer
