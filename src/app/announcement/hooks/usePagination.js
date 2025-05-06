import { useState } from "react";

/**
 * Custom hook to manage pagination
 *
 * This hook:
 * - Manages pagination state
 * - Calculates current items to display
 * - Provides navigation methods
 *
 * @todo: Generalise this hook.
 *
 * @param {Array} items - The complete list of items to paginate
 * @param {number} itemsPerPage - Number of items to show per page
 * 
 * @returns {Object} Pagination state and handlers
 * @returns {Array} return.currentItems - Items for the current page
 * @returns {number} return.currentPage - Current page number
 * @returns {number} return.totalPages - Total number of pages
 * @returns {Function} return.nextPage - Function to go to next page
 * @returns {Function} return.prevPage - Function to go to previous page
 * @returns {Function} return.setPage - Function to set specific page
 */
export function usePagination(items, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Calculate current items for display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    // Navigation methods
    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
    };
}
