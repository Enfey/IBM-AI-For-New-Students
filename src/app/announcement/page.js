"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Pagination from "./components/Pagination/Pagination";
import { usePagination } from "./hooks/usePagination";
import { announcements } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./announcement-page.scss";
import ExpandableTile from "@/components/ExpandableTile/ExpandableTile";
/**
 * Announcement page component
 * @todo add further comment 
 * Uses:
 * @see {@link useAuth} Custom hook for authentication state
 * @see {@link useRouter} From next/navigation for routing
 * @see {@link usePagination} Custom hook for pagination logic
 * @see {@link ExpandableTileTile} Reusable Component for rendering individual announcements
 * @see {@link Pagination} Component for pagination controls
 *
 * @returns {JSX.Element|null} The announcement page UI
 */
function AnnouncementPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();
    const { currentItems, currentPage, totalPages, nextPage, prevPage } =
        usePagination(announcements, 3);

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace("/");
        }
    }, [isInitialised, isLoggedIn, router]);

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
