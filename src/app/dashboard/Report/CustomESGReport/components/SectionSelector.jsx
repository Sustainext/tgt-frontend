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
  updateEnabledSectionOrder
} from '../../../../../lib/redux/features/reportBuilderSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SortableSectionItem from './SortableSectionItem';

const SectionSelector = forwardRef(({ onNext }, ref) => {
  const dispatch = useDispatch();
  const sections = useSelector(selectSections);
  const orderedSections = [...sections].sort((a, b) => a.order - b.order);


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
    dispatch(updateEnabledSectionOrder());
    const enabledSections = sections.filter(s => s.enabled);
    if (enabledSections.length > 0) {
      onNext();
    } else {
      toast.warn('Please select at least one section to proceed.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
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
            {orderedSections?.map((section, index) => (
              <SortableSectionItem
                key={section.id}
                id={section.id}
                title={section.title}
                order={section.order}
                enabled={section.enabled}
                mandatory={section.mandatory}
                subLabel={section.subLabel}
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