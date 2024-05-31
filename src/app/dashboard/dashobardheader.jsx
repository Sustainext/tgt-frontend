'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { useRouter } from "next/navigation";
import { loadFromLocalStorage } from "../utils/storage";

const DashboardHeader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email,setEmail]= useState('');
  const [initials,setInitials] = useState('');
  const { logout } = useAuth();
  const router = useRouter();
  const userDetails = loadFromLocalStorage('userData')

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {  
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (email) => {
    const username = email?.split('@')[0];
    const nameParts = username?.split('.');
    const initials = nameParts?.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
  };

  const extractUsername = (input) => {
    if (input?.includes('@')) {
      return input.split('@')[0];
    }
    return input;
  };

  useEffect(()=>{
    setUsername(extractUsername(userDetails?.user_detail[0].username));
    setEmail(userDetails?.user_detail[0].username);
    setInitials(getInitials(userDetails?.user_detail[0].username))
  },[])

  return (
    <>
      <div className="flex justify-between bg-white sticky top-0 right-0 border-b border-sky-600 border-opacity-50 pt-1 w-full mx-2 -z--1000">
        <div className="flex justify-start items-center my-4 gap-1 px-2">
          <a href="/home">
            <span className="text-[#007EEF] hover:text-[#0057A5]">Home</span>
          </a>
          <span className="text-[#222222] mx-1">&gt;</span>
          <a href="/home/sustainextHQ">
            <span className="text-[#222222] hover:text-[#0057A5] mx-2">
              SustainextHQ
            </span>
          </a>
        </div>
        <div className="flex justify-center items-center">
          <div className="me-8 flex items-center">
            <div className="text-[#007EEF]">
              <span className="text-[#007EEF]"> Hi,</span>
              <span className="me-4 text-[#007EEF]">{username}</span>
            </div>
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="flex justify-center items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(rgb(0, 126, 239), rgb(42, 228, 255))",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {initials}
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
                <div className="w-[220px] h-[128px] flex-col justify-start items-start absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="self-stretch h-[128px] bg-white rounded shadow flex-col justify-start items-start flex">
                    <div className="self-stretch h-[128px] rounded flex-col justify-start items-start flex">
                      <div className="self-stretch h-[45px] flex-col justify-start items-start flex">
                        <div className="self-stretch px-4 py-1 justify-start items-center inline-flex">
                          <div className="grow shrink basis-0 py-1 flex-col justify-start items-start inline-flex">
                            <div className="self-stretch text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none">
                              {username}
                            </div>
                            <div className="self-stretch text-black/opacity-60 text-xs font-normal font-['Manrope'] leading-[15px]">
                              {email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-px flex-col justify-start items-start flex">
                        <div className="w-[0px] h-px relative" />
                        <div className="self-stretch h-[0px] border border-black/opacity-10"></div>
                      </div>
                      <div className="self-stretch h-[85px] py-1 flex-col justify-start items-start flex">
                        <div className="self-stretch h-9 flex-col justify-center items-start flex">
                          <div className="self-stretch px-4 py-1.5 justify-start items-center inline-flex">
                          <div className="grow shrink basis-0 h-4 justify-start items-center flex">
                              <div className="grow shrink basis-0 text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none">
                                Profile{" "}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-[7px] flex-col justify-start items-start flex">
                          <div className="w-[0px] h-px relative" />
                          <div className="self-stretch h-[0px] border border-black/opacity-10"></div>
                        </div>
                        <div className="self-stretch flex-col justify-center items-start flex">
                          <div className="self-stretch px-4 py-1.5 justify-start items-center inline-flex">
                            <div className="pr-8 flex-col justify-start items-start inline-flex">
                            <div className="grow shrink basis-0 h-4 justify-start items-center flex">
                              <button onClick={handleLogout} className="grow shrink basis-0 text-red-600 text-[13px] font-normal font-['Manrope'] leading-none">
                                Log out
                              </button>
                            </div>
                            </div>
                          </div>
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
    </>
  );
};

export default DashboardHeader;
