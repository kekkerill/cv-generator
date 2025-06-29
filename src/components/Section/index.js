import { useCallback, useState } from "react";
import styles from "./Section.module.scss";
import { ReactComponent as CrossIcon } from "../assets/cross.svg";
import { useSectionStore } from "../store/store";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(79|89)\d{9}$/;

export default function Section({ id, title, values, deletable, isEnabled }) {
  const deleteSection = useSectionStore((state) => state.deleteSection);
  const fields = useSectionStore((state) => state.fields[id] || {});
  const setFieldValue = useSectionStore((state) => state.setFieldValue);

  // Состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  const handleDeleteClick = useCallback(() => {
    deleteSection(id);
  }, [deleteSection, id]);

  const validate = useCallback(
    (fieldKey, value) => {
      if (id === "contactInfo") {
        if (fieldKey === "email") {
          if (!emailRegex.test(value)) {
            return "Введите корректный email";
          }
        }
        if (fieldKey === "phone") {
          if (!phoneRegex.test(value)) {
            return "Введите корректный номер телефона";
          }
        }
      }

      return "";
    },
    [id]
  );

  const handleInputChange = useCallback(
    (fieldKey) => (e) => {
      const value = e.target.value;
      setFieldValue(id, fieldKey, value);
      const error = validate(fieldKey, value);
      setErrors((prev) => ({ ...prev, [fieldKey]: error }));
    },
    [id, setFieldValue, validate]
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
          const error = errors[key];

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
                className={error ? styles.input_error : ""}
              />
              <div className={styles.section_char_counter}>
                {value.length} / {maxLength}
              </div>
              {error && <div className={styles.section_error}>{error}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
