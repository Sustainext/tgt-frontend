'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

// Redux selectors and actions
import {
  selectSections,
  toggleSectionEnabled,
  reorderSections,
} from '../../../../../lib/redux/features/reportBuilderSlice';

import SortableSectionItem from './SortableSectionItem';

const SectionSelector = forwardRef(({ onNext }, ref) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSections);

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

      dispatch(reorderSections({ oldIndex, newIndex }));
    }
  };

  const handleToggleSection = (sectionId) => {
    dispatch(toggleSectionEnabled(sectionId));
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  const handleSubmit = () => {
    const enabledSections = sections.filter(s => s.enabled);
    if (enabledSections.length > 0) {
      onNext();
    } else {
      alert('Please select at least one section to proceed.');
    }
  };

  return (
    <div>
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={sections.map((s) => s.id)} 
          strategy={verticalListSortingStrategy}
        >
          <div className="border border-gray-300 rounded-md">
            {sections?.map((section, index) => (
              <SortableSectionItem
                key={section.id}
                id={section.id}
                title={section.title}
                order={index + 1}
                enabled={section.enabled}
                mandatory={section.mandatory}
                onToggle={() => handleToggleSection(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
});

SectionSelector.displayName = 'SectionSelector';

export default SectionSelector;