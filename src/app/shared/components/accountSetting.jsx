"use client";
import React, { useState, useRef, useEffect } from "react";
import { AiOutlineEye,AiOutlineEyeInvisible } from "react-icons/ai";
import Select from  'react-select'
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { timeZones } from "../data/timezones";
import { Currency } from "../data/currency";
import PasswordChecklist from 'react-password-checklist';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { IoIosWarning } from "react-icons/io";
import CryptoJS from "crypto-js";
import axiosInstance from "../../utils/axiosMiddleware";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

  
  const currencies =  Currency.map((item) => ({
    value: item.currency,
    label: `${item.currency_name} (${item.currency})`,
  }));
  


  const updatedMultiSelectStyle = {
    control: (base) => ({
      ...base,
      padding: '4px 10px',
      minHeight: '40px',
      borderColor: '#d1d5db',
      borderRadius: '0.375rem',
      display: 'flex',
      alignItems: 'center',
    }),
  
    valueContainer: (base) => ({
      ...base,
      padding: '0',
      display: 'flex',
      alignItems: 'center',
    }),
  
    singleValue: (base) => ({
      ...base,
      backgroundColor: '#007eef0d',
      color: '#0057A5',
      padding: '4px 12px',
      borderRadius: '6px',
      fontWeight: '600',
      fontSize: '13px',
      display: 'inline-block',
      width: 'fit-content', // This ensures the background wraps tightly
      marginLeft: 0, // Prevents any spacing offset
    }),
  
    menu: (provided) => ({
      ...provided,
      position: 'relative',
      bottom: '100%',
      top: 0,
      zIndex: 1000,
    }),
  
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
    }),
  };



export default  function AccountSettings({setProfileVisible,backToMenu,setLoading}) {
    const [activeaccountTab, setActiveaccountTab] = useState('password');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [timezone, setTimezone] = useState(null);
    const[currentPass,setCurrentPass]=useState('')
    const [newPass,setNewPass]=useState('')
    const [confirmPass,setConfirmPass]=useState('')
  const [currency, setCurrency] = useState(null);
  const [language, setLanguage] = useState('English');
  const [showCurrpasswordError,setShowCurrpasswordError]=useState('')
  const [debouncedPassword, setDebouncedPassword] = useState('');
  const [confirmPassError, setConfirmPassError] = useState(false);
   const [isResetenabled,setResetenabled]=useState(false)
    const [messageColor, setMessageColor] = useState('');
    const [isCurrPassValid,setIsCurrPassValid]=useState(false)
    const [success,setSuccess]=useState(false)

    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token')?.replace(/"/g, "");
        }
        return '';
    };
    const token = getAuthToken();
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPassword(currentPass);
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [currentPass]);

  // Effect to check password after debounce
  useEffect(() => {
    if (debouncedPassword) {
      checkCurrPassword(debouncedPassword);
    }
  }, [debouncedPassword]);


  const checkCurrPassword = async (password) => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
      const response = await axiosInstance.post('/api/auth/verify-password/', { password: hashedPassword });
      if (response.status !== 200) {
        setShowCurrpasswordError(true);
        setResetenabled(false)
        setIsCurrPassValid(false)
      } else {
        setShowCurrpasswordError(false);
        setIsCurrPassValid(true)
      }
    } catch (error) {
      setShowCurrpasswordError(true);
      setIsCurrPassValid(false)
      setResetenabled(false)
      console.error(error);
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;

    return password.length >= minLength && 
           hasNumber.test(password) && 
           hasSpecialChar.test(password) && 
           hasUpperCase.test(password) && 
           hasLowerCase.test(password);
  };

  const confirmPassword = (event) => {
    const val = event.target.value;
    setConfirmPass(val)
    if (newPass === '' || val==='') {
      setConfirmPassError('');
      setMessageColor('')
    }
   else if (newPass === val) {
    if (!validatePassword(newPass)) {
        setConfirmPassError('Password does not meet the required criteria.');
        setMessageColor('text-red-500');
        setResetenabled(false)
    }
    else{
        setConfirmPassError('New Password and Confirm Password are matching');
        setMessageColor('text-green-500');
        setResetenabled(true)
    }
      
    } else {
        setConfirmPassError('New Password and Confirm Password are not matching');
        setMessageColor('text-red-500');
        setResetenabled(false)
    }
  };

    const handleSetPassword = async (e) => {
      e.preventDefault();
      if (!validatePassword(newPass)) {
        setConfirmPassError('Password does not meet the required criteria.');
        setMessageColor('text-red-500');
        setResetenabled(false)
        return;
      }
      const hashedPassword = CryptoJS.SHA256(newPass).toString(CryptoJS.enc.Hex);
      setLoading(true);
  
      const data = {
        password1: hashedPassword,
        password2: hashedPassword,
      };
  
      try {
        const response = await axiosInstance.post(
          `${process.env.BACKEND_API_URL}/api/auth/change_password/`,
          data,axiosConfig
        );
        if (response.status === 200) {
          setSuccess(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
  
    return (
      <div className="p-6 h-full">
        <div className=" md:hidden flex justify-between">
                <button onClick={backToMenu} className="mr-2 mb-5 text-2xl font-bold">
                      <IoArrowBackSharp className="w-7 h-7 mt-4 text-gray-500" />
                    </button>
                    <button
                    className="right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => {
                      setProfileVisible(false);
                    }}
                  >
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
        <div className="flex drop-shadow-lg">
          <h2 className="text-[18px] text-[#101828] font-semibold mb-1">
            Account Settings
          </h2>
          <button
                    className="hidden md:block absolute top-0 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => {
                      setProfileVisible(false);
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
        
        </div>
        <p className="text-[#667085] text-[14px] mb-4">
          Change Passwords, Language, Time zones and Currency associated with the account
        </p>

        {success?(
            <div className="p-3 flex justify-between bg-[#54b0541a] rounded-md">
                <div className="flex gap-2">
                    <IoIosCheckmarkCircle className="text-green-500 w-5 h-5 mt-0.5" /> 
                    <p className="text-sm mt-0.5">Password has been changed successfully</p>
                </div>
                <button
                    className="right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => {
                      setSuccess(false);
                    }}
                  >
                    <svg
                      className="w-4 h-4 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

            </div>
        ):(
            <div></div>
        )}
  
        {/* Tabs */}
        <div className="flex border-b mb-4 mt-8">
          <button
            className={`mr-6 pb-2 text-sm font-medium ${
              activeaccountTab === 'password'
                ? 'border-b-2 border-[#007EEF] text-[#007EEF]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveaccountTab('password')}
          >
            Change Password
          </button>
          <button
            className={`pb-2 text-sm font-medium ${
              activeaccountTab === 'regional'
                ? 'border-b-2 border-[#007EEF] text-[#007EEF]'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveaccountTab('regional')}
          >
            Regional Settings
          </button>
        </div>
  
        {/* Change Password Form */}
        {activeaccountTab === 'password' && (
          <form className="space-y-5 mt-6" onSubmit={handleSetPassword}>
            {/* Current password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Enter current password</label>
              <div className="relative mt-1">
                <input
                disabled={isCurrPassValid}
                required={true}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                  type={showCurrent ? 'text' : 'password'}
                  className={`w-full px-4 py-2 ${isCurrPassValid?'opacity-30':''} ${showCurrpasswordError?'border-red-500 focus:ring-red-500':'border-gray-300 focus:ring-blue-500'} border rounded-md  focus:outline-none focus:ring-1`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showCurrent ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {showCurrpasswordError?(<p className="text-xs flex gap-1 text-red-500 mt-2"><IoIosWarning className="w-3 h-3 mt-0.5" />Entered password do not match the accounts password</p>):(
                isCurrPassValid && (
                    <p className="text-xs flex gap-1 text-green-500 mt-2"><FaRegCheckCircle className="w-3 h-3 mt-0.5" />Current password is verified</p>
                )
              ) }
            </div>
  
            {/* New password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Enter new password</label>
              <div className="relative mt-1" id="app-title">
                <input
                required={true}
                value={newPass}
                onChange={(e) => {setNewPass(e.target.value)
                    if (e.target.value === '' || confirmPass==='') {
                      setConfirmPassError('');
                      setMessageColor('')
                    }
                    else if (confirmPass === e.target.value) {
                      if (!validatePassword(e.target.value)) {
                        setConfirmPassError('Password does not meet the required criteria.');
                        setMessageColor('text-red-500');
                        setResetenabled(false)
                      }
                      else{
                        setConfirmPassError('New Password and Confirm Password are matching');
                      setMessageColor('text-green-500');
                      setResetenabled(true)
                      }
                      
                    } else {
                        setConfirmPassError('New Password and Confirm Password are not matching');
                      setMessageColor('text-red-500');
                      setResetenabled(false)
                    }
                  }}
                  type={showNew ? 'text' : 'password'}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
                 <ReactTooltip
                                  anchorId="app-title"
                                  place="right"
                                  style={{
                                    backgroundColor: '#000000',
                                    boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                    borderRadius: "8px",
                                    zIndex: "100",
                                  }}
                                  content={
                                    <PasswordChecklist
                                      rules={['number', 'specialChar', 'capital', 'minLength']}
                                      minLength={8}
                                      value={newPass}
                                      iconSize={16}
                                      invalidColor="red"
                                      validColor="#4BCA81"
                                      style={{ fontSize: '14px' }}
                                      messages={{
                                        number: 'At least one number (0-9)',
                                        specialChar: 'At least one special character (Eg. @#%$)',
                                        capital: 'At least one uppercase & one lowercase letter',
                                        minLength: 'Minimum 8 characters',
                                      }}
                                    />
                                  }
                                />
              </div>
            </div>
  
            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Confirm new password</label>
              <div className="relative mt-1">
                <input
                required={true}
                value={confirmPass}
                onChange={confirmPassword}
                  type={showConfirm ? 'text' : 'password'}
                  className={`w-full px-4 py-2 border rounded-md  focus:outline-none focus:ring-1 ${messageColor=='text-red-500'?'border-red-500 focus:ring-red-500':'focus:ring-blue-500 border-gray-300'} `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              <p className={`text-xs flex gap-1 ${messageColor} mt-2`}>{messageColor=='text-red-500'?<IoIosWarning className="w-3 h-3 mt-0.5" />:messageColor=='text-green-500' && <FaRegCheckCircle className="w-3 h-3 mt-0.5" />}{confirmPassError}</p>
            </div>
  
            <button
              type="submit"
              disabled={!isResetenabled}
              className={`mt-2 hidden ${!isResetenabled?'opacity-40 cursor-not-allowed':'cursor-pointer'} md:block bg-[#007EEF] text-white px-6 py-2 rounded-md hover:bg-blue-500 text-sm`}
            >
              Change Account Password
            </button>

{/* mobile button */}
            <div className="block md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 z-50">
  <button
    type="submit"
    disabled={!isResetenabled}
    className={`w-full ${!isResetenabled?'opacity-40 cursor-not-allowed':'cursor-pointer'} bg-[#007EEF] text-white px-6 py-2 rounded-md hover:bg-blue-600 text-sm`}
  >
    Change Account Password
  </button>
</div>
          </form>
        )}
  
        {/* Regional Settings Placeholder */}
        {activeaccountTab === 'regional' && (
           <div className="space-y-6 max-w-md">
           {/* <div>
             <label className="block text-sm font-medium mb-1">Select Language</label>
             <select
               value={language}
               onChange={(e) => setLanguage(e.target.value)}
               className="w-full border px-3 py-2 rounded"
             >
               <option>English</option>
               <option>Spanish</option>
               <option>German</option>
               <option>French</option>
             </select>
           </div> */}

           <div>
             <label className="block text-sm font-medium mb-1">Select Timezone</label>
             {/* <div className="flex items-center mb-2">
               <input
                 type="checkbox"
                 checked={autoTimezone}
                 onChange={() => setAutoTimezone(!autoTimezone)}
                 className="mr-2"
               />
               <span className="text-sm text-gray-600">Set time zone automatically</span>
             </div> */}
             <Select
            //    isDisabled={autoTimezone}
               options={timeZones}
               value={timezone}
               onChange={setTimezone}
               placeholder="Select timezone..."
               styles={updatedMultiSelectStyle}
               closeMenuOnSelect={false}
               hideSelectedOptions={false}

             />
           </div>

           <button
              type="submit"
              className="mt-2 opacity-35 cursor-not-allowed bg-transparent text-[#344054] border border-gray-300 px-6 py-2 rounded-md hover:shadow-sm text-sm"
            >
              Change Timezone
            </button>

           <div>
             <label className="block text-sm font-medium mb-1">Select Currency</label>
             <Select
               options={currencies}
               value={currency}
               onChange={setCurrency}
               placeholder="Select currency..."
               styles={updatedMultiSelectStyle}
               closeMenuOnSelect={false}
               hideSelectedOptions={false}
             />
           </div>
           <button
              type="submit"
              className="mt-2 opacity-35 cursor-not-allowed bg-transparent text-[#344054] border border-gray-300 px-6 py-2 rounded-md hover:shadow-sm text-sm"
            >
              Change currency
            </button>
         </div>
        )}
      </div>
    );
  }