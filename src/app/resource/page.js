"use client";

import ResourceTile from "./components/ResourceTile/ResourceTile";
import { resources } from "./data/data";
import withAuth from "@/components/AuthBlock/AuthBlock";
import "./resource-page.scss";

/**
 * Resource page component
 * * Handles the rendering of the resource page, which includes a set of {@link ResourceTile} components.
 * * Protected by auth - redirects to login by default if not authenticated.
 * 
 * Uses:
 * @see {@link ResourceTile} Component for rendering individual resources
 * @see {@link withAuth} Custom auth HOC for delegating authentication checks for pages
 * @see {@link resources} for data used in the resource tiles
 * 
 * @returns {JSX.Element|null} The resource page UI, null if not authenticated.
 * 
 */
function ResourcePage() {
    return (
        // Map through the resources array and render a ResourceTile for each resource
        <div className="resource-container">
            {resources.map((resource, index) => (
                <ResourceTile
                    title={resource.title} 
                    link={resource.link}
                    icon={resource.icon}
                    index={index}
                />
            ))}
        </div>
    );
}

export default withAuth(ResourcePage);
