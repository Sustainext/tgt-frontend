"use client";
import React, { useState, useRef, useEffect } from "react";
import { RiUserSettingsLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector, useDispatch } from "react-redux";
import AvatarEditor from "react-avatar-editor";
import { FiEdit2 } from "react-icons/fi";
import { GoUpload } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import SearchableDepartmentDropdown from './Users/create-new-users/SearchableDepartmentDropdown'
import Select from 'react-select';
import { setdepartment, addNewDepartment,fetchInitialDepartments} from '../../lib/redux/features/roles-permissionsSlice'

const timezones = [
    { label: 'Abidjan, Ivory Coast (GMT +0:00)', value: 'GMT+0' },
    { label: 'Adak, Hawaii, United States (GMT -9:00)', value: 'GMT-9' },
    { label: 'Adelaide, Australia (GMT +10:30)', value: 'GMT+10:30' },
    { label: 'Aleppo, Syria (GMT +2:00)', value: 'GMT+2' },
    { label: 'Algiers, Algeria (GMT +1:00)', value: 'GMT+1' },
    { label: 'Almaty, Kazakhstan (GMT +6:00)', value: 'GMT+6' },
    // ... add more timezones as needed
  ];
  
  const currencies = [
    { label: 'INR (Rupees)', value: 'INR' },
    { label: 'USD (Dollars)', value: 'USD' },
    { label: 'EUR (Euros)', value: 'EUR' },
    { label: 'JPY (Yen)', value: 'JPY' },
    // ... add more currencies as needed
  ];


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
  

  


