import "./info-section.scss";

/**
 * InfoSection component - A reusable section for displaying information
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.introduction - Introductory text
 * @param {Array<{title: string, items: Array<string|{label: string, content: string}>}>} props.subsections - Array of subsections
 * @param {string} [props.conclusion] - Optional conclusion text
 * @param {string} [props.className] - Optional additional CSS class
 * @returns {JSX.Element} Rendered info section
 */
export default function InfoSection({ 
  title, 
  introduction, 
  subsections, 
  conclusion, 
  className = "" 
}) {
  return (
    <div className={`info-section ${className}`}>
      <h2 className="info-section__title">{title}</h2>
      
      {introduction && (
        <p className="info-section__text">{introduction}</p>
      )}
      
      {subsections.map((subsection, index) => (
        <div key={index} className="info-section__subsection">
          <h3 className="info-section__subtitle">{subsection.title}</h3>
          <ul className="info-section__list">
            {subsection.items.map((item, itemIndex) => (
              <li key={itemIndex} className="info-section__list-item">
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    <strong>{item.label}:</strong> {item.content}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      {conclusion && (
        <p className="info-section__text">{conclusion}</p>
      )}
    </div>
  );
}