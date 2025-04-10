'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MdVpnKey, MdKeyboardBackspace } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import PasswordChecklist from 'react-password-checklist';
import { useRouter } from 'next/navigation';
import 'react-tooltip/dist/react-tooltip.css';
import axiosInstance from "@/app/utils/axiosMiddleware";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CryptoJS from "crypto-js";
const ClientPasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [conshowPassword, setConshowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassVariable, setConfirmPassVariable] = useState('');;
  const [messageColor, setMessageColor] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isResetenabled,setResetenabled]=useState(false)
  const router = useRouter();
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
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordCon = () => setConshowPassword((show) => !show);

  const confirmPassword = (event) => {
    const val = event.target.value;
    setConfirmPassVariable(val)
    if (password === '' || val==='') {
      setConfirmPass('');
    }
   else if (password === val) {
    if (!validatePassword(password)) {
      setConfirmPass('Password does not meet the required criteria.');
      setMessageColor('text-red-500');
      setResetenabled(true)
    }
    else{
      setConfirmPass('New Password and Confirm Password are matching');
      setMessageColor('text-green-500');
      setResetenabled(false)
    }
      
    } else {
      setConfirmPass('New Password and Confirm Password are not matching');
      setMessageColor('text-red-500');
      setResetenabled(true)
      setResetenabled(true)
    }
  };
  const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setConfirmPass('Password does not meet the required criteria.');
      setMessageColor('text-red-500');
      setResetenabled(true)
      return;
    }
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

  const handleLogout = () => {
    localStorage.clear()
    router.push('/');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-[125vh] grid place-items-center bg-[#f2f2f2]">
      <div className="bg-white w-80 rounded-md">
        <div className="w-12 h-12 bg-purple-50 rounded-full mx-auto mt-8">
          <MdVpnKey className="mx-auto py-2" size={48} />
        </div>
        {success ? (
          <div>
            <p className="text-center mb-5">Your password has been updated</p>
            <div onClick={handleLogout}>
              <p className="text-center mb-5 cursor-pointer text-sm flex items-center justify-center">
                <MdKeyboardBackspace className="mr-1" /> Back to log in
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-2">
              <h2 className="text-center text-lg font-bold leading-9 tracking-tight text-gray-900">
                Reset your password
              </h2>
              <p className="text-center text-sm">
                Your new password must be different to previously used password
              </p>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm justify-center px-3 py-2 lg:px-3">
              <form className="space-y-6" onSubmit={handleSetPassword}>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm" id="app-title">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => {setPassword(e.target.value)
                        if (e.target.value === '' || confirmPassVariable==='') {
                          setConfirmPass('');
                        }
                        else if (confirmPassVariable === e.target.value) {
                          if (!validatePassword(e.target.value)) {
                            setConfirmPass('Password does not meet the required criteria.');
                            setMessageColor('text-red-500');
                            setResetenabled(true)
                          }
                          else{
                            setConfirmPass('New Password and Confirm Password are matching');
                          setMessageColor('text-green-500');
                          setResetenabled(false)
                          }
                          
                        } else {
                          setConfirmPass('New Password and Confirm Password are not matching');
                          setMessageColor('text-red-500');
                          setResetenabled(true)
                        }
                      }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={handleClickShowPassword}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>
                </div>
                <ReactTooltip
                  anchorId="app-title"
                  place="right"
                  content={
                    <PasswordChecklist
                      rules={['number', 'specialChar', 'capital', 'minLength']}
                      minLength={8}
                      value={password}
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
                <div>
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      id="password2"
                      name="password2"
                      type={conshowPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={confirmPassword}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={handleClickShowPasswordCon}>
                        {conshowPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={messageColor}>{confirmPass}</div>
                <div>
                  <button
                    type="submit"
                    disabled={isResetenabled}
                    className={`flex w-full justify-center ${isResetenabled?'opacity-40 cursor-not-allowed':'cursor-pointer'} rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-r from-[#364161] to-[#06081f] hover:from-[#06081f] hover:to-[#364161] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {loading ? 'Please wait...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <Link href="/">
                <p className="text-center mb-5 text-sm flex items-center justify-center">
                  <MdKeyboardBackspace className="mr-1" /> Back to log in
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPasswordReset;