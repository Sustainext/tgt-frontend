import React, { useState, useEffect } from "react";
import { AiOutlineLink } from "react-icons/ai";

const TableSidebar = () => {
  const [activeId, setActiveId] = useState("ep1");

  const adjustScrollPosition = (anchor) => {
    const element = document.querySelector(anchor);
    if (element) {
      const headerOffset = 200;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const links = ["ep1", "ep2", "ep3", "ep4"];

      const threshold = 150;

      for (const id of links) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top >= -threshold &&
            rect.top <= window.innerHeight - threshold
          ) {
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
          name: "Average hours of training provided to employees",
        },
        {
          id: "ep2",
          name: "Percentage of employees receiving regular performance and career development reviews by employee category",
        },
        {
          id: "ep3",
          name: "Percentage of employees receiving regular performance and career development reviews by gender",
        },
      ].map((link) => (
        <div
          key={link.id}
          className="self-stretch justify-end items-center gap-2 inline-flex"
        >
          <a
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              adjustScrollPosition(`#${link.id}`);
            }}
            className={`grow shrink basis-0 text-right ${
              activeId === link.id
                ? "text-teal-500 font-semibold"
                : "text-sky-600"
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

export default TableSidebar;
