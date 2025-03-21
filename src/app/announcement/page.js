"use client";

import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {Button, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent} from "@carbon/react";
import {ArrowLeft, ArrowRight} from "@carbon/icons-react";


const announcements = [
    {
        title: "🐞 System Bug Announcement",
        content: "Currently, there is a bug in the system that is causing the page loading fault, and user have to refresh the page to continue using the system. We are working on fixing the issue and will update the system as soon as possible.",
        date: "2025-03-21"
    },
    {
        title: "🚀 RAG feature launch",
        content: "The RAG feature is now live and ready for use. You can now ask the chatbot for some extra questions and get a personalized response.",
        date: "2025-02-27"
    },
    {
        title: "🆕 System Update",
        content: "Add Login feature using firebase to the system and improve the user experience.",
        date: "2025-02-09"
    },
    {
        title: "🆕 System Update",
        content: "Add Map integration to the system and improve the user experience.",
        date: "2025-01-28"
    },
    {
        title: "🆕 System Update",
        content: "Add live2d animation to the system and improve the user experience.",
        date: "2025-01-07"
    },
    {
        title: "🛠️ Dev Version Release",
        content: "Finish the basic version of the system and release it to the public.",
        date: "2025-01-01"
    },
];

export default function AnnouncementPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/');
        }
    }, [isInitialised, isLoggedIn, router]);

    // calculate current items and total pages
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // calculate current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = announcements.slice(indexOfFirstItem, indexOfLastItem);

    // calculate total pages
    const totalPages = Math.ceil(announcements.length / itemsPerPage);

    return (
        <>
            {!isLoggedIn ? null : (
                <div className="announcement-container">
                    {currentItems.map((item, index) => (
                        <ExpandableTile
                            key={index}
                            onClick={() => console.log("click")}
                            id={`expandable-tile-${index}`}
                            tileCollapsedIconText="Interact to Expand tile"
                            tileExpandedIconText="Interact to Collapse tile"
                            className="announcement-tile"
                            expanded={true}
                        >
                            {/* Tile */}
                            <TileAboveTheFoldContent>
                                <div style={{ height: "auto", width: "100%", padding: "20px" }}>
                                    <h3 className="bx--type-productive-heading-03"> {item.title} </h3>
                                    <p className="bx--type-body-long-01"> {item.date} </p>
                                </div>
                            </TileAboveTheFoldContent>

                            {/* Tile  */}
                            <TileBelowTheFoldContent>
                                <div style={{ height: "auto", width: "100%", padding: "20px" }}>
                                    <p className="bx--type-body-long-01">
                                        {item.content}
                                    </p>
                                </div>
                            </TileBelowTheFoldContent>
                        </ExpandableTile>
                    ))}

                    <br/>
                    <br/>

                    <div  align="center" style={{ width: "100%" }}>
                        <Button
                            renderIcon={ArrowLeft}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                        </Button>
                        <span style={{ marginLeft: "20px", marginRight: "20px", textAlign: "center" }}> {currentPage}  /  {totalPages}  </span>
                        <Button
                            renderIcon={ArrowRight}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                        </Button>
                    </div>

                    <br/>
                </div>
            )}
        </>
    );
}