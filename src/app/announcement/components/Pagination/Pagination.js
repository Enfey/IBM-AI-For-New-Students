import { Button } from "@carbon/react";
import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import "./pagination.scss";

/**
 * Pagination component
 * @todo add further comment 
 * Renders pagination controls for navigation between pages
 *
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPrevPage - Handler for previous page button
 * @param {Function} props.onNextPage - Handler for next page button
 * @returns {JSX.Element} Rendered pagination controls
 */
export default function Pagination({
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
}) {
    return (
        <div className="announcement-pagination">
            <Button
                renderIcon={ArrowLeft}
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="announcement-pagination__button"
            />
            <span className="announcement-pagination__indicator">
                {currentPage} / {totalPages}
            </span>
            <Button
                renderIcon={ArrowRight}
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="announcement-pagination__button"
            />
        </div>
    );
}
