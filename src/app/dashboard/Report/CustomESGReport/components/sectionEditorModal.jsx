"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";

// Redux selectors and actions
import {
  selectSections,
  selectEnabledSections,
  selectDisabledSections,
  selectSubsections,
  selectSelectedSubsections,
  setSections,
  moveSectionBetweenContainers,
  reorderSections,
  setSectionEditorOpen,
} from '../../../../../lib/redux/features/reportBuilderSlice';

function DraggableItem({ id, children, isEnabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? "z-10" : ""}`}
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 cursor-move" {...attributes} {...listeners}>
        <RxDragHandleDots2 className="text-gray-400" />
      </div>
      {children}
    </div>
  );
}

const SectionEditorModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));
  
  // Redux state
  const allSections = useSelector(selectSections);
  const subsections = useSelector(selectSubsections);
  const selectedSubsections = useSelector(selectSelectedSubsections);
  
  // Local state
  const [localSections, setLocalSections] = useState([...allSections]);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeItem, setActiveItem] = useState(null);

  const toggleDropdown = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveItem(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;
    if (active.id === over.id) return;

    const activeSection = localSections.find((s) => s.id === active.id);
    const overSection = localSections.find((s) => s.id === over.id);

    // If dropping in the same container, just reorder
    if (activeSection.enabled === overSection.enabled) {
      const oldIndex = localSections.findIndex((s) => s.id === active.id);
      const newIndex = localSections.findIndex((s) => s.id === over.id);
      
      const newSections = [...localSections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);

      setLocalSections(
        newSections.map((s, i) => ({
          ...s,
          order: s.enabled ? i + 1 : null,
        }))
      );
    } else {
      // Move between containers
      setLocalSections((prev) =>
        prev.map((s) => {
          if (s.id === active.id) {
            return { ...s, enabled: overSection.enabled };
          }
          return s;
        })
      );
    }
  };

  const handleDragCancel = () => {
    setActiveItem(null);
  };

  const leftSections = localSections.filter((s) => s.enabled);
  const rightSections = localSections.filter((s) => !s.enabled);

  const renderSectionItem = (section, isEnabled) => {
    const isExpanded = expandedSections[section.id];
    const sectionSubsections = subsections[section.id] || [];
    const sectionSelectedSubsections = selectedSubsections[section.id] || [];
    const isActive = activeItem === section.id;

    return (
      <DraggableItem key={section.id} id={section.id} isEnabled={isEnabled}>
        <div className={`border rounded p-3 mb-2 bg-white shadow-sm ${isActive ? "ring-2 ring-blue-500" : ""}`}>
          <div className="flex justify-between items-center">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => toggleDropdown(section.id)}
            >
              <p className="font-medium text-sm pl-4">
                {section.title}
              </p>
            </div>
            {sectionSubsections.length > 0 && (
              <button
                onClick={() => toggleDropdown(section.id)}
                className="text-gray-500"
              >
                {isExpanded ? (
                  <MdKeyboardArrowDown />
                ) : (
                  <MdKeyboardArrowRight />
                )}
              </button>
            )}
          </div>

          {isExpanded && sectionSubsections.length > 0 && (
            <div className="pl-4 mt-2">
              {sectionSubsections.map((subsection) => {
                const isChecked = sectionSelectedSubsections.includes(subsection.id);
                return (
                  <label
                    key={subsection.id}
                    className="flex gap-2 items-center text-xs mb-1"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      disabled
                    />
                    {subsection.label}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </DraggableItem>
    );
  };

  const renderDragOverlay = () => {
    if (!activeItem) return null;
    
    const section = localSections.find((s) => s.id === activeItem);
    return (
      <div className="border rounded p-3 bg-white shadow-lg w-full">
        <p className="font-medium text-sm">{section?.title}</p>
      </div>
    );
  };

  const handleUpdate = () => {
    dispatch(setSections(localSections));
    onClose();
  };

  const handleClose = () => {
    dispatch(setSectionEditorOpen(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[95%] max-w-[1200px] shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Section Selection</h2>
          <button onClick={handleClose} className="text-xl text-gray-500">
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Drag the sections between left and right to add or remove from the report. Check and uncheck the required subsections to add in report.
        </p>

        <div className="flex gap-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            {/* Left Panel */}
            <div className="w-1/2 border rounded-md p-4 max-h-[65vh] overflow-auto table-scrollbar">
              <h4 className="text-sm font-semibold mb-3">Sections Added</h4>
              <SortableContext
                items={leftSections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {leftSections.map((section) =>
                  renderSectionItem(section, true)
                )}
              </SortableContext>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 border rounded-md p-4 max-h-[65vh] overflow-auto table-scrollbar">
              <h4 className="text-sm font-semibold mb-3">Available Sections</h4>
              <SortableContext
                items={rightSections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {rightSections.map((section) =>
                  renderSectionItem(section, false)
                )}
              </SortableContext>
            </div>

            <DragOverlay>{renderDragOverlay()}</DragOverlay>
          </DndContext>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded border mr-3 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionEditorModal;