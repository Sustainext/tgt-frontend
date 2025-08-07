import React, { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";

const TableSidebar2 = () => {
  const [activeId, setActiveId] = useState("ep1");

  const adjustScrollPosition = (anchor) => {
    console.log('Attempting to scroll to:', anchor);
    
    // Wait a small amount of time to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(anchor.replace('#', ''));
      console.log('Element found:', element);
      
      if (element) {
        const headerOffset = 200;
        const elementRect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = elementRect.top + scrollTop - headerOffset;
        
        console.log('Element rect:', elementRect);
        console.log('Current scroll:', scrollTop);
        console.log('Target position:', targetPosition);

        // Try multiple scroll methods for better compatibility
        try {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
        } catch (e) {
          // Fallback for older browsers
          window.scrollTo(0, targetPosition);
        }
        
        // Additional fallback using document element
        if (document.documentElement.scrollTop === scrollTop) {
          document.documentElement.scrollTop = targetPosition;
        }
        
        // Final fallback using body
        if (document.body.scrollTop === scrollTop) {
          document.body.scrollTop = targetPosition;
        }
      } else {
        console.log('Element not found for anchor:', anchor);
        
        // Try alternative selector
        const fallbackElement = document.querySelector(`[id="${anchor.replace('#', '')}"]`);
        console.log('Fallback element:', fallbackElement);
        if (fallbackElement) {
          const headerOffset = 200;
          const elementRect = fallbackElement.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = elementRect.top + scrollTop - headerOffset;
          
          try {
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
          } catch (e) {
            window.scrollTo(0, targetPosition);
          }
        }
      }
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      const links = [
        "ep1",
        "ep2",
        "ep3",
        "ep4",
        "ep5",
      ];

      const threshold = 150;

      for (const id of links) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -threshold && rect.top <= window.innerHeight - threshold) {
            setActiveId(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[200px] h-[600px] pl-[17px] pr-[21px] py-[21px] rounded-lg border flex-col justify-start items-end gap-2 inline-flex">
      <div className="w-[161px] justify-end items-center gap-2 inline-flex">
        <div className="text-right text-neutral-500 text-[12px] font-semibold font-['Manrope'] leading-[14px] tracking-wide">
          Tables
        </div>
      </div>
      {[
        {
          id: "ep1",
          name: "Formal joint management-worker health and safety committees",
        },
        {
          id: "ep2",
          name: "Workers covered by an occupational health and safety management system",
        },
        {
          id: "ep3",
          name: "Work related ill health",
        },
        {
          id: "ep4",
          name: "Ill Health - For all employees",
        },
        {
          id: "ep5",
          name: "Ill Health - For workers not employees",
        },
      ].map((link) => (
        <div key={link.id} className="self-stretch justify-end items-center gap-2 inline-flex">
          <a
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              adjustScrollPosition(`#${link.id}`);
            }}
            className={`grow shrink basis-0 text-right ${
              activeId === link.id ? "text-teal-500 font-semibold" : "text-sky-600"
            } text-[11px] font-normal font-['Manrope'] leading-[14px] hover:text-teal-500`}
          >
            <AiOutlineLink className="inline-block mr-1" />
            {link.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default TableSidebar2;