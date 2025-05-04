import { Button } from "@carbon/react";
import { ArrowLeft, ArrowRight } from "@carbon/icons-react";
import "./pagination.scss";

/**
 * Pagination component.
 *
 * Renders pagination controls for navigation between pages.
 * This component provides a simple pagination interface with previous and next buttons,
 * as well as an indicator for the current page and total pages.
 * Designed to be used in scenarios where a large set of data is divided into multiple pages,
 * allowing users to navigate through them easily.
 *
 * Uses:
 * - {@link Button} from Carbon Design System for button rendering
 * - {@link ArrowLeft} and {@link ArrowRight} icons from Carbon Design System for navigation arrows
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
                hasIconOnly
                onClick={onPrevPage}
                disabled={currentPage === 1}
                className="announcement-pagination__button"
            />
            <span className="announcement-pagination__indicator">
                {currentPage} / {totalPages}
            </span>
            <Button
                renderIcon={ArrowRight}
                hasIconOnly
                onClick={onNextPage}
                disabled={currentPage === totalPages}
                className="announcement-pagination__button"
            />
        </div>
    );
}