export default function SettingsPanel({
  activeTab,
  setActiveTab,
  setProfileVisible,
  userProfileData,
  email
}) {
  function ProfileSettings() {
   
    const dispatch=useDispatch();

    const [phone, setPhone] = useState(userProfileData.phone?userProfileData.phone:'');
    const [numberWithoutCountryCode, setnumberWithoutCountryCode] =
      useState("");
    const [firstName, setFirstName] = useState(userProfileData.firstname?userProfileData.firstname:'');
    const [lastName, setLastName] = useState(userProfileData.lastname?userProfileData.lastname:'');
    const [designation,setDesignation]=useState(userProfileData.designation?userProfileData.designation:'')
    const [description,setDescription]=useState(userProfileData.jobDescription?userProfileData.jobDescription:'')
    const department = useSelector((state) => state.roleprmission.department);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const editorRef = useRef();
    const menuRef = useRef(null);
    const [error,setError]=useState({
        image:''
    })

    useEffect(()=>{
        if(userProfileData.department){
            dispatch(setdepartment(userProfileData.department))
        }
    },[])

    useEffect(()=>{
    dispatch(fetchInitialDepartments());
    },[dispatch])
    useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setShowMenu(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [menuRef]);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
  if (file) {
    const maxSizeInBytes = 2 * 1024 * 1024; // 2GB in bytes

    if (file.size > maxSizeInBytes) {
      setError({image:'Image size should not exceed 2MB.'});
      return;
    }

    setImage(file);
    setShowEditor(true);
  }
    };

    const handleCropApply = () => {
      if (editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
        setPreview(canvas);
        setShowEditor(false);
        setShowMenu(false);
      }
    };

    const handleRemoveImage = () => {
      setImage(null);
      setPreview(null);
      setShowMenu(false);
    };

    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

    return (
      <div className="p-6">
        <div className="flex drop-shadow-lg">
          <h2 className="text-[18px] text-[#101828] font-semibold mb-1">
            Profile Settings
          </h2>
          <button
            className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

        <p className="text-[#667085] text-[14px] mb-6">
          Customize your account by adjusting personal, contact and job
          informations.
        </p>

        <div className="flex gap-8">
          <div className="relative inline-block mb-6 group">
            {/* Avatar Display */}
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800 border border-gray-300">
                {initials}
              </div>
            )}

            {/* Edit Icon */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="absolute bottom-1 right-1 bg-[#007EEF] text-white p-1.5 rounded-full hover:bg-blue-600 transition"
            >
              <FiEdit2 size={16} />
            </button>

            {/* Menu */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute left-24 top-0 bg-white border rounded shadow-md z-10 w-32"
              >
                <label className="flex items-center gap-2 px-3 py-2 text-sm text-[#344054] cursor-pointer hover:bg-blue-50">
                  <GoUpload /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  disabled={preview ? false : true}
                  onClick={handleRemoveImage}
                  className={`flex ${
                    preview ? "" : "opacity-25 cursor-not-allowed"
                  } items-center gap-2 px-3 py-2 text-sm text-[#344054] hover:bg-blue-50 w-full`}
                >
                  <RiDeleteBinLine /> Remove
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-[#344054]">
                User Role:
              </span>
              <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-md">
                {userProfileData.role?userProfileData.role:'Employee'}
              </span>
            </div>
            <div className="text-sm text-[#344054]">
              <span className="font-medium">Work Email:</span> {email}
            </div>
          </div>
        </div>

        <p className="text-sm text-red-500 mb-1">{error.image}</p>

        {/* Crop Modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
              <h3 className="text-lg font-semibold mb-4">Crop Picture</h3>
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={200}
                height={200}
                border={50}
                borderRadius={100}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 bg-transparent border text-[#727272] border-gray-400 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCropApply}
                  className="px-4 py-2 bg-[#007EEF] hover:bg-blue-600 text-white rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-medium text-[#344054">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e)=>{setFirstName(e.target.value)}}
              className="mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#344054">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e)=>{setLastName(e.target.value)}}
              className="mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-[#344054">
              Phone Number
            </label>
            <div className="mt-1 flex">
              <PhoneInput
                country={"in"} // Default to India (91)
                value={phone}
                onChange={(value, data) => {
                  setPhone(value);
                  const numberWithoutCountryCode = value.replace(
                    `${data.dialCode}`,
                    ""
                  );
                  setnumberWithoutCountryCode(numberWithoutCountryCode); // Now phone = only local number
                }}
                placeholder="Enter phone number"
                inputClass="width:100%"
                buttonClass="border-gray-300 rounded-l-md"
                dropdownClass="border-gray-300 shadow-lg"
                inputStyle={{
                  width: "100%",
                }}
                inputProps={{
                  required: true,
                }}
              />
            </div>

            {/* <div style={{ 
        '--PhoneInputCountryFlag-height': '16px',
        '--PhoneInputCountryFlag-width': '16px',
      }}>
        <PhoneInput
          international
          defaultCountry="IN"
          value={phone}
          onChange={setPhone}
          placeholder="Enter phone number"
          style={{
            width: '100%',
            height: '40px',
            paddingLeft: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline:'none',
            boxShadow:'none'
          }}
          className="no-focus-border"
        />
      </div> */}
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-[#344054">
              Department
            </label>
            {/* <select className="mt-1 w-full border text-[14px] border-gray-300 rounded-md p-2">
              <option selected>Science</option>
              <option>Engineering</option>
              <option>R&D</option>
            </select> */}
            <SearchableDepartmentDropdown />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-[#344054">
              Job Title
            </label>
            <input
              type="text"
              value={designation}
              onChange={(e)=>{setDesignation(e.target.value)}}
              className="mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[14px] font-medium text-[#344054">
              Job Description
              <span className="text-gray-500 text-[12px] ml-2">
      ({description.length}/140)
    </span>
            </label>
            <input
              type="text"
              maxLength={140}
              value={description}
              onChange={(e)=>{setDescription(e.target.value)}}
              className="mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-sm text-[#667085] mt-1">This message can be seen in the profile card by other users</p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 w-full md:w-auto"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  function AccountSettings() {
    const [activeaccountTab, setActiveaccountTab] = useState('password');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [timezone, setTimezone] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [language, setLanguage] = useState('English');
  
    return (
      <div className="p-6">
        <div className="flex drop-shadow-lg">
          <h2 className="text-[18px] text-[#101828] font-semibold mb-1">
            Account Settings
          </h2>
          <button
            className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
          <form className="space-y-5 mt-6">
            {/* Current password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Enter current password</label>
              <div className="relative mt-1">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showCurrent ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
  
            {/* New password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Enter new password</label>
              <div className="relative mt-1">
                <input
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
              </div>
            </div>
  
            {/* Confirm password */}
            <div>
              <label className="block text-sm font-medium text-[#344054]">Confirm new password</label>
              <div className="relative mt-1">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
  
            <button
              type="submit"
              className="mt-2 bg-[#007EEF] text-white px-6 py-2 rounded-md hover:bg-blue-600 text-sm"
            >
              Change Account Password
            </button>
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
               options={timezones}
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
              className="mt-2 bg-transparent text-[#344054] border border-gray-300 px-6 py-2 rounded-md hover:shadow-sm text-sm"
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
              className="mt-2 bg-transparent text-[#344054] border border-gray-300 px-6 py-2 rounded-md hover:shadow-sm text-sm"
            >
              Change currency
            </button>
         </div>
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "account":
        return <AccountSettings />;
      case "notifications":
        return (
          <div className="p-6 text-gray-500">
            Notification settings content goes here.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-6 mt-12">
      <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row w-[900px] h-[700px] table-scrollbar">
        {/* Sidebar */}
        <div className="md:w-[280px] border-b md:border-b-0 md:border-r p-6">
          <h2 className="text-[18px] text-[#252C32] font-semibold mb-4">
            Settings
          </h2>
          <div className="space-y-2 flex md:flex-col justify-between md:justify-start">
            <button
              className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
                activeTab === "profile"
                  ? "bg-blue-50 text-[#344054] font-medium"
                  : "text-gray-900"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <RiUserSettingsLine className="w-4 mt-0.5 h-4 mr-2" />
              Profile Settings
            </button>
            <button
              className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] ${
                activeTab === "account"
                  ? "bg-blue-50 text-[#344054] font-medium"
                  : "text-gray-900"
              }`}
              onClick={() => setActiveTab("account")}
            >
              <IoSettingsOutline className="w-4 mt-0.5 h-4 mr-2" />
              Account Settings
            </button>
            <button
              disabled={true}
              className={`w-full flex text-left px-3 py-2 rounded-lg text-[14px] cursor-not-allowed opacity-25 ${
                activeTab === "notifications"
                  ? "bg-blue-50 text-[#344054] font-medium"
                  : "text-gray-900"
              }`}
              //   onClick={() => setActiveTab('notifications')}
            >
              <IoMdNotificationsOutline className="w-4 mt-0.5 h-4 mr-2" />
              Notification Settings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
