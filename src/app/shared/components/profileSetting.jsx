'use client';
import React, { useState, useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useSelector, useDispatch } from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { FiEdit2 } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoUpload } from 'react-icons/go';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoArrowBackSharp } from 'react-icons/io5';
import axiosInstance from '../../utils/axiosMiddleware';
import SearchableDepartmentDropdown from '../../dashboard/Users/create-new-users/SearchableDepartmentDropdown';
import {
  setdepartment,
  addNewDepartment,
  fetchInitialDepartments,
} from '../../../lib/redux/features/roles-permissionsSlice';
import { MaskedEmail } from './MaskedPIIField';
import { decryptPII } from '../../utils/fernetDecryption';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ProfileSettings({
  userProfileData,
  email,
  setRefresh,
  setProfileVisible,
  backToMenu,
  setLoading,
}) {
  const dispatch = useDispatch();
  function capitalizeName(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  const [phone, setPhone] = useState(
    userProfileData.phone ? decryptPII(userProfileData.phone) : ''
  );
  const [showPhone, setShowPhone] = useState(false);
  const [numberWithoutCountryCode, setnumberWithoutCountryCode] = useState('');
  const [firstName, setFirstName] = useState(
    capitalizeName(userProfileData.firstname ? userProfileData.firstname : '')
  );
  const [lastName, setLastName] = useState(
    capitalizeName(userProfileData.lastname ? userProfileData.lastname : '')
  );
  const [designation, setDesignation] = useState(userProfileData.designation);
  const [description, setDescription] = useState(
    userProfileData.jobDescription
  );
  const department = useSelector((state) => state.roleprmission.department);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    userProfileData.profile_pic ? userProfileData.profile_pic : null
  );
  const [showMenu, setShowMenu] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const editorRef = useRef();
  const menuRef = useRef(null);
  const [error, setError] = useState({
    image: '',
  });
  useEffect(() => {
    if (userProfileData.department) {
      dispatch(setdepartment(userProfileData.department));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchInitialDepartments());
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let data = new FormData();
      if (
        (preview !== null &&
          userProfileData?.profile_pic === null &&
          image !== null) ||
        (preview === null &&
          userProfileData?.profile_pic !== null &&
          image === null) ||
        (preview !== null &&
          userProfileData?.profile_pic !== null &&
          image !== null)
      ) {
        data.append('profile_pic', image ? image : '');
      }
      data.append('first_name', capitalizeName(firstName));
      data.append('last_name', capitalizeName(lastName));
      data.append('designation', designation);
      data.append('department', department);
      data.append('job_description', description);
      data.append('phone', phone);
      const response = await axiosInstance.put(
        `/api/auth/user_profile/?partial=true`,
        data
      );

      if (response.status == 200) {
        setLoading(false);
        setRefresh((pre) => !pre);
        toast.success('Changes has been updated to the user profile');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error updating profile');
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setError({ image: '' });
    const file = e.target.files[0];
    if (file) {
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        setError({ image: 'Image size should not exceed 2MB.' });
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

  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <div className='p-6 h-full'>
      <div className='md:hidden flex justify-between'>
        <button onClick={backToMenu} className='mr-2 mb-5 text-2xl font-bold'>
          <IoArrowBackSharp className='w-7 h-7 mt-4 text-gray-500' />
        </button>
        <button
          className='right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
          onClick={() => {
            setProfileVisible(false);
          }}
        >
          <svg
            className='w-7 h-7'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      <div className='flex drop-shadow-lg'>
        <h2 className='text-[18px] text-[#101828] font-semibold mb-1'>
          Profile Settings
        </h2>
        <button
          className='hidden md:block absolute top-0 right-2 text-gray-500 hover:text-gray-700 focus:outline-none'
          onClick={() => {
            setProfileVisible(false);
          }}
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>

      <p className='text-[#667085] text-[14px] mb-6'>
        Customize your account by adjusting personal, contact and job
        informations.
      </p>

      <div className='flex gap-8'>
        <div className='relative inline-block mb-6 group'>
          {/* Avatar Display */}
          {preview ? (
            <img
              src={preview}
              alt='Profile'
              className='w-24 h-24 rounded-full object-cover border border-gray-300'
            />
          ) : (
            <div className='w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-800 border border-gray-300'>
              {initials}
            </div>
          )}

          {/* Edit Icon */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className='absolute bottom-1 right-1 bg-[#007EEF] text-white p-1.5 rounded-full hover:bg-blue-600 transition'
          >
            <FiEdit2 size={16} />
          </button>

          {/* Menu */}
          {showMenu && (
            <div
              ref={menuRef}
              className='absolute left-24 top-0 bg-white border rounded shadow-md z-10 w-32'
            >
              <label className='flex items-center gap-2 px-3 py-2 text-sm text-[#344054] cursor-pointer hover:bg-blue-50'>
                <GoUpload /> Upload
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />
              </label>
              <button
                disabled={preview ? false : true}
                onClick={handleRemoveImage}
                className={`flex ${
                  preview ? '' : 'opacity-25 cursor-not-allowed'
                } items-center gap-2 px-3 py-2 text-sm text-[#344054] hover:bg-blue-50 w-full`}
              >
                <RiDeleteBinLine /> Remove
              </button>
            </div>
          )}
        </div>

        <div className='mt-4 space-y-2'>
          <div className='flex items-center space-x-2'>
            <span className='text-sm font-medium text-[#344054]'>
              User Role:
            </span>
            <span className='bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-md'>
              {userProfileData.role ? userProfileData.role : 'Employee'}
            </span>
          </div>
          <div className='text-sm text-[#344054]'>
            <span className='font-medium'>Work Email:</span>{' '}
            <MaskedEmail email={email} className='inline' />
          </div>
        </div>
      </div>

      <p className='text-sm text-red-500 mb-1'>{error.image}</p>

      {/* Crop Modal */}
      {showEditor && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded shadow-lg w-[400px]'>
            <h3 className='text-lg font-semibold mb-4'>Crop Picture</h3>
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
            <div className='mt-4 flex justify-end gap-2'>
              <button
                onClick={() => setShowEditor(false)}
                className='px-4 py-2 bg-transparent border text-[#727272] border-gray-400 rounded'
              >
                Cancel
              </button>
              <button
                onClick={handleCropApply}
                className='px-4 py-2 bg-[#007EEF] hover:bg-blue-600 text-white rounded'
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <form
        className='grid grid-cols-1 md:grid-cols-2 gap-4'
        onSubmit={handleSubmit}
      >
        <div>
          <label className='block text-[14px] font-medium text-[#344054'>
            First Name
          </label>
          <input
            type='text'
            required={true}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            className='mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-[14px] font-medium text-[#344054'>
            Last Name
          </label>
          <input
            type='text'
            required={true}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            className='mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-[14px] font-medium text-[#344054'>
            Phone Number
          </label>
          <div className='mt-1 flex relative'>
            <PhoneInput
              country={'in'} // Default to India (91)
              value={phone}
              onChange={(value) => {
                setPhone(`+` + value);
              }}
              placeholder='Enter phone number'
              inputClass='width:100%'
              buttonClass='border-gray-300 rounded-l-md'
              dropdownClass='border-gray-300 shadow-lg'
              inputStyle={{
                width: '100%',
                filter: showPhone ? 'none' : 'blur(4px)',
                transition: 'filter 0.3s ease',
              }}
              inputProps={{
                required: true,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPhone(!showPhone)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
              title={showPhone ? "Hide phone number" : "Show phone number"}
            >
              {showPhone ? (
                <AiOutlineEyeInvisible className="w-4 h-4" />
              ) : (
                <AiOutlineEye className="w-4 h-4" />
              )}
            </button>
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

        <div className='md:col-span-2'>
          <label className='block text-[14px] font-medium text-[#344054'>
            Department
          </label>
          {/* <select className="mt-1 w-full border text-[14px] border-gray-300 rounded-md p-2">
              <option selected>Science</option>
              <option>Engineering</option>
              <option>R&D</option>
            </select> */}
          <SearchableDepartmentDropdown />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-[14px] font-medium text-[#344054'>
            Job Title
          </label>
          <input
            type='text'
            required={true}
            value={designation}
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
            className='mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2'
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-[14px] font-medium text-[#344054'>
            Job Description
            <span className='text-gray-500 text-[12px] ml-2'>
              ({description?.length}/140)
            </span>
          </label>
          <input
            type='text'
            maxLength={140}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className='mt-1 text-[14px] w-full border border-gray-300 rounded-md p-2'
          />
          <p className='text-sm text-[#667085] mt-1'>
            This message can be seen in the profile card by other users
          </p>
        </div>

        <div className='hidden md:block md:col-span-2'>
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 md:py-1.5 rounded-md hover:bg-blue-600 w-full md:w-auto'
          >
            Save changes
          </button>
        </div>
        <div className='block md:hidden fixed bottom-0 left-0 w-full bg-white p-4 border-t border-gray-200 z-50'>
          <button
            type='submit'
            className='w-full bg-[#007EEF] text-white px-6 py-2 rounded-md hover:bg-blue-600 text-sm'
          >
            Save changes
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}
