'use client'; // Ensure this is a client-side component
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../Context/auth';
import { useRouter } from 'next/navigation';
import { loadFromLocalStorage } from '../utils/storage';
import Link from 'next/link';
import Profile from './Profile';
import { Oval } from 'react-loader-spinner';
// import { useTranslation } from 'react-i18next';
import { GlobalState } from '../../Context/page';
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const DashboardHeader = () => {
  const { open } = GlobalState();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [initials, setInitials] = useState('');
  const { logout } = useAuth();
  const router = useRouter();
  const userDetails = loadFromLocalStorage('userData');
  const profileRef = useRef(null);


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (email) => {
    const username = email?.split('@')[0];
    const nameParts = username?.split('.');
    const initials = nameParts
      ?.map((part) => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  };

  const extractUsername = (input) => {
    if (input?.includes('@')) {
      return input.split('@')[0];
    }
    return input;
  };

  useEffect(() => {
    const userDetails = loadFromLocalStorage('userData');
    if (userDetails) {
      const userEmail = userDetails.user_detail[0].username;
      setUsername(extractUsername(userEmail));
      setEmail(userEmail);
      setInitials(getInitials(userEmail));
    }

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileVisible(true);
    setDropdownVisible(false);
  };

  const [opens, setOpen] = useState(false);  // State to control the Backdrop for the spinner

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE && node.matches('._fluentc_widget-language-manager.show')) {
              node.classList.remove('show');
            }
          });
        }

        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target;
          if (target === document.body && target.classList.contains('_fluentc_widget-banner-show')) {
            target.classList.remove('_fluentc_widget-banner-show');
            const widgetDiv = document.querySelector('._fluentc_widget-language-manager.show');
            widgetDiv?.classList.remove('show');
          }

          if (target.matches('._fluentc_widget-language-manager')) {
            const isLoading = target.classList.contains('loading');
            setOpen(isLoading);
            console.log('loading', isLoading);
          }
        }
      });
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="flex bg-white sticky top-0 right-0 border-b border-sky-600 border-opacity-50 pt-1 w-full mx-2 -z--1000">
        <div className={`flex justify-start items-center my-4 gap-1 px-2 ${open ? 'w-[84%]' : 'w-[84%]'}`}>
          <Link href="/dashboard">
            <span className="text-[#007EEF] hover:text-[#0057A5]">Home</span>
          </Link>
          <span className="text-[#222222] mx-1">&gt;</span>
          <a href="/home/sustainextHQ">
            <span className="text-[#222222] hover:text-[#0057A5] mx-2">SustainextHQ</span>
          </a>
        </div>
        <div className="flex justify-end items-center w-[15%]">
          <div className="flex">
            <div className="text-[#007EEF] items-center">
              <span className="text-[#007EEF]"> Hi,</span>
              <span className="me-4 text-[#007EEF]">{username}</span>
            </div>
            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <div className="flex justify-center items-center">
                <div
                  style={{
                    background: 'linear-gradient(rgb(0, 126, 239), rgb(42, 228, 255))',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
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
                <div className="w-[220px]  absolute -right-[2px] mt-3 bg-white border border-gray-300 rounded shadow-lg">
                  <div className="self-stretch  bg-white rounded shadow flex-col justify-start items-start flex">
                    <div className="self-stretch h-[45px] flex-col justify-start items-start flex">
                      <div className="self-stretch px-4 py-1 justify-start items-center inline-flex border-b-2 border-gray-300">
                        <div className="grow shrink basis-0 py-1 flex-col justify-start items-start inline-flex ">
                          <div className="self-stretch text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none">
                            {username}
                          </div>
                          <div className="self-stretch text-black/opacity-60 text-xs font-normal font-['Manrope'] leading-[15px]">
                            {email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch py-1 flex-col justify-start items-start flex">
                      <div className="self-stretch px-4 py-2 justify-start items-center inline-flex border-b-2 border-gray-300" onClick={handleProfileClick}> 
                        <div className="grow shrink basis-0 text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none cursor-pointer flex" >
                         <div>
                         <FaUser/> 
                          </div>
                          <div className='ml-2'>
                          Profile
                            </div>  
                        </div>
                      </div>
                      <div className="self-stretch px-4 py-2 justify-start items-center inline-flex" onClick={handleLogout}>
                        <div className="grow shrink basis-0 text-black/opacity-90 text-[13px] font-normal font-['Manrope'] leading-none cursor-pointer flex text-red-600" >
                         <div>
                         <MdLogout/> 
                          </div>
                          <div className='ml-2'>
                          Log out
                            </div>  
                        </div>
                      </div>
                      {/* <div className="self-stretch px-4 py-1.5 justify-start items-center inline-flex">
                        
                        <button onClick={handleLogout} className="text-red-600 text-[13px] font-normal">
                          Log out
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {profileVisible && (
        <div ref={profileRef} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Profile onClose={() => setProfileVisible(false)} />
        </div>
      )}
      {opens && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval height={50} width={50} color="#00BFFF" secondaryColor="#f3f3f3" strokeWidth={2} strokeWidthSecondary={2} />
        </div>
      )}
    </>
  );
};

export default DashboardHeader;
