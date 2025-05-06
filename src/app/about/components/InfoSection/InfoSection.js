import "./info-section.scss";

/**
 * InfoSection component - A reusable section for displaying information
 * * This component is designed to present a structured layout card with optional props to customise the content.
 * * It includes a title, an introduction, subsections with lists of items, and an conclusion. (or only a subset of these).
 * * * The subsections can contain either plain text items or objects with labels and content, styled accordingly.
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
    className = "",
}) {
    return (
        <div className={`info-section ${className}`}>
            <h2 className="info-section__title">{title}</h2>

            {introduction && (
                <p className="info-section__text">{introduction}</p>
            )}

            {/*Render subsections, each with a title and a list of items*/}
            {subsections.map((subsection, index) => (
                <div key={index} className="info-section__subsection">
                    <h3 className="info-section__subtitle">
                        {subsection.title}
                    </h3>
                    <ul className="info-section__list">
                        {subsection.items.map((item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="info-section__list-item"
                            >
                                {typeof item === "string" ? (
                                    item /* Display item plain text*/
                                ) : (
                                    <>
                                        <strong>{item.label}:</strong>{" "} {/* Display label if item is an object, styled as bold*/}
                                        {item.content} 
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {conclusion && <p className="info-section__text">{conclusion}</p>}
        </div>
    );
}
