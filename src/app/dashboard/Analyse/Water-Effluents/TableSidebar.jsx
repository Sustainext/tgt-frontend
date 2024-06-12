import React, { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";

const TableSidebar = () => {
  const [activeId, setActiveId] = useState("");

  const adjustScrollPosition = (anchor) => {
    const headerOffset = 250;
    const elementPosition = document.querySelector(anchor).getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const links = [
        "watereffluents1",
        "watereffluents2",
        "watereffluents3",
        "watereffluents4",
        "watereffluents5",
        "watereffluents6",
        "watereffluents7",
        "watereffluents8",
        "watereffluents9",
        "watereffluents10",
        "watereffluents11",
        "watereffluents12",
        "watereffluents13",
        "watereffluents14",
        "watereffluents15",
        "watereffluents16",
        "watereffluents17",

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
    <div className="w-[199px] h-[680px] pl-[17px] pr-[21px] py-[21px] rounded-lg border flex-col justify-start items-end gap-2 inline-flex">
      <div className="w-[161px] justify-end items-center gap-2 inline-flex">
        <div className="text-right text-neutral-500 text-[10px] font-semibold font-['Manrope'] leading-[14px] tracking-wide">
          Tables
        </div>
      </div>
      {[
        {
          id: "watereffluents1",
          name: "Total Water Consumption",
        },
        {
          id: "watereffluents2",
          name: "Total Water Consumption in water stress areas",
        },
        {
          id: "watereffluents3",
          name: "Total Water Consumption by business operation",
        },
        {
          id: "watereffluents4",
          name: "Total Water Consumption by Location",
        },
        {
          id: "watereffluents5",
          name: "Total Water Consumption by source",
        },
        {
          id: "watereffluents6",
          name: "Total Fresh Water withdrawal by business operation",
        },
        {
          id: "watereffluents7",
          name: "Total Fresh Water withdrawal by source (from water stress area)",
        },
        {
          id: "watereffluents8",
          name: "Total Fresh Water withdrawal by Location/Country",
        },
        {
          id: "watereffluents9",
          name: "Total Water withdrawal by Water type",
        },
        {
          id: "watereffluents10",
          name: "Water withdrawal from third-parties",
        },
        {
          id: "watereffluents11",
          name: "Total Water Discharge by Location",
        },
        {
          id: "watereffluents12",
          name: "Total Water Discharge by source and type of water",
        },
        {
          id: "watereffluents13",
          name: "Total Water Discharge (from water stress area) by Business Operation",
        },
        {
          id: "watereffluents14",
          name: "Total Water Discharge by Business Operation",
        },
        {
          id: "watereffluents15",
          name: "Total Water Discharge by Water type (from water stress area)",
        },
        {
          id: "watereffluents16",
          name: "Third-party Water discharge sent to use for other organizations",
        },
        {
          id: "watereffluents17",
          name: "Change in water storage",
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
            } text-[10px] font-normal font-['Manrope'] leading-[14px] hover:text-teal-500`}
          >
            <AiOutlineLink className="inline-block mr-1" />
            {link.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default TableSidebar;
