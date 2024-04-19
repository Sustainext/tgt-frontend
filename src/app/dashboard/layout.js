'use client'

import { useState } from "react";
import DashboardHeader from "./dashobardheader";
import Sidenav from "./sidebar";

export default function DashboardLayout({children}) {
    const [open, setOpen] = useState(true);
  return (
    <>

      <section open={open}>
        <div className="flex w-full">
          <div className="block float-left ">
            <Sidenav open={open} setOpen={setOpen}/>
          </div>
          <div className={`mx-2 w-full ${open ? "ml-[285px]" : "ml-[90px]"}`}>
            <div className="mb-5 ">
              <DashboardHeader  />
              <div className="" >{children}</div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
