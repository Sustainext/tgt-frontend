'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// import { GripVerticalIcon } from '@radix-ui/react-icons';
import { FaGripVertical } from "react-icons/fa";

export default function SortableSectionItem({
  id,
  title,
  order,
  enabled,
  mandatory,
  onToggle,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white shadow-sm border rounded-md border-gray-100 flex items-center justify-between px-4 py-5"
    >
      <div className="flex items-center gap-4">
        <div {...attributes} {...listeners} className="cursor-grab text-gray-400">
          <FaGripVertical />
        </div>
        <input
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
            className="w-4 h-4 green-checkbox cursor-pointer"
          />
        <p className="text-sm font-medium">
          {order}. {title}
        </p>
      </div>

      
    </div>
  );
}
