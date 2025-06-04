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
  useDroppable,
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
  updateSelectedSubsections,
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

// Drop zone component for empty containers
function DropZone({ id, children, isEmpty }) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`min-h-[200px] w-full ${
        isEmpty && isOver 
          ? '' 
          : isEmpty 
          ? ''
          : ''
      }`}
    >
      {children}
      {/* {isEmpty && (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm">
          {isOver ? 'Drop section here' : 'Drag sections here'}
        </div>
      )} */}
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
  const [localSelectedSubsections, setLocalSelectedSubsections] = useState({...selectedSubsections});
  const [expandedSections, setExpandedSections] = useState({});
  const [activeItem, setActiveItem] = useState(null);

  const toggleDropdown = (id) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper function to toggle subsection
  const toggleSubsection = (sectionId, subsectionId) => {
    const currentSelections = localSelectedSubsections[sectionId] || [];
    const updatedSelections = currentSelections.includes(subsectionId)
      ? currentSelections.filter(id => id !== subsectionId)
      : [...currentSelections, subsectionId];
    
    setLocalSelectedSubsections(prev => ({
      ...prev,
      [sectionId]: updatedSelections
    }));
  };

  // Helper function to toggle nested subsection
  const toggleNestedSubsection = (sectionId, parentSubsectionId, childSubsectionId) => {
    const currentSelections = localSelectedSubsections[sectionId] || [];
    const updatedSelections = currentSelections.includes(childSubsectionId)
      ? currentSelections.filter(id => id !== childSubsectionId)
      : [...currentSelections, childSubsectionId];
    
    setLocalSelectedSubsections(prev => ({
      ...prev,
      [sectionId]: updatedSelections
    }));
  };

  // Recursive function to render subsections with nesting support
  const renderSubsection = (sectionId, subsection, level = 0, parentId = null) => {
    const currentSelections = localSelectedSubsections[sectionId] || [];
    const isChecked = currentSelections.includes(subsection.id);
    
    return (
      <div key={subsection.id} className={`${level > 0 ? `ml-${level * 4}` : ''}`}>
        <label className="flex gap-2 items-center text-xs mb-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              if (parentId) {
                toggleNestedSubsection(sectionId, parentId, subsection.id);
              } else {
                toggleSubsection(sectionId, subsection.id);
              }
            }}
            className="w-3 h-3 accent-blue-600"
          />
          <span className={subsection.children ? 'font-medium' : ''}>{subsection.label}</span>
        </label>
        
        {/* Render children if they exist */}
        {subsection.children && subsection.children.length > 0 && (
          <div className="ml-4">
            {subsection.children.map((child) => 
              renderSubsection(sectionId, child, level + 1, subsection.id)
            )}
          </div>
        )}
      </div>
    );
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

    // Handle dropping on containers (drop zones)
    if (over.id === 'enabled-sections' || over.id === 'disabled-sections') {
      const targetEnabled = over.id === 'enabled-sections';
      setLocalSections((prev) =>
        prev.map((s) => {
          if (s.id === active.id) {
            return { ...s, enabled: targetEnabled };
          }
          return s;
        })
      );
      return;
    }

    // Handle dropping on other sections (reordering)
    const activeSection = localSections.find((s) => s.id === active.id);
    const overSection = localSections.find((s) => s.id === over.id);

    if (!activeSection || !overSection) return;

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
                className="text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? (
                  <MdKeyboardArrowDown className="w-5 h-5" />
                ) : (
                  <MdKeyboardArrowRight className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {isExpanded && sectionSubsections.length > 0 && (
            <div className="pl-4 mt-3 border-t pt-3">
              <p className="text-xs text-gray-500 mb-2 font-medium">Subsections:</p>
              {sectionSubsections.map((subsection) => 
                renderSubsection(section.id, subsection, 0)
              )}
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
      <div className="border rounded p-3 bg-white shadow-lg w-full opacity-90">
        <p className="font-medium text-sm">{section?.title}</p>
      </div>
    );
  };

  const handleUpdate = () => {
    // Update both sections and selected subsections in Redux
    dispatch(setSections(localSections));
    
    // Update selected subsections for each section
    Object.keys(localSelectedSubsections).forEach(sectionId => {
      dispatch(updateSelectedSubsections({ 
        sectionId, 
        subsectionIds: localSelectedSubsections[sectionId] 
      }));
    });
    
    onClose();
  };

  const handleClose = () => {
    dispatch(setSectionEditorOpen(false));
  };

  const handleSelectAllSubsections = (sectionId) => {
    const sectionSubsections = subsections[sectionId] || [];
    const allSubsectionIds = [];
    
    // Collect all subsection IDs including nested ones
    const collectIds = (subsections) => {
      subsections.forEach(sub => {
        allSubsectionIds.push(sub.id);
        if (sub.children) {
          collectIds(sub.children);
        }
      });
    };
    
    collectIds(sectionSubsections);
    
    setLocalSelectedSubsections(prev => ({
      ...prev,
      [sectionId]: allSubsectionIds
    }));
  };

  const handleDeselectAllSubsections = (sectionId) => {
    setLocalSelectedSubsections(prev => ({
      ...prev,
      [sectionId]: []
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[95%] max-w-[1200px] shadow-lg max-h-[95vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Section Selection</h2>
          <button onClick={handleClose} className="text-xl text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Drag sections between left and right to add or remove from the report. 
          Expand sections to check/uncheck specific subsections. Use "Select All" / "Deselect All" for quick subsection management.
        </p>

        <div className="flex gap-4 h-[65vh]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            {/* Left Panel - Enabled Sections */}
            <div className="w-1/2 border rounded-md p-4 overflow-auto table-scrollbar">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold">Sections Added ({leftSections.length})</h4>
              </div>
              
              <DropZone id="enabled-sections" isEmpty={leftSections.length === 0}>
                <SortableContext
                  items={leftSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {leftSections.map((section) => (
                    <div key={section.id}>
                      {renderSectionItem(section, true)}
                      {/* Quick actions for subsections when expanded */}
                      {expandedSections[section.id] && subsections[section.id] && subsections[section.id].length > 0 && (
                        <div className="mb-2 ml-4 flex gap-2">
                          <button
                            onClick={() => handleSelectAllSubsections(section.id)}
                            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                          >
                            Select All
                          </button>
                          <button
                            onClick={() => handleDeselectAllSubsections(section.id)}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                          >
                            Deselect All
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </SortableContext>
              </DropZone>
            </div>

            {/* Right Panel - Available Sections */}
            <div className="w-1/2 border rounded-md p-4 overflow-auto table-scrollbar">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold">Available Sections ({rightSections.length})</h4>
              </div>
              
              <DropZone id="disabled-sections" isEmpty={rightSections.length === 0}>
                <SortableContext
                  items={rightSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {rightSections.map((section) =>
                    renderSectionItem(section, false)
                  )}
                </SortableContext>
              </DropZone>
            </div>

            <DragOverlay>{renderDragOverlay()}</DragOverlay>
          </DndContext>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            {Object.keys(localSelectedSubsections).reduce((total, sectionId) => 
              total + (localSelectedSubsections[sectionId]?.length || 0), 0
            )} subsections selected across {leftSections.length} sections
          </div>
          <div className="flex gap-3">
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
              Update Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionEditorModal;