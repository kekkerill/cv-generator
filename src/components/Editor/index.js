import styles from "./Editor.module.scss";
import { ReactComponent as PlusIcon } from "../assets/plus.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { ReactComponent as AiIcon } from "../assets/ai.svg";
import { SECTION_INFO } from "../constants";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useState, useCallback, useMemo } from "react";
import { useSectionStore } from "../store/store";
import Popup from "../Popup";
import SortableSection from "../Section/SrotableSection";

export default function Editor() {
  // Zustand state
  const sectionEnable = useSectionStore((state) => state.sectionEnable);
  const enableSection = useSectionStore((state) => state.enableSection);
  const sectionOrder = useSectionStore((state) => state.sectionOrder);
  const moveSection = useSectionStore((state) => state.moveSection);
  const resetStore = useSectionStore((state) => state.resetStore);
  const fillWithMockData = useSectionStore((state) => state.fillWithMockData);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }
    })
  );

  const sectionInfoMap = useMemo(
    () => Object.fromEntries(SECTION_INFO.map((s) => [s.id, s])),
    []
  );

  const visibleSectionIds = useMemo(
    () => sectionOrder.filter((id) => sectionEnable[id]),
    [sectionOrder, sectionEnable]
  );

  const hiddenSections = useMemo(
    () => SECTION_INFO.filter((section) => !sectionEnable[section.id]),
    [sectionEnable]
  );

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (active && over && active.id !== over.id) {
        const oldIndex = visibleSectionIds.indexOf(active.id);
        const newIndex = visibleSectionIds.indexOf(over.id);
        moveSection(oldIndex, newIndex);
      }
    },
    [visibleSectionIds, moveSection]
  );

  const handleAddSectionClick = useCallback(() => setIsPopupOpen(true), []);
  const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);

  const handleSectionSelect = useCallback(
    (id) => {
      enableSection(id);
      setIsPopupOpen(false);
    },
    [enableSection]
  );

  return (
    <div className={styles.editor_wrapper}>
      <header>
        <Logo />
      </header>
      <div className={styles.editor_main}>
        <div className={styles.editor_button_wrapper}>
          <button onClick={fillWithMockData} className={styles.editor_button}>
            Заполнить с помощью ИИ <AiIcon width={24} height={24} />
          </button>
          <button
            className={styles.editor_button}
            onClick={handleAddSectionClick}
          >
            <PlusIcon /> Добавить секцию
          </button>
          <button className={styles.editor_button} onClick={resetStore}>
            Очистить всё
          </button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext
            items={visibleSectionIds}
            strategy={verticalListSortingStrategy}
          >
            <div className={styles.editor_sections}>
              {visibleSectionIds.map((id) => {
                const section = sectionInfoMap[id];
                if (!section) return null;

                return (
                  <SortableSection
                    key={id}
                    id={id}
                    title={section.title}
                    values={section.values}
                    deletable={section.deletable}
                    isEnabled={sectionEnable[id]}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
        {isPopupOpen && (
          <Popup
            sections={hiddenSections}
            onSelect={handleSectionSelect}
            onClose={handlePopupClose}
          />
        )}
      </div>
    </div>
  );
}
