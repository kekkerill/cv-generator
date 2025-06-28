import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getInitialFields } from "./utils/initFields";
import { SECTION_INFO, MOCK_SECTION_VALUES } from "../constants";

const initialOrder = SECTION_INFO.map((section) => section.id);

const initialEnable = {};
SECTION_INFO.forEach((s) => {
  initialEnable[s.id] = false;
});
initialEnable.personalInfo = true;
initialEnable.contactInfo = true;

export const useSectionStore = create(
  persist(
    (set, get) => ({
      sectionEnable: { ...initialEnable },
      fields: getInitialFields(),
      sectionOrder: initialOrder,

      deleteSection: (id) =>
        set((state) => {
          if (!state.sectionEnable[id] || !state.sectionOrder.includes(id)) {
            return state;
          }
          const newFields = { ...state.fields };
          delete newFields[id];
          const newOrder = state.sectionOrder.filter((sid) => sid !== id);

          return {
            sectionEnable: {
              ...state.sectionEnable,
              [id]: false
            },
            sectionOrder: newOrder,
            fields: newFields
          };
        }),

      enableSection: (id) =>
        set((state) => {
          const alreadyExists = state.sectionOrder.includes(id);
          const initialFields = getInitialFields();
          const newOrder = alreadyExists
            ? state.sectionOrder
            : [...state.sectionOrder, id];

          return {
            sectionEnable: {
              ...state.sectionEnable,
              [id]: true
            },
            sectionOrder: newOrder,
            fields: {
              ...state.fields,
              [id]: state.fields[id] || initialFields[id] || {}
            }
          };
        }),

      setFieldValue: (sectionId, fieldKey, value) =>
        set((state) => ({
          fields: {
            ...state.fields,
            [sectionId]: {
              ...state.fields[sectionId],
              [fieldKey]: value
            }
          }
        })),

      resetFields: () =>
        set(() => ({
          fields: getInitialFields()
        })),

      moveSection: (fromIndex, toIndex) =>
        set((state) => {
          const visibleIds = state.sectionOrder.filter(
            (id) => state.sectionEnable[id]
          );
          const idToMove = visibleIds[fromIndex];
          if (!idToMove) return {};
          const newVisible = [...visibleIds];
          newVisible.splice(fromIndex, 1);
          newVisible.splice(toIndex, 0, idToMove);

          const hiddenIds = state.sectionOrder.filter(
            (id) => !state.sectionEnable[id]
          );

          return {
            sectionOrder: [...newVisible, ...hiddenIds]
          };
        }),

      setSectionOrder: (order) =>
        set(() => ({
          sectionOrder: order
        })),

      resetStore: () => {
        set({
          sectionEnable: { ...initialEnable },
          fields: getInitialFields(),
          sectionOrder: initialOrder
        });
        localStorage.removeItem("editor-section-store");
      },

      fillWithMockData: () => {
        const { sectionEnable, fields } = get();
        const newFields = { ...fields };
        Object.entries(sectionEnable).forEach(([sectionId, enabled]) => {
          if (enabled && MOCK_SECTION_VALUES[sectionId]) {
            newFields[sectionId] = { ...MOCK_SECTION_VALUES[sectionId] };
          }
        });
        set({ fields: newFields });
      }
    }),
    {
      name: "editor-section-store"
    }
  )
);
