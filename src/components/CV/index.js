import styles from "./CV.module.scss";
import { useSectionStore } from "../store/store";
import { SECTION_INFO } from "../constants";

export default function CV({ fontFamily }) {
  const sectionEnable = useSectionStore((state) => state.sectionEnable);
  const sectionOrder = useSectionStore((state) => state.sectionOrder);
  const fields = useSectionStore((state) => state.fields);

  // Какие поля должны быть жирными
  const boldFields = {
    education: ["institution"],
    personalInfo: ["Name"],
    experience: ["company"]
  };

  const visibleSections = sectionOrder
    .filter((id) => sectionEnable[id])
    .map((id) => {
      const section = SECTION_INFO.find((s) => s.id === id);

      return section ? { ...section, id } : null;
    })
    .filter(Boolean);

  return (
    <>
      {visibleSections.map((section) => (
        <div
          key={section.id}
          style={{ fontFamily }}
          className={styles.cv_section}
        >
          <h4>{section.title}</h4>
          <div className={styles.cv_fields}>
            {Object.entries(section.values).map(([fieldKey]) => {
              const value = fields[section.id]?.[fieldKey] || "";
              const isBold =
                boldFields[section.id] &&
                boldFields[section.id].includes(fieldKey);

              return (
                <div key={fieldKey} className={styles.cv_field}>
                  <p style={isBold ? { fontWeight: "bold" } : undefined}>
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
