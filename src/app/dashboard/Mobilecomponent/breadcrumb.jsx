"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/auth";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "../../utils/storage";
import Link from "next/link";
import { useSelector } from "react-redux";

const Breadcrumb = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    initials: "",
  });
  const { logout, userDetails } = useAuth(); // Get userDetails from Auth context
  const router = useRouter();
  const profileRef = useRef(null);
  const drawerRef = useRef(null);
  // Redux selectors
  const text1 = useSelector((state) => state.header.headertext1);
  const text2 = useSelector((state) => state.header.headertext2);
  const headerdisplay = useSelector((state) => state.header.headerdisplay);
  const middlename = useSelector((state) => state.header.middlename);

  const getInitials = (email) => {
    if (!email) return "";
    const username = email.split("@")[0];
    const nameParts = username.split(".");
    return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
  };

  const extractUsername = (input) => {
    if (!input) return "";
    return input.includes("@") ? input.split("@")[0] : input;
  };

  // Combined effect for initializing user data
  useEffect(() => {
    const initializeUserData = () => {
      // First try to get data from Auth context
      if (userDetails?.user_detail?.[0]) {
        const email = userDetails.user_detail[0].username;
        setUserData({
          username: extractUsername(email),
          email: email,
          initials: getInitials(email),
        });
        return;
      }

      // Fallback to localStorage if context is empty
      const localUserDetails = loadFromLocalStorage("userData");
      if (localUserDetails?.user_detail?.[0]) {
        const email = localUserDetails.user_detail[0].username;
        setUserData({
          username: extractUsername(email),
          email: email,
          initials: getInitials(email),
        });
      }
    };

    initializeUserData();

    // Set up interval to check for user data
    const interval = setInterval(() => {
      if (!userData.username) {
        initializeUserData();
      }
    }, 1000);

    // Cleanup interval
    return () => clearInterval(interval);
  }, [userDetails]); // Depend on userDetails from context





  return (
    <>
     
        <div
          className={`flex justify-start items-center py-2 `}
        >
          <Link href="/dashboard">
            <span className="text-[#007EEF] hover:text-[#007EEF] font-semibold">
              Home
            </span>
          </Link>
          <span className="text-[#222222] mx-1">&gt;</span>

          {text1 !== "" && (
            <>
              <span className="text-[#007EEF] hover:text-[#007EEF] font-semibold">
                {text1}
              </span>
              <span className="text-[#222222] mx-1">&gt;</span>
            </>
          )}

          {headerdisplay === "block" && (
            <>
              <span className="text-[#222222] hover:text-[#222222]">
                {middlename}
              </span>
              <span className="text-[#222222] mx-1">&gt;</span>
            </>
          )}

          <span className="text-[#222222] hover:text-[#222222]">{text2}</span>
        </div>

    </>
  );
};

export default Breadcrumb;