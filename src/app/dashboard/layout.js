"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import DashboardHeader from "./dashobardheader";
import Sidenav from "./sidebar";
import { GlobalState } from "../../Context/page";
import StoreProvider from "../../Context/storeProvider";
import GlobalErrorHandler from "../shared/components/GlobalErrorHandler";

export default function DashboardLayout({ children }) {
  const { open } = GlobalState();
  const router = useRouter();
  return (
    <>
      <section>
        <GlobalErrorHandler />
        <StoreProvider>
          <div className="flex w-full">
            <div className="block float-left">
              <Sidenav />
            </div>
            <div className={`mx-2 w-full ${open ? "ml-[243px]" : "ml-[74px]"}`}>
              <div className="mb-5">
                <DashboardHeader />
                <div>{children}</div>
              </div>
            </div>
          </div>
        </StoreProvider>
      </section>
    </>
  );
}
