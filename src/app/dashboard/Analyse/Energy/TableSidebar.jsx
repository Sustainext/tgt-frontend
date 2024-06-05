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
        "fuelFromRenewable",
        "fuelFromNonRenewable",
        "EnergyWithinOrganization",
        "DirectFromRenewable",
        "DirectFromNonRenewable",
        "SelfGenFromRenewable",
        "SelfGenFromNonRenewable",
        "EnergySoldRenewable",
        "EnergySoldNonRenewable",
        "EnergyOutsideOrganization",
        "EnergyIntensity",
        "ReductionOfEnergy",
        "ReductionInEnergyOfPS",
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
    <div className="w-[199px] h-[580px] pl-[17px] pr-[21px] py-[21px] rounded-lg border flex-col justify-start items-end gap-2 inline-flex">
      <div className="w-[161px] justify-end items-center gap-2 inline-flex">
        <div className="text-right text-neutral-500 text-[10px] font-semibold font-['Manrope'] leading-[14px] tracking-wide">
          Tables
        </div>
      </div>
      {[
        {
          id: "fuelFromRenewable",
          name: "Fuel Consumption within the organisation from Renewable sources",
        },
        {
          id: "fuelFromNonRenewable",
          name: "Fuel Consumption within the organisation from Non-renewable sources",
        },
        {
          id: "EnergyWithinOrganization",
          name: "Energy Consumption Within the organisation",
        },
        {
          id: "DirectFromRenewable",
          name: "Direct Purchased Heating, Cooling, Electricity and Steam from renewable sources",
        },
        {
          id: "DirectFromNonRenewable",
          name: "Direct Purchased Heating, Cooling, Electricity and Steam from non-renewable sources",
        },
        {
          id: "SelfGenFromRenewable",
          name: "Self Generated Energy - not consumed or sold (Renewable Energy)",
        },
        {
          id: "SelfGenFromNonRenewable",
          name: "Self Generated Energy - not consumed or sold (non-renewable Energy)",
        },
        { id: "EnergySoldRenewable", name: "Energy Sold (Renewable energy)" },
        {
          id: "EnergySoldNonRenewable",
          name: "Energy Sold (non-renewable energy)",
        },
        {
          id: "EnergyOutsideOrganization",
          name: "Energy Consumption outside of the organization",
        },
        { id: "EnergyIntensity", name: "Energy Intensity" },
        { id: "ReductionOfEnergy", name: "Reduction of energy consumption" },
        {
          id: "ReductionInEnergyOfPS",
          name: "Reductions in energy requirements of products and services",
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
