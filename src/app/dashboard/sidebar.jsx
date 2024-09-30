import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowDown,
  MdOutlineAddBox,
  MdPublic,
  MdOutlineGroup,
  MdOutlineDiversity1,
  MdOutlineDiversity2,
  MdOutlineDiversity3,
  MdOutlinePieChartOutline,
  MdOutlineBarChart,
  MdOutlineSettingsSuggest,
  MdOutlineSearch,
  MdOutlineAccountTree,
  MdInfoOutline,
  MdEditNote,
} from "react-icons/md";
import { LiaHomeSolid } from "react-icons/lia";
import Link from "next/link";
import { GlobalState } from "../../Context/page";
import { CiSettings } from "react-icons/ci";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Sidenav = () => {
  const { open, setOpen } = GlobalState();
  const [activeIndex, setActiveIndex] = useState(null);

  const Menus = [
    { title: "Sustainext HQ", icon: <LiaHomeSolid />, link: "/dashboard" },
    {
      title: "Materiality Dashboard",
      icon: <MdOutlinePieChartOutline />,
      spacing: true,
      link: "/dashboard/Materiality",
    },
    {
      title: "Collect",
      id: 1,
      icon: <MdOutlineAddBox />,
      submenu: true,
      submenuItems: [
        {
          title: "Environment",
          icon: <MdPublic />,
          link: "/dashboard/environment",
        },
        {
          title: "Social",
          icon: <MdOutlineGroup />,
          link: "/dashboard/social",
        },
        {
          title: "Governance",
          icon: <MdOutlineDiversity1 />,
          link: "/dashboard/governance",
        },
        {
          title: "General",
          icon: <MdOutlineDiversity2 />,
          link: "/dashboard/general",
        },
        {
          title: "Economic",
          icon: <MdOutlineDiversity3 />,
          link: "/dashboard/economic",
        },
      ],
    },
    {
      title: "Analyse",
      icon: <MdOutlineBarChart />,
      submenu: true,
      submenuItems: [
        {
          title: "Environment",
          icon: <MdPublic />,
          link: "/dashboard/Analyse/environment",
        },
        {
          title: "Social",
          icon: <MdOutlineGroup />,
          link: "/dashboard/Analyse/social",
        },
        {
          title: "Governance",
          icon: <MdOutlineDiversity1 />,
          link: "/dashboard/Analyse/governance",
        },
        {
          title: "General",
          icon: <MdOutlineDiversity2 />,
          link: "/dashboard/Analyse/general",
        },
        {
          title: "Economic",
          icon: <MdOutlineDiversity3 />,
          link: "/dashboard/Analyse/economic",
        },
      ],
    },
    { title: "Report", icon: <MdEditNote />, link: "/dashboard/Report" },
    { title: "Optimise", icon: <MdOutlineSettingsSuggest />, link: "#" },
    {
      title: "Track",
      icon: <MdOutlineSearch />,
      spacing: true,
      link: "/dashboard/Track",
    },
    {
      title: "Organizational Structure",
      icon: <MdOutlineAccountTree />,
      link: "/dashboard/OrgStructure",
    },
    { title: "Settings", icon: <CiSettings />, link: "/dashboard/Settings" },
    { title: "About", icon: <MdInfoOutline />, link: "#" },
  ];

  const [submenuOpen, setSubmenuOpen] = useState(
    new Array(Menus.length).fill(false)
  );

  const toggleSubmenu = (index) => {
    const newSubmenuOpen = submenuOpen.map((item, i) =>
      i === index ? !item : false
    );
    setSubmenuOpen(newSubmenuOpen);
  };

  return (
    <>
      <div className="min-h-[120vh] fixed z-[100]">
        <div
          className={`bg-[#0a0528] min-h-[130vh] pt-[1.25rem] ${
            open ? "w-[15rem]" : "w-[4.5rem]"
          } duration-300 relative`}
        >
          <div className="flex justify-center">
            <div className={`flex ${open ? "me-10" : "-me-[7rem]"}`}>
              <img src="/download.png" alt="Logo" className="h-10 w-auto" />
              <h1 className={`text-white text-2xl pt-1 ${!open && "scale-0"}`}>
                Sustainext
              </h1>
            </div>
            <div>
              <MdKeyboardDoubleArrowLeft
                className={`text-[#fff] text-2xl absolute cursor-pointer transition-transform duration-300 ${
                  !open ? "rotate-180 right-0 top-7" : "right-0 top-7"
                }`}
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <ul className="pt-2 overflow-y-scroll h-[110vh] scrollable-content">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                {menu.submenu ? (
                  <li
                    className={`text-white text-sm flex items-center gap-x-4 cursor-pointer rounded-md mt-2 w-full p-2
                      ${open ? "hover:bg-[#007EEF]" : ""} 
                      ${open && activeIndex === index ? "bg-[#081746]" : ""}`}
                    onClick={() => {
                      toggleSubmenu(index);
                      setActiveIndex(index);
                  
                      
                    }}
                  >
                    <span
                      className={`text-2xl flex items-center justify-center w-12 h-8 rounded-md 
                      ${!open ? "hover:bg-[#007EEF]" : ""}
                      ${!open && activeIndex === index ? "bg-[#081746]" : ""}`}
                      data-tooltip-id={`tooltip-${index}`}
                      data-tooltip-content={menu.title}
                      onClick={() => {
                        setOpen(!open);
                        
                      }}
                    >
                      {menu.icon ? menu.icon : <LiaHomeSolid />}
                    </span>
                    <span
                      className={`text-sm font-medium flex-1 ${
                        !open && "hidden"
                      }`}
                    >
                      {menu.title}
                    </span>
                    {menu.submenu && open && (
                      <MdKeyboardArrowDown
                        className={`text-2xl ${
                          submenuOpen[index] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                    {!open && (
                      <ReactTooltip
                        id={`tooltip-${index}`}
                        place="right"
                        effect="solid"
                        style={{ fontSize: "10px",background:'#0a0528',boxShadow: 3,
                          borderRadius: "8px",zIndex:1000 }}
                      />
                    )}
                  </li>
                ) : (
                  <Link href={menu.link} key={index}>
                    <li
                      className={`text-white text-sm flex items-center gap-x-4 cursor-pointer rounded-md mt-2 w-full p-2
                        ${open ? "hover:bg-[#007EEF]" : ""}
                        ${open && activeIndex === index ? "bg-[#081746]" : ""}`}
                      onClick={() => {
                        setActiveIndex(index);
                        setOpen(!open);
                      }}
                    >
                      <span
                        className={`text-2xl flex items-center justify-center w-12 h-8 rounded-md 
                          ${!open ? "hover:bg-[#007EEF]" : ""}
                          ${
                            !open && activeIndex === index ? "bg-[#081746]" : ""
                          }`}
                        data-tooltip-id={`tooltip-${index}`}
                        data-tooltip-content={menu.title}
                      >
                        {menu.icon ? menu.icon : <LiaHomeSolid />}
                      </span>
                      <span
                        className={`text-sm font-medium flex-1 ${
                          !open && "hidden"
                        }`}
                      >
                        {menu.title}
                      </span>
                      {!open && (
                        <ReactTooltip
                          id={`tooltip-${index}`}
                          place="right"
                          effect="solid"
                          style={{ fontSize: "10px",background:'#0a0528',boxShadow: 3,
                            borderRadius: "8px",zIndex:1000 }}
                        />
                      )}
                    </li>
                  </Link>
                )}
                {menu.spacing && (
                  <hr className="bg-[rgba(217, 217, 217, 1)] h-[0.0625rem] my-4 mx-3 opacity-30" />
                )}
                {menu.submenu && submenuOpen[index] && open && (
                  <ul className="">
                    {menu.submenuItems.map((submenuItem, subIndex) => (
                      <Link href={submenuItem.link} key={subIndex}>
                        <li
                          className={`text-white text-sm p-2 px-5 mx-5 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md  mt-2 ${
                            activeIndex === `${index}-${subIndex}`
                              ? "bg-[#081746]"
                              : ""
                          }`}
                          onClick={() => {
                            toggleSubmenu(subIndex); 
                            setActiveIndex(subIndex); 
                            setOpen(!open); 
                          }}
                        >
                          <span className="text-2xl block float-left">
                            {submenuItem.icon ? (
                              submenuItem.icon
                            ) : (
                              <LiaHomeSolid />
                            )}
                          </span>
                          <span
                            className={`text-sm font-medium flex-1 ${
                              !open && "hidden"
                            }`}
                          >
                            {submenuItem.title}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidenav;
