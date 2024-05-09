'use client'
import { useState ,useContext } from "react";
import DashboardHeader from "./dashobardheader";
import Sidenav from "./sidebar";
import { GlobalState } from "../../Context/page";
export default function DashboardLayout({children}) {
  const { open} = GlobalState();
  return (
    <>

      <section>
        <div className="flex w-full">
          <div className="block float-left ">
            <Sidenav/>
          </div>
          <div className={`mx-2 w-full ${open ? "ml-[240px]" : "ml-[90px]"}`}>
            <div className="mb-5 ">
              <DashboardHeader  />
              <div>{children}</div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
