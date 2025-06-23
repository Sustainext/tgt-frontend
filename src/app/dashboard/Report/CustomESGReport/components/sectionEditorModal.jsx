"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { IoMdSwap } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import WalkthroughModal from "./walkThroughModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  selectSections,
  selectSubsections,
  selectSelectedSubsections,
  setSections,
  setSectionEditorOpen,
  updateSelectedSubsections,


  selectCurrentReportPage,
  setCurrentReportPage,
  initializeReportNavigation,
  selectCurrentDisplaySectionForReportType,
  updateReportBuilderData
} from "../../../../../lib/redux/features/reportBuilderSlice";

// Draggable Item
function DraggableItem({ id, children }) {
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
    <div ref={setNodeRef} style={style} className={`relative ${isDragging ? "z-10" : ""}`}>
      <div
        className="absolute left-0 mt-[22px] -translate-y-1/2 cursor-grab"
        {...attributes}
        {...listeners}
      >
        <RxDragHandleDots2 className="text-gray-400" />
      </div>
      {children}
    </div>
  );
}

// Drop Zone
function DropZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return <div ref={setNodeRef}>{children}</div>;
}

const SectionEditorModal = () => {
  const dispatch = useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));

   const sections = useSelector(selectSections);

   console.log(sections,"see the updated one bro")

  const reportid =
  typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const currentPageIndex = useSelector(selectCurrentReportPage);
