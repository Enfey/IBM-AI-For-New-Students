import { ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from "@carbon/react";
import "./contact-tile.scss";
/**
 * Component for rendering a single contact information tile, showing title and content. Designed to always render in an expanded state.
 * 
 * 
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the contact tile
 * @param {string} props.content - The content/description of the contact method
 * @param {number} props.index - Index for key and id generation, unique for each tile
 * @returns {JSX.Element} Rendered contact tile component
 */
export default function ContactTile({ title, content, index }) {
  return (
    <ExpandableTile
      key={index}
      id={`expandable-tile-${index}`}
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile"
      className="contact_us_tile"
      expanded={true}
    >
      <TileAboveTheFoldContent>
        <div style={{ height: "auto", width: "100%", padding: "20px" }}>
          <h3 className="bx--type-productive-heading-03">{title}</h3>
        </div>
      </TileAboveTheFoldContent>
      <TileBelowTheFoldContent>
        <div style={{ height: "auto", width: "100%", padding: "20px" }}>
          <p>{content}</p>
        </div>
      </TileBelowTheFoldContent>
    </ExpandableTile>
  );
}