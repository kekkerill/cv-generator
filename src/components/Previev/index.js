import { useState, useCallback } from "react";
import { usePDF } from "react-to-pdf";
import CV from "../CV";
import styles from "./Previev.module.scss";
import { ReactComponent as DownloadIcon } from "../assets/download.svg";

const FONT_OPTIONS = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Segoe UI", value: "'Segoe UI', Arial, sans-serif" },
  { label: "Roboto", value: "'Roboto', Arial, sans-serif" }
];

export default function Previev() {
  const [font, setFont] = useState(FONT_OPTIONS[0].value);
  const { toPDF, targetRef } = usePDF({ filename: "resume.pdf" });

  const handleFontChange = useCallback((e) => {
    setFont(e.target.value);
  }, []);

  return (
    <div className={styles.preview_wrapper}>
      <div className={styles.preview_header}>
        <div></div>
        <h2 className={styles.preview_title}>Preview</h2>
        <select
          value={font}
          onChange={handleFontChange}
          className={styles.font_select}
        >
          {FONT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.cv_wrapper} ref={targetRef}>
        <CV fontFamily={font} />
      </div>
      <button className={styles.perview_import} onClick={toPDF}>
        Импорт в pdf <DownloadIcon />
      </button>
    </div>
  );
}
