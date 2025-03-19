"use client";

import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {ExpandableTile,TileAboveTheFoldContent, TileBelowTheFoldContent} from "@carbon/react";


const announcements = [
    {
        title: "🚀 System Update",
        content: "System maintenance is scheduled for tonight from 12 AM to 1 AM. Please save your work before this time.",
        date: "2022-01-01"
    },
    {
        title: "🚀 System Update",
        content: "System maintenance is scheduled for tonight from 12 AM to 1 AM. Please save your work before this time.",
        date: "2022-01-01"
    },
];

export default function AnnouncementPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/'); // could redirect to /login in future and separate / from its component parts
        }
    }, [isInitialised, isLoggedIn, router]);

    return (
        <>
            {!isLoggedIn ? null : (
                <div className="announcement-container">

                    {announcements.map((item, index) => (
                    <ExpandableTile
                        onClick={() => console.log("click")}
                        id="expandable-tile-1"
                        tileCollapsedIconText="Interact to Expand tile"
                        tileExpandedIconText="Interact to Collapse tile"
                        className="announcement-tile"
                    >
                        {/* content of the tile */}
                        <TileAboveTheFoldContent>
                            <div style={{ height: "100px", width: "100%", padding: "20px" }}>
                                <h3 className="bx--type-productive-heading-03"> {item.title} </h3>
                                <br/>
                                <p className="bx--type-body-long-01"> {item.date} </p>
                            </div>
                        </TileAboveTheFoldContent>

                        {/* content of the tile below the fold */}
                        <TileBelowTheFoldContent>
                            <div style={{ height: "150px", width: "100%", padding: "20px" }}>
                                <p className="bx--type-body-long-01">
                                    {item.content}
                                </p>
                            </div>
                        </TileBelowTheFoldContent>
                    </ExpandableTile>
                    ))}
                </div>
            )}
        </>
    );
}