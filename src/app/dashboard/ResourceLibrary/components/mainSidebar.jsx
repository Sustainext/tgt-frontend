"use client";
import React, { useState } from "react";

// Recursively builds ancestor vertical lines just like Windows Explorer
function AncestorLines({ parentIsLast, level }) {
  if (!parentIsLast || parentIsLast.length === 0) return null;
  return (
    <>
      {parentIsLast.map((isLast, i) =>
        !isLast ? (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${i * 18 + 9}px`,
              top: 0,
              bottom: 0,
              width: '1px',
              borderLeft: "1px solid #e5e7eb", // gray-200
              zIndex: 0,
            }}
          />
        ) : null
      )}
    </>
  );
}

function SidebarItem({
  item,
  level = 0,
  activeSlug,
  onSelect,
  collapsedMap,
  toggleCollapse,
  parentIsLast = [],
  isLast = false,
}) {
  const isActive = !!item.slug && activeSlug === item.slug;
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isCollapsed = collapsedMap[item.title] ?? false;

  // Positioning for lines/elbow
  const lineContainerStyle = { position: "absolute", left: 0, top: 0, bottom: 0, width: `${level*18 + 14}px`, pointerEvents: "none" };

  return (
    <div className="relative py-0.5">
      {/* Draw ancestor vertical lines behind the content */}
      <span style={lineContainerStyle} aria-hidden>
        <AncestorLines parentIsLast={parentIsLast} level={level} />
      </span>
      
      <div className="flex items-center" style={{ paddingLeft: level * 18 + 9 }}>
        {/* Left "elbow" for child node */}
        {level > 0 && (
          <span className="tree-elbow" aria-hidden />
        )}
        {/* Disclosure chevron for groups */}
        {hasChildren ? (
          <span
            className="mr-1 text-gray-300 cursor-pointer select-none"
            onClick={() => toggleCollapse(item.title)}
          >
            {isCollapsed ? (
              // Right caret
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M7 5l5 5-5 5" stroke="#bdbdbd" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>
            ) : (
              // Down caret
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="#bdbdbd" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/></svg>
            )}
          </span>
        ) : (
          <span className="mr-[1.2rem]" /> // Indent so leaves line up with group labels
        )}

        <span
          className={`cursor-pointer select-none pr-2 rounded mb-1 
            ${isActive ? "text-[#007EEF]" : "text-gray-700"}
            ${!hasChildren && "hover:bg-blue-50"}
            `
          }
          onClick={() => item.slug && onSelect(item.slug)}
        >
          {item.title}
        </span>
      </div>
      {/* Child nodes */}
      {hasChildren && !isCollapsed && (
        <div>
          {item.children.map((child, idx) => (
            <SidebarItem
              key={child.slug || child.title}
              item={child}
              level={level + 1}
              activeSlug={activeSlug}
              onSelect={onSelect}
              collapsedMap={collapsedMap}
              toggleCollapse={toggleCollapse}
              parentIsLast={[...parentIsLast, isLast]}
              isLast={idx === item.children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ navData, activeSlug, onSelect }) {
  const [collapsed, setCollapsed] = useState({});

  function toggleCollapse(title) {
    setCollapsed((cur) => ({ ...cur, [title]: !cur[title] }));
  }

  return (
    <aside className="bg-white rounded-xl shadow-md p-4 min-h-screen min-w-[250px] max-w-[280px] border border-gray-100 text-[14px] select-none">
      {navData.map((item, idx) => (
        <SidebarItem
          key={item.slug || item.title}
          item={item}
          activeSlug={activeSlug}
          onSelect={onSelect}
          collapsedMap={collapsed}
          toggleCollapse={toggleCollapse}
          parentIsLast={[]}
          level={0}
          isLast={idx === navData.length - 1}
        />
      ))}
    </aside>
  );
}