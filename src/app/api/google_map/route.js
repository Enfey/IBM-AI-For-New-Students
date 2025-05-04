/**
 * @author Zefei Xie
 * @param location
 * @returns {JSX.Element}
 * @constructor
 * @description
 * This function is used to generate a dynamic Google Map based on the user's input location.
 */

"use client";

import { useEffect, useState } from "react";
import "./google-map.scss";
import { Map } from "@carbon/icons-react";
import { Button } from "@carbon/react";

export default function DynamicMap({ location }) {
    const [url, setURL] = useState(null);
    const [startAnimation, setAnimation] = useState(true);

    useEffect(() => {
        if (!location) return;

        const encodeLocation = encodeURIComponent(location);
        const apikey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        setURL(
            `https://www.google.com/maps/embed/v1/place?key=${apikey}&q=${encodeLocation}`
        );
    }, [location]);

    const Animation = () => {
        const transitionProperties = startAnimation
            ? { transform: "translateX(-100%)" }
            : {};
        return (
            <div className={"map-container"} style={transitionProperties}>
                <iframe
                    height="100%"
                    width="100%"
                    className={"map-content"}
                    style={{
                        border: 0,
                        margin: "0 auto",
                        display: "block",
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={url}
                />
            </div>
        );
    };

    return (
        <div className={"map-wrapper"}>
            <Animation></Animation>
            <Button
                className={"toggle-button"}
                renderIcon={Map}
                iconDescription={"Map"}
                tooltipPosition={"bottom"}
                hasIconOnly
                onClick={() => {
                    setAnimation(!startAnimation);
                }}
            ></Button>
        </div>
    );
}
