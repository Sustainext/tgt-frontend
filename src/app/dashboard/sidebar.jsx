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
import DashboardHeader from "./dashobardheader";
import { GlobalState } from "../../Context/page";

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
          link: "/dashboard/environment",
        },
        {
          title: "Economic",
          icon: <MdOutlineDiversity3 />,
          link: "/dashboard/environment",
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
          link: "/dashboard/environment",
        },
        {
          title: "General",
          icon: <MdOutlineDiversity2 />,
          link: "/dashboard/environment",
        },
        {
          title: "Economic",
          icon: <MdOutlineDiversity3 />,
          link: "/dashboard/environment",
        },
      ],
    },
    // { title: "Analyse", icon: <MdOutlineBarChart />, link: "/dashboard/Analyse" },
    { title: "Report", icon: <MdEditNote />, link: "/dashboard/Report" },
    { title: "Optimise", icon: <MdOutlineSettingsSuggest />, link: "#" },
    { title: "Track", icon: <MdOutlineSearch />, spacing: true, link: "/dashboard/Track" },
    {
      title: "Organizational Structure",
      icon: <MdOutlineAccountTree />,
      link: "/dashboard/OrgStructure",
    },
    { title: "About", icon: <MdInfoOutline />, link: "#" },
  ];

  const [submenuOpen, setSubmenuOpen] = useState(new Array(Menus.length).fill(false));

  const toggleSubmenu = (index) => {
    const newSubmenuOpen = submenuOpen.map((item, i) => i === index ? !item : false);
    setSubmenuOpen(newSubmenuOpen);
  };

  return (
    <>
      <div className="min-h-[100vh] fixed z-[100]">
        <div
          className={`bg-[#0a0528] min-h-[135vh] ps-3 pt-8 ${
            open ? "w-[15rem]" : "w-16"
          } duration-300 relative`}
        >
          <MdKeyboardDoubleArrowLeft
            className={`bg-white text-[#0a0528] text-3xl rounded-full absolute -right-3 top-9 border  cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="inline-flex">
            <img src="/download.png" alt="Logo" className="h-10 w-auto" />

            <h1 className={`text-white text-2xl pt-1 ${!open && "scale-0"}`}>
              Sustainext
            </h1>
          </div>
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <React.Fragment key={index}>
                {menu.submenu ? (
                  <li
                    className={`text-white text-sm p-2 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2 ${
                      activeIndex === index ? "bg-[#081746]" : ""
                    }`}
                    onClick={() => {
                      toggleSubmenu(index);
                      setActiveIndex(index);
                    }}
                  >
                    <span className="text-2xl block float-left">
                      {menu.icon ? menu.icon : <LiaHomeSolid />}
                    </span>
                    <span
                      className={`text-sm font-medium flex-1 ${!open && "hidden"}`}
                    >
                      {menu.title}
                    </span>
                    {menu.submenu && open && (
                      <MdKeyboardArrowDown
                        className={`text-2xl ${submenuOpen[index] ? "rotate-180" : ""}`}
                      />
                    )}
                  </li>
                ) : (
                  <Link href={menu.link} key={index}>
                    <li
                      className={`text-white text-sm p-2 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2 ${
                        activeIndex === index ? "bg-[#081746]" : ""
                      }`}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="text-2xl block float-left">
                        {menu.icon ? menu.icon : <LiaHomeSolid />}
                      </span>
                      <span
                        className={`text-sm font-medium flex-1 ${!open && "hidden"}`}
                      >
                        {menu.title}
                      </span>
                    </li>
                  </Link>
                )}
                {menu.spacing && (
                  <hr className="bg-[rgba(217, 217, 217, 1)] h-[0.0625rem] my-4 mx-3 opacity-30" />
                )}

                {menu.submenu && submenuOpen[index] && open && (
                  <ul>
                    {menu.submenuItems.map((submenuItem, subIndex) => (
                      <Link href={submenuItem.link} key={subIndex}>
                        <li
                          className={`text-white text-sm p-2 px-5 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2 ${
                            activeIndex === `${index}-${subIndex}` ? "bg-[#081746]" : ""
                          }`}
                          onClick={() => setActiveIndex(`${index}-${subIndex}`)}
                        >
                          <span className="text-2xl block float-left">
                            {submenuItem.icon ? submenuItem.icon : <LiaHomeSolid />}
                          </span>
                          <span
                            className={`text-sm font-medium flex-1 ${!open && "hidden"}`}
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