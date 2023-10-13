import { useState } from "react";

const AccordionSection = ({
  section,
  isActiveSection,
  setActiveIndex,
  sectionIndex,
}) => {
  const toggleSection = () => {
    const nextIndex = isActiveSection ? null : sectionIndex;
    setActiveIndex(nextIndex);
  };
  return (
    <main className="mt-20 container">
      <div>
        <div className="max-w-3xl mx-auto mb-20">
          <div className="flex cursor-pointer py-3 bg-white text-3xl rounded-tl-3xl rounded-tr-3xl shadow-md" onClick={toggleSection}>
            <div className="w-2000px">{section.title}</div>
            <div className="flex justify-end">{isActiveSection ? "▲" : "▼"}</div>
          </div>
          {isActiveSection && (
            <div className="py-3 bg-white text-xl rounded-bl-3xl rounded-br-3xl shadow-md">
              {section.content}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState();
  return (
    <div className="max-w-3xl mx-auto">
      {sections.map((section, index) => (
        <AccordionSection
          section={section}
          key={index}
          isActiveSection={index === activeIndex}
          setActiveIndex={setActiveIndex}
          sectionIndex={index}
        />
      ))}
    </div>
  );
};

export default Accordion;
