"use client";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {Button, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent} from "@carbon/react";
import {ArrowLeft, ArrowRight} from "@carbon/icons-react";

const tiles = [
    {
        title: "📞 Phone Contact",
        content: "Call us on +1 555 555 5555",
    },
    {
        title: "📧 Email Contact",
        content: "Email us at EMAIL",
    },
    {
        title: "🏛 Website Contact",
        content: "Add a discussion to our git repo: ",
    },
    {
        title: "📝 Feedback Survey",
        content: "Please fill out our feedback survey to help us improve our services."
        + "\n survey link: https://www.fffff",
    }
];

export default function ContactPage() {
    const { isLoggedIn, isInitialised } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialised && !isLoggedIn) {
            router.replace('/');
        }
    }, [isInitialised, isLoggedIn, router]);


    return (
        <>
            {!isLoggedIn ? null : (
                <div className="contact-us-container">
                    {tiles.map((item, index) => (
                        <ExpandableTile
                            key={index}
                            onClick={() => console.log("click")}
                            id={`expandable-tile-${index}`}
                            tileCollapsedIconText="Interact to Expand tile"
                            tileExpandedIconText="Interact to Collapse tile"
                            className="contact-us-tile"
                            expanded={true}
                        >
                            {/* Tile */}
                            <TileAboveTheFoldContent>
                                <div style={{ height: "auto", width: "100%", padding: "20px" }}>
                                    <h3 className="bx--type-productive-heading-03"> {item.title} </h3>
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
                </div>
            )}
        </>
    );
}