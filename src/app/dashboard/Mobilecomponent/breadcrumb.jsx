"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Context/auth";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "../../utils/storage";
import Link from "next/link";
import { useSelector } from "react-redux";

const BreadcrumbAlternative = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    initials: "",
  });
  const { logout, userDetails } = useAuth();
  const router = useRouter();
  const profileRef = useRef(null);
  const drawerRef = useRef(null);
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

  useEffect(() => {
    const initializeUserData = () => {
      if (userDetails?.user_detail?.[0]) {
        const email = userDetails.user_detail[0].username;
        setUserData({
          username: extractUsername(email),
          email: email,
          initials: getInitials(email),
        });
        return;
      }
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

    const interval = setInterval(() => {
      if (!userData.username) {
        initializeUserData();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userDetails]);

  return (
    <div className="flex justify-start items-center py-2">
      <Link href="/dashboard">
        <span className="text-[#007EEF] hover:text-[#007EEF] font-semibold cursor-pointer">
          Home
        </span>
      </Link>
      <span className="text-[#222222] mx-1">{'>'}</span>

      {text1 !== "" && (
        <>
          <span className="text-[#222222] hover:text-[#222222] cursor-pointer">
            {text1}
          </span>
          <span className="text-[#222222] mx-1">{'>'}</span>
        </>
      )}

      {headerdisplay === "block" && (
        <>
          <span className="text-[#222222] hover:text-[#222222] cursor-pointer">
            {middlename}
          </span>
      <span className="text-[#222222] mx-1">{'>'}</span>
        </>
      )}

      <span className="text-[#222222] truncate w-[200px] xl:w-[400px] md:w-[400px] lg:w-[400px] 2xl:w-[400px] 4k:w-[400px] 2k:w-[400px] overflow-hidden whitespace-nowrap cursor-pointer">
        {text2}
      </span>
    </div>
  );
};

export default BreadcrumbAlternative;
