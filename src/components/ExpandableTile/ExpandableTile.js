import {
  ExpandableTile as CarbonExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "@carbon/react";
import "./expandable-tile.scss";

/**
 * Wrapper component for renderinc carbon's ExpandableTile component, used in announcements and other sections.
 * Provides a consistent, reusable interface for rendering expandable tiles with custom content passed as props.
 * 
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the tile
 * @param {string} props.content - The main content of the tile
 * @param {string} [props.date] - Optional date for the tile (used in announcements)
 * @param {number} props.index - Index for key and id generation
 * @param {boolean} [props.expanded=true] - Whether tile is expanded by default
 * @param {Function} [props.renderAboveContent] - Optional function to render custom above-fold content
 * @param {Function} [props.renderBelowContent] - Optional function to render custom below-fold content
 * @returns {JSX.Element} Rendered generic expandable tile component
 */

export default function ExpandableTile({
  title,
  content,
  date,
  index,
  expanded = true,
  renderAboveContent,
  renderBelowContent,
}) {
  return (
    <CarbonExpandableTile
      key={index}
      id={`expandable-tile-${index}`}
      tileCollapsedIconText="Interact to Expand tile"
      tileExpandedIconText="Interact to Collapse tile"
      className={'expandable-tile'} //can always be overridden/add support for custom classnames
      expanded={expanded}
    >
        {/* Many css classes defined here - but not really necessary, moreso for completeness */}
      <TileAboveTheFoldContent>
        <div style={{ height: "auto", width: "100%", padding: "20px" }}>
          {renderAboveContent ? (
            renderAboveContent()
          ) : (
            <div className="expandable-tile__header">
              <h3 className="expandable-tile__title">{title}</h3>
              {date && <p className="expandable-tile__date">{date}</p>}
            </div>
          )}
        </div>
      </TileAboveTheFoldContent>

      <TileBelowTheFoldContent>
        <div style={{ height: "auto", width: "100%", padding: "20px" }}>
          {renderBelowContent ? (
            renderBelowContent()
          ) : (
            <div className="expandable-tile__content">
              <p>{content}</p>
            </div>
          )}
        </div>
      </TileBelowTheFoldContent>
    </CarbonExpandableTile>
  );
}
