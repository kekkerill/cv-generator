import { SECTION_INFO } from "../../constants";

export function getInitialFields() {
  const fields = {};
  SECTION_INFO.forEach((section) => {
    fields[section.id] = {};
    Object.keys(section.values).forEach((key) => {
      fields[section.id][key] = "";
    });
  });

  return fields;
}
