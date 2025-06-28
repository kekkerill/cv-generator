import { useCallback } from "react";
import styles from "./Section.module.scss";
import { ReactComponent as CrossIcon } from "../assets/cross.svg";
import { useSectionStore } from "../store/store";

export default function Section({ id, title, values, deletable, isEnabled }) {
  const deleteSection = useSectionStore((state) => state.deleteSection);
  const fields = useSectionStore((state) => state.fields[id] || {});
  const setFieldValue = useSectionStore((state) => state.setFieldValue);

  const handleDeleteClick = useCallback(() => {
    deleteSection(id);
  }, [deleteSection, id]);

  const handleInputChange = useCallback(
    (fieldKey) => (e) => {
      setFieldValue(id, fieldKey, e.target.value);
    },
    [id, setFieldValue]
  );

  if (!isEnabled) return null;

  const getMaxLength = (sectionId, fieldKey) => {
    if (
      (sectionId === "experience" && fieldKey === "description") ||
      (sectionId === "skills" && fieldKey === "skillsName") ||
      (sectionId === "about" && fieldKey === "about")
    ) {
      return 400;
    } else if (sectionId === "contactInfo" && fieldKey === "phone") {
      return 11;
    }

    return 50;
  };

  return (
    <div className={styles.section_wrapper}>
      <div className={styles.section_header}>
        <h2 className={styles.section_title}>{title}</h2>
        {deletable && (
          <div
            onClick={handleDeleteClick}
            className={styles.section_delete}
            role="button"
            tabIndex={0}
            aria-label="Удалить секцию"
          >
            <CrossIcon width={40} height={40} />
          </div>
        )}
      </div>
      <div className={styles.section}>
        {Object.entries(values).map(([key, label]) => {
          const maxLength = getMaxLength(id, key);
          const value = fields[key] || "";

          return (
            <div key={key} className={styles.section_item}>
              <label htmlFor={`${id}_${key}`}>{label}</label>
              <input
                id={`${id}_${key}`}
                type="text"
                value={value}
                onChange={handleInputChange(key)}
                autoComplete="off"
                maxLength={maxLength}
              />
              <div className={styles.section_char_counter}>
                {value.length} / {maxLength}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
