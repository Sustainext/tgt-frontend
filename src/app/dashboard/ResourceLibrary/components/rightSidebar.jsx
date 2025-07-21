"use client";
import React, { useEffect, useRef, useState } from "react";

export default function RightSidebarWithScrollspy({
  sections = [],
  containerSelector = null,     // If you render content in a scrollable div
  title = "Overview of principles",
  className = "",
}) {
   
  const [activeSlug, setActiveSlug] = useState(sections[0]?.slug);
  const observer = useRef(null);

  useEffect(() => {
    if (!sections.length) return;
    const ids = sections.map((s) => s.slug);
    let scrollContainer = containerSelector
      ? document.querySelector(containerSelector)
      : window;

    // Sticky scrollspy setup
    observer.current = new window.IntersectionObserver(
      (entries) => {
        // Find the one closest to top and visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      {
        // Margin threshold to trigger highlight when section enters viewport
        root: containerSelector ? scrollContainer : null,
        rootMargin: "0px 0px -65% 0px", // highlights toc a bit earlier
        threshold: 0.15, // Change as needed
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.current.observe(el);
    });

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [containerSelector, sections]);

  // Handle click-to-scroll
  function scrollToSection(slug) {
    const el = document.getElementById(slug);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSlug(slug);
    }
  }

  return (
    // <aside className={`min-w-[220px] max-w-[260px] px-4 pt-4 pb-2 sticky top-16 self-start ${className}`}>
    //   <div className="font-semibold text-[#727272] mb-2 text-[15px]">{title}</div>
    //   <ul className="relative pl-0">
    //     {/* Vertical line */}
    //     <div className="absolute left-0 top-[32px] bottom-0 w-0.5 bg-gray-200 ml-0.5 z-0" />
    //     {sections.map((sec) => (
    //       <li
    //         key={sec.slug}
    //         className="relative flex items-center h-8 z-10 cursor-pointer"
    //         onClick={() => scrollToSection(sec.slug)}
    //       >
    //         {/* blue bar for active */}
    //         <div
    //           className={`
    //             w-[5px] h-7 mr-2 rounded
    //             transition-all
    //             ${activeSlug === sec.slug ? "bg-[#0057A5]" : "bg-transparent"}
    //           `}
    //         />
            
    //         <span
    //           className={`
    //             flex-1 text-[15px]
    //             ${
    //               activeSlug === sec.slug
    //                 ? "text-[#007EEF] font-medium"
    //                 : "text-[#8B8D97] font-regular"
    //             }
    //             transition
    //           `}
    //         >
    //           {sec.title}
    //         </span>
    //       </li>
    //     ))}
    //   </ul>
    // </aside>
  <aside className={`min-w-[220px] max-w-[260px] px-4 pt-4 pb-2 sticky top-16 self-start ${className}`}>
  <div className="font-semibold text-[#727272] mb-2 text-[14px]">{title}</div>
  <ul className="relative pl-0">
    {/* Background vertical gray line */}
    <div
      className="absolute top-[32px] bottom-0 w-0.5 bg-gray-200 z-0"
      style={{ width: '3px' }} // left spacing for bar (22px to match padding)
    />
    {sections.map((sec) => (
      <li
        key={sec.slug}
        className="relative flex items-center mb-1.5 cursor-pointer group"
        onClick={() => scrollToSection(sec.slug)}
        style={{ minHeight: 32 }}
      >
        {/* Blue active bar overlays white only for active item */}
        {activeSlug === sec.slug && (
          <div
            className="absolute top-0 h-full bg-[#0057A5] z-10 rounded"
            style={{ width: '3px' }} // Match the gray bar's left/width
          />
        )}
        {/* Left pad label text so it never overlaps the bar */}
        <span
          className={`
            pl-4 text-[13px]
            ${activeSlug === sec.slug ? "text-[#007EEF] font-medium" : "text-[#8B8D97] font-normal"}
            transition
          `}
        >
          {sec.title}
        </span>
      </li>
    ))}
  </ul>
</aside>
  );
}