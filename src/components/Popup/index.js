import { useCallback } from "react";
import styles from "./Popup.module.scss";
import { ReactComponent as CrossIcon } from "../assets/cross.svg";

export default function Popup({ sections, onSelect, onClose }) {
  const handlePopupClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const handleSectionClick = useCallback(
    (id) => () => {
      onSelect(id);
    },
    [onSelect]
  );

  return (
    <div className={styles.popup_overlay} onClick={onClose}>
      <div className={styles.popup} onClick={handlePopupClick}>
        <div className={styles.popup_header}>
          <h3>Добавить секцию</h3>
          <button className={styles.popup_close} onClick={onClose}>
            <CrossIcon width={24} height={24} />
          </button>
        </div>
        <ul>
          {sections.length === 0 && <li>Все секции уже добавлены</li>}
          {sections.map((section) => (
            <li key={section.id}>
              <button onClick={handleSectionClick(section.id)}>
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
