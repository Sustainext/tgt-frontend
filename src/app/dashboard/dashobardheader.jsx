"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../Context/auth";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "../utils/storage";
import Link from "next/link";
import Profile from "./Profile";
import { Oval } from "react-loader-spinner";
import { GlobalState } from "../../Context/page";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const { open } = GlobalState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileVisible(true);
    setDropdownVisible(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // FluentC widget observer
  const [opens, setOpen] = useState(false);
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (
              node.nodeType === Node.ELEMENT_NODE &&
              node.matches("._fluentc_widget-language-manager.show")
            ) {
              node.classList.remove("show");
            }
          });
        }

        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const target = mutation.target;
          if (
            target === document.body &&
            target.classList.contains("_fluentc_widget-banner-show")
          ) {
            target.classList.remove("_fluentc_widget-banner-show");
            const widgetDiv = document.querySelector(
              "._fluentc_widget-language-manager.show"
            );
            widgetDiv?.classList.remove("show");
          }

          if (target.matches("._fluentc_widget-language-manager")) {
            setOpen(target.classList.contains("loading"));
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close drawer when clicking outside
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="flex bg-white xl:sticky lg:sticky 2xl:sticky md:sticky xl:top-0 lg:top-0 2xl:top-0 md:top-0  right-0 border-b border-sky-600 border-opacity-50 xl:pt-4 lg:pt-4 md:pt-4 2xl:pt-4 w-full xl:mx-2 lg:mx-2 md:mx-2 2xl:mx-2 xl:z-[1000] lg:z-[1000] md:z-[1000] 2xl:z-[1000]">
        <div
          className={`flex justify-start items-center my-2 gap-1 px-2 xl:ml-0 lg:ml-0 2xl:ml-0 md:ml-0  ${
            open ? "w-[83%]" : "w-[84%]"
          }`}
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
        <div className="lg:block xl:block 2xl:block md:block hidden w-[15%]">
        <div className="flex justify-end items-center  ">
          <div className="flex">
          
            <div className="text-[#007EEF] flex items-center">
              <span className="text-[#007EEF]">Hi,</span>
              <span className="me-4 text-[#007EEF]">{userData.username}</span>
            </div>
          
         
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="flex justify-center items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(rgb(0, 126, 239), rgb(42, 228, 255))",
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {userData.initials}
                </div>
                <div>
                  <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="ArrowDropDownOutlinedIcon"
                  >
                    <path d="m7 10 5 5 5-5H7z"></path>
                  </svg>
                </div>
              </div>
              {dropdownVisible && (
                <div
                  ref={drawerRef}
                  className="w-[220px] absolute -right-[2px] mt-3 bg-white border border-gray-300 rounded shadow-lg"
                  onMouseEnter={() => setDropdownVisible(true)} // Prevent closing when mouse enters dropdown
                >
                  <div className="self-stretch bg-white rounded shadow flex-col justify-start items-start flex">
                    <div className="self-stretch h-[45px] flex-col justify-start items-start flex">
                      <div className="self-stretch px-4 py-1 justify-start items-center inline-flex border-b-2 border-gray-300">
                        <div className="grow shrink basis-0 py-1 flex-col justify-start items-start inline-flex">
                          <div className="self-stretch text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none">
                            {userData.username}
                          </div>
                          <div className="self-stretch text-black/opacity-60 text-xs font-normal font-['Manrope'] leading-[15px]">
                            {userData.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch py-1 flex-col justify-start items-start flex">
                      <div
                        className="self-stretch px-4 py-2 justify-start items-center inline-flex border-b-2 border-gray-300"
                        onClick={handleProfileClick}
                      >
                        <div className="grow shrink basis-0 text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none cursor-pointer flex">
                          <div>
                            <FaUser />
                          </div>
                          <div className="ml-2">Profile</div>
                        </div>
                      </div>
                      <div
                        className="self-stretch px-4 py-2 justify-start items-center inline-flex"
                        onClick={handleLogout}
                      >
                        <div className="grow shrink basis-0 text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none cursor-pointer flex text-red-600">
                          <div>
                            <MdLogout />
                          </div>
                          <div className="ml-2">Log out</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
      {profileVisible && (
        <div
          ref={profileRef}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <Profile onClose={() => setProfileVisible(false)} />
        </div>
      )}
      {opens && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default DashboardHeader;