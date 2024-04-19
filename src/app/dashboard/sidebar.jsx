'use client'
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowDown, MdOutlineAddBox, MdPublic, MdOutlineGroup,MdOutlineDiversity1,MdOutlineDiversity2, MdOutlineDiversity3, MdOutlinePieChartOutline, MdOutlineBarChart, MdOutlineSettingsSuggest ,MdOutlineSearch, MdOutlineAccountTree, MdInfoOutline, MdEditNote } from "react-icons/md";
import { LiaHomeSolid } from "react-icons/lia";
import Link from "next/link";
const Sidenav = ({setOpen, open}) => {
  const Menus = [
    { title: "Sustainext HQ", icon: <LiaHomeSolid />,link:"/dashboard", },
    { title: "Materiality Dashboard", icon: <MdOutlinePieChartOutline  />, spacing:true, link:"#" },
    {
      title: "Collect", icon: <MdOutlineAddBox />,
      submenu: true,
      submenuItems: [
        { title: "Environment",icon: <MdPublic />, link:"/dashboard/environment" },
        { title: "Social", icon: <MdOutlineGroup /> ,link:"/dashboard/environment"},
        { title: "Governance", icon: <MdOutlineDiversity1/> ,link:"/dashboard/environment"},
        { title: "General", icon: <MdOutlineDiversity2 />,link:"/dashboard/environment"} ,
        { title: "Economic", icon: <MdOutlineDiversity3  />,link:"/dashboard/environment"},
      ]
    },
    { title: "Analyse", icon: <MdOutlineBarChart/>, link:"#" },
    { title: "Report", icon: <MdEditNote />, link:"#" },
    { title: "Optimise", icon: <MdOutlineSettingsSuggest />, link:"#" },
    { title: "Track", icon: <MdOutlineSearch/>, spacing:true , link:"#"},
    { title: "Organizational Structure", icon: <MdOutlineAccountTree/>, link:"#" },
    { title: "About", icon: <MdInfoOutline/>, link:"#" },
  ];

  const [submanuopen, setSubmenuopen] = useState(false);
  return (
    <div className="flex min-h-screen fixed z-[100]">
      <div className={`bg-[#0a0528] min-h-screen p-5 pt-8 ${open ? "w-[17rem]" : "w-20"} duration-300 relative`}>
        <MdKeyboardDoubleArrowLeft className={`bg-white text-[#0a0528] text-3xl rounded-full absolute -right-3 top-9 border  cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)} />
        <div className="inline-flex">
          <img
            src="/download.png"
            alt="Logo"
            className="h-10 w-auto"
          />

          <h1 className={`text-white text-2xl pt-1 ${!open && "scale-0"}`}>Sustainext</h1>
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
            {menu.submenu ? (
              <li key={index} className=" text-white text-sm p-2 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2" onClick={() => setSubmenuopen(!submanuopen)}>
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <LiaHomeSolid />}
                </span>
                <span className={`text-sm font-medium flex-1 ${!open && "hidden"}`}>
                  {menu.title}
                </span>
                {menu.submenu && open && (<MdKeyboardArrowDown className={`text-2xl ${submanuopen && "rotate-i80"}`}  />)}
              </li>
            ) : (
              <Link href={menu.link}>
              <li key={index} className=" text-white text-sm p-2 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2">
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <LiaHomeSolid />}
              </span>
              <span className={`text-sm font-medium flex-1 ${!open && "hidden"}`}>
                {menu.title}
              </span>
              {menu.submenu && open && (<MdKeyboardArrowDown className={`text-2xl ${submanuopen && "rotate-i80"}`}  />)}
            </li>
            </Link>
            )}
              {menu.spacing && ( <hr className='bg-[rgba(217, 217, 217, 1)] h-[0.0625rem] my-4 mx-3 opacity-30' />) }

              {menu.submenu && submanuopen && open && (
                <ul>
                  {menu.submenuItems.map((submanuItem, index) =>
                  <Link href={submanuItem.link} key={index}>
                    <li key={index} className=" text-white text-sm p-2 px-5 flex items-center gap-x-4 cursor-pointer hover:bg-[#007EEF] rounded-md mt-2">
                      <span className="text-2xl block float-left">
                      {submanuItem.icon ? submanuItem.icon : <LiaHomeSolid />}
                      </span>
                      <span className={` text-sm font-medium flex-1 ${!open && "hidden"}`}>
                        {submanuItem.title}
                      </span>

                    </li>
                    </Link>
                  )}
                </ul>
              )}
            </>

          ))}
        </ul>

      </div>

    </div>

  );
};

export default Sidenav;