const currentDisplaySection = useSelector(selectCurrentDisplaySectionForReportType("Custom ESG Report"));


  const allSections = useSelector(selectSections);
  const subsections = useSelector(selectSubsections);
  const selectedSubsections = useSelector(selectSelectedSubsections);

  const [localSections, setLocalSections] = useState([...allSections]);
  const [localSelectedSubsections, setLocalSelectedSubsections] = useState({ ...selectedSubsections });
  const [expandedSections, setExpandedSections] = useState({});
  const [activeItem, setActiveItem] = useState(null);
  const [show, setShow] = useState(false);

  const toggleDropdown = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // const toggleSubsection = (sectionId, subsectionId) => {
  //   const current = localSelectedSubsections[sectionId] || [];
  //   const updated = current.includes(subsectionId)
  //     ? current.filter((id) => id !== subsectionId)
  //     : [...current, subsectionId];

  //   setLocalSelectedSubsections((prev) => ({
  //     ...prev,
  //     [sectionId]: updated,
  //   }));
  // };


  // const toggleSubsection = (sectionId, subsectionId) => {
  //   const sectionSubs = subsections[sectionId] || [];
  //   const subsection = sectionSubs.find(s => s.id === subsectionId);
  //   const current = localSelectedSubsections[sectionId] || [];
  
  //   let updated = [];
  //   if (current.includes(subsectionId)) {
  //     // Uncheck - also remove children if any
  //     updated = current.filter(id => id !== subsectionId && !subsection?.children?.some(child => child.id === id));
  //   } else {
  //     // Check - just add
  //     updated = [...current, subsectionId];
  //   }
  
  //   setLocalSelectedSubsections((prev) => ({
  //     ...prev,
  //     [sectionId]: updated,
  //   }));
  // };

  const toggleSubsection = (sectionId, subsectionId) => {
    const sectionSubs = subsections[sectionId] || [];
    const subsection = sectionSubs.find(s => s.id === subsectionId);
    const current = localSelectedSubsections[sectionId] || [];
  
    let updated = [...current];
  
    const isCurrentlyChecked = current.includes(subsectionId);
  
    if (isCurrentlyChecked) {
      // Uncheck parent and all its children
      updated = updated.filter(id => id !== subsectionId);
  
      if (subsection?.children?.length) {
        const childIds = subsection.children.map(child => child.id);
        updated = updated.filter(id => !childIds.includes(id));
      }
    } else {
      // Check parent and all its children
      updated.push(subsectionId);
      if (subsection?.children?.length) {
        const childIds = subsection.children.map(child => child.id);
        updated = Array.from(new Set([...updated, ...childIds])); // avoid duplicates
      }
    }
  
    setLocalSelectedSubsections(prev => ({
      ...prev,
      [sectionId]: updated,
    }));
  };
  
  
  const toggleNestedSubsection = (sectionId, parentId, childId) => {
    toggleSubsection(sectionId, childId);
  };

  // const renderSubsection = (sectionId, subsection, level = 0, parentId = null) => {
  //   const selected = localSelectedSubsections[sectionId] || [];
  //   const isChecked = selected.includes(subsection.id);

  //   return (
  //     <div key={subsection.id} className={`ml-${level * 4}`}>
  //       <label className="flex items-center gap-2 text-sm mb-1">
  //         <input
  //           type="checkbox"
  //           checked={isChecked}
  //           onChange={() =>
  //             parentId
  //               ? toggleNestedSubsection(sectionId, parentId, subsection.id)
  //               : toggleSubsection(sectionId, subsection.id)
  //           }
  //           className="w-3 h-3 green-checkbox-small"
  //         />
  //         <span>{subsection.label}</span>
  //       </label>
  //       {subsection.children &&
  //         subsection.children.map((child) =>
  //           renderSubsection(sectionId, child, level + 1, subsection.id)
  //         )}
  //     </div>
  //   );
  // };

  
  const renderSubsection = (sectionId, subsection, level = 0, parentId = null) => {
    const selected = localSelectedSubsections[sectionId] || [];
    const isChecked = selected.includes(subsection.id);
    const isParentChecked = !parentId || selected.includes(parentId);
  
    return (
      <div key={subsection.id} className={`ml-${level * 4}`}>
        <label className="flex items-center gap-2 text-sm mb-1 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() =>
              parentId
                ? toggleNestedSubsection(sectionId, parentId, subsection.id)
                : toggleSubsection(sectionId, subsection.id)
            }
            className="w-3 h-3 green-checkbox-small"
            disabled={parentId && !isParentChecked}
          />
          <span className={parentId && !isParentChecked ? "text-gray-400" : ""}>{subsection.label}</span>
        </label>
        {subsection.children &&
          subsection.children.map((child) =>
            renderSubsection(sectionId, child, level + 1, subsection.id)
          )}
      </div>
    );
  };
  
  const handleDragStart = (event) => setActiveItem(event.active.id);

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   setActiveItem(null);
  //   if (!over || active.id === over.id) return;

  //   const sourceSection = localSections.find((s) => s.id === active.id);
  //   const targetSection = localSections.find((s) => s.id === over.id);

  //   const updated = [...localSections];

  //   if (targetSection && sourceSection.enabled === targetSection.enabled) {
  //     const sourceList = updated.filter((s) => s.enabled === sourceSection.enabled);
  //     const oldIndex = sourceList.findIndex((s) => s.id === active.id);
  //     const newIndex = sourceList.findIndex((s) => s.id === over.id);
  //     const reordered = [...sourceList];
  //     const [moved] = reordered.splice(oldIndex, 1);
  //     reordered.splice(newIndex, 0, moved);

  //     let idx = 0;
  //     setLocalSections(
  //       updated.map((s) =>
  //         s.enabled !== sourceSection.enabled
  //           ? s
  //           : { ...reordered[idx++], order: s.enabled ? idx : null }
  //       )
  //     );
  //   } else {
  //     setLocalSections(
  //       updated.map((s) =>
  //         s.id === active.id ? { ...s, enabled: targetSection?.enabled ?? false } : s
  //       )
  //     );
  //   }
  // };

  // const handleUpdate = () => {
  //   dispatch(setSections(localSections));
  //   Object.entries(localSelectedSubsections).forEach(([sectionId, ids]) => {
  //     dispatch(updateSelectedSubsections({ sectionId, subsectionIds: ids }));
  //   });
  //   dispatch(setSectionEditorOpen(false));
  // };

  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over || active.id === over.id) return;
  
    const updated = [...localSections];
    const sourceIndex = updated.findIndex((s) => s.id === active.id);
    const targetIndex = updated.findIndex((s) => s.id === over.id);
  
    const source = updated[sourceIndex];
    const target = updated[targetIndex];
  
    // If moving between enabled/disabled
    if (source?.enabled !== target?.enabled) {
      updated[sourceIndex] = { ...source, enabled: target?.enabled };
    }
  
    // Reorder only within same list
    const enabledList = updated.filter((s) => s?.enabled);
    const disabledList = updated.filter((s) => !s?.enabled);
  
    const reorder = (list, draggedId, targetId) => {
      const oldIndex = list.findIndex((s) => s.id === draggedId);
      const newIndex = list.findIndex((s) => s.id === targetId);
      const reordered = [...list];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);
      return reordered;
    };
  
    let newEnabledList = enabledList;
    if (source.enabled && target?.enabled) {
      newEnabledList = reorder(enabledList, active.id, over.id);
    }
  
    // Re-assign order
    const finalList = [
      ...newEnabledList.map((s, i) => ({ ...s, order: i + 1, enabled: true })),
      ...disabledList.map((s) => ({ ...s, order: null, enabled: false }))
    ];
  
    setLocalSections(finalList);
    // If section was disabled, remove its subsections
