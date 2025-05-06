"use client";

import Pagination from "./components/Pagination/Pagination";
import { usePagination } from "./hooks/usePagination";
import { announcements } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./announcement-page.scss";
import ExpandableTile from "@/components/ExpandableTile/ExpandableTile";
/**
 * Announcement page component
 * * Handles the rendering of the announcement page, which in turn is responsible for rendering a set of {@link ExpandableTile} components across multiple pages.
 * * * Protected by auth - redirects to login by default if not authenticated.
 *
 * Uses:
 * @see {@link usePagination} Custom hook for pagination logic
 * @see {@link ExpandableTile} Reusable Component for rendering individual announcements
 * @see {@link Pagination} Component for pagination controls
 *
 * @returns {JSX.Element|null} The announcement page UI, null if not authenticated.
 */
function AnnouncementPage() {
    const { currentItems, currentPage, totalPages, nextPage, prevPage } =
        usePagination(announcements, 3); // 3 tiles per page

    return (
        <div className="announcement-container">
            {currentItems.map((announcement, index) => (
                <ExpandableTile
                    key={index}
                    title={announcement.title}
                    content={announcement.content}
                    date={announcement.date}
                    index={index}
                />
            ))}

            {/* Pass from usePagination hook to Pagination component*/}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={prevPage}
                onNextPage={nextPage}
            />
        </div>
    );
}

export default withAuth(AnnouncementPage);
