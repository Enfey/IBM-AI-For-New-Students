import { ClickableTile } from "@carbon/react";
import "./resource-tile.scss";

/**
 * Component for rendering a single resource tile, showing title and icon.
 * Designed to be clickable @see {@link ClickableTile} and link to the specified URL.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the resource
 * @param {string} props.link - The URL the tile links to
 * @param {JSX.Element} props.icon - The icon to display - should be a Carbon icon
 * @param {number} props.index - Index for key and id generation, unqiue for each tile
 * @returns {JSX.Element} Rendered resource tile component
 */
export default function ResourceTile({ title, link, icon, index }) {
  return (
    <ClickableTile
      href={link}
      id={`tile-${index}`}
      className="resource_tile"
    >
      <div align="center">
        {icon}
        <p className="resource_title">{title}</p>
      </div>
    </ClickableTile>
  );
}