/**
 * @author Zefei Xie
 * @param location
 * @returns {JSX.Element}
 * @constructor
 * @description
 * This function is used to generate a dynamic Google Map based on the user's input location.
 */

export default function DynamicMap({location}) {
    const encodeLocation = encodeURIComponent(location);
    const apikey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://www.google.com/maps/embed/v1/place?key=${apikey}&q=${encodeLocation}`
    return (
        <iframe
            width="80%"
            height="35%"
            style={{
                border: 0,
                margin: "0 auto",
                marginTop: "70px",
                display: "block"
            }}
            loading = "lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={url}
        />
    )
}