const disabledIds = finalList.filter(s => !s.enabled).map(s => s.id);
const cleanedSubsections = { ...localSelectedSubsections };
disabledIds.forEach(id => {
  delete cleanedSubsections[id];
});
setLocalSelectedSubsections(cleanedSubsections);

  };
  
  const handleUpdate = () => {
    const enabledSections = localSections.filter(s => s.enabled);
    const errors = enabledSections.filter(s => !(localSelectedSubsections[s.id]?.length > 0)).map(s => s.title);
    if (errors.length > 0) {
      toast.warn(`Please select at least one subsection for:\n ${errors.join("\n,")}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    dispatch(setSections(localSections));
    Object.entries(localSelectedSubsections).forEach(([sectionId, ids]) => {
    dispatch(updateSelectedSubsections({ sectionId, subsectionIds: ids }));
    });
  
    // Sync report page if current section was removed or moved
    const currentId = currentDisplaySection?.id;
    const newEnabledOrder = localSections.filter(s => s.enabled).sort((a, b) => a.order - b.order);
    const newIndex = newEnabledOrder.findIndex(s => s.id === currentId);
    dispatch(setCurrentReportPage(newIndex >= 0 ? newIndex : 0));
     dispatch(updateReportBuilderData(reportid))
      .unwrap()
      .then(() => {
        toast.success('Report updated successfully!');
        dispatch(setSectionEditorOpen(false));
      })
      .catch(err => {
        toast.error(`Failed to update report: ${err}`);
      });
  };
  
  

  const handleClose = () => dispatch(setSectionEditorOpen(false));

  const renderDragOverlay = () => {
    const section = localSections.find((s) => s.id === activeItem);
    return section ? (
      <div className="border rounded p-3 bg-white shadow-lg w-full opacity-90">
        <p className="font-medium text-sm">{section.title}</p>
      </div>
    ) : null;
  };

  const leftSections = localSections.filter((s) => s.enabled);
  const rightSections = localSections.filter((s) => !s.enabled);

  const renderSectionItem = (section) => {
    const expanded = expandedSections[section.id];
    const items = subsections[section.id] || [];
    const selected = localSelectedSubsections[section.id] || [];

    return (
      <DraggableItem key={section.id} id={section.id}>
        <div className="rounded p-3 mb-2 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center cursor-pointer"  onClick={() => toggleDropdown(section.id)}>
            <p className="text-[#344054] text-sm pl-4">
              {section.title}
            </p>
            {items.length > 0 && (
              <button  className="text-gray-500">
                {expanded ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
              </button>
            )}
          </div>
          {expanded && items.length > 0 && (
            <div className="pl-4 mt-3">
              <p className="text-xs text-gray-500 mb-2 font-medium">Subsections:</p>
              {items.map((sub) => renderSubsection(section.id, sub))}
            </div>
          )}
        </div>
      </DraggableItem>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mt-16">
      <div className="bg-white rounded-lg p-6 w-[95%] max-w-[900px] shadow-lg max-h-[98vh] overflow-hidden">
        <div className="flex gap-2 mb-4">
          <h2 className="text-lg font-bold text-[#101828]">Edit Section Selection</h2>
          <AiOutlineQuestionCircle
            onClick={() => setShow(true)}
            className="w-5 h-5 mt-[3px] cursor-pointer text-gray-500"
          />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Drag the sections between left and right to add or remove from the report. Check and uncheck the
          required subsections to include in the report.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4">
            {/* Left Panel */}
            <div className="w-full">
              <h4 className="text-sm text-[#556A7D] mb-1 font-medium">Sections Added</h4>
              <DropZone id="enabled">
                <SortableContext
                  items={leftSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="border border-gray-300 rounded-md p-4 max-h-[60vh] overflow-auto table-scrollbar">
                    {leftSections.map(renderSectionItem)}
                  </div>
                </SortableContext>
              </DropZone>
            </div>

            {/* Swap icon */}
            <div className="flex items-center justify-center">
              <IoMdSwap className="w-5 h-5 text-gray-500" />
            </div>

            {/* Right Panel */}
            <div className="w-full">
              <h4 className="text-sm text-[#556A7D] mb-1 font-medium">Available Sections</h4>
              <DropZone id="disabled">
                <SortableContext
                  items={rightSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="border border-dashed border-gray-400 rounded-md p-4 max-h-[60vh] overflow-auto table-scrollbar">
                    {rightSections.map(renderSectionItem)}
                  </div>
                </SortableContext>
              </DropZone>
            </div>
          </div>

          <DragOverlay>{renderDragOverlay()}</DragOverlay>
        </DndContext>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-[#667085] text-sm border rounded mr-3 hover:bg-gray-100"
          >
            Cancel Changes
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-[#007EEF] text-white rounded hover:bg-blue-600 text-sm"
          >
            Update
          </button>
        </div>
      </div>

      {show && <WalkthroughModal setShow={setShow} />}
    </div>
  );
};

export default SectionEditorModal;
