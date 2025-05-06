"use client";

import ExpandableTile from "@/components/ExpandableTile/ExpandableTile"; 
import withAuth from "@/components/AuthBlock/AuthBlock";
import { contactMethods } from "./data/data";

/**
 * Contact page component
 *
 * * Protected by auth - redirects to login if not authenticated.
 * * Renders a list of contact methods using the ContactTile component.
 *
 * * Uses:
 * @see {@link withAuth} Custom auth HOC for delegating authentication checks for pages
 * @see {@link ExpandableTile} Reusable Tile component for rendering individual contact methods
 *
 * @returns {JSX.Element|null} The contact page UI, null when not logged in
 */
function ContactPage() {
    return (
        <div className="contact_tile_container">
            {contactMethods.map((method, index) => (
                <ExpandableTile
                    title={method.title}
                    content={method.content}
                    index={index}
                />
            ))}
        </div>
    );
}

export default withAuth(ContactPage);
