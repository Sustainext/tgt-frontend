'use client';

import { useState,forwardRef, useImperativeHandle } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableSectionItem from './SortableSectionItem';



const SectionSelector=forwardRef(({ onNext,sections,setSections }, ref) => {
//   const [sections, setSections] = useState(
//     defaultSections.map((s, index) => ({
//       ...s,
//       order: index + 1,
//       enabled: s.mandatory,
//     }))
//   );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);

      const newOrder = arrayMove(sections, oldIndex, newIndex).map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));

      setSections(newOrder);
    }
  };

  const toggleSection = (id) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };
  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const handleSubmit = () => {
    const selectedSections = sections.map((s) => ({
      id: s.id,
      title: s.title,
      enabled: s.enabled,
      order: s.order,
      mandatory: s.mandatory,
    }));
    onNext(selectedSections);
  };

  return (
    <div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="border border-gray-300 rounded-md">
            {sections?.map((section, index) => (
              <SortableSectionItem
                key={section.id}
                id={section.id}
                title={section.title}
                order={index + 1}
                enabled={section.enabled}
                mandatory={section.mandatory}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* <div className="mt-8 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Confirm Modules & Proceed →
        </button>
      </div> */}
    </div>
  );
})

export default SectionSelector;
