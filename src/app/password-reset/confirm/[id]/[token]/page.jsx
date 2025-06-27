'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { IoArrowBack, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import PasswordChecklist from 'react-password-checklist';
import 'react-tooltip/dist/react-tooltip.css';
import { MdKey } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [conshowPassword, setConshowPassword] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [password, setPassword] = useState('');
   const [confirmPassVariable, setConfirmPassVariable] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); 
   const [isResetenabled,setResetenabled]=useState(false)

  const { id, token } = useParams(); 

  useEffect(() => {
    setIsClient(true); 
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
      uid: id,
      token,
      new_password1: hashedPassword,
      new_password2: hashedPassword,
    };

    try {
      const response = await axios.post(
        `${process.env.BACKEND_API_URL}/api/auth/password/reset/confirm/`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSuccess(true);

      }
    } catch (error) {
      // Extract error messages from the backend response
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.non_field_errors 
          ? error.response.data.non_field_errors[0] 
          : "Oops, something went wrong";
  
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {

    return null;
  }

  return (
  <>
    <ToastContainer style={{ fontSize: "12px" }} />
    <div className='min-h-screen grid place-items-center bg-[#f2f2f2]'>
      <div className='bg-white w-80 rounded-md'>
        <div className='w-12 h-12 bg-purple-50 rounded-full mx-auto mt-8'>
        <MdKey style={{height: '100%', width: '100%'}} className='mx-auto py-2 z-50 text-black w-8 h-8' />
        </div>
        {success ? (
          <div>
            <p className='text-center mb-5'>Your password has been updated</p>
            <div>
              <Link href='/'>
                <p className='text-center mb-5 text-sm flex items-center justify-center'>
                  <IoArrowBack className="mr-1" /> Back to log in
                </p>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className='mt-2'>
              <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                Set new password
              </h2>
              <p className='text-center text-sm'>
                Your new password must be different to previously used password
              </p>
            </div>
            <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm justify-center px-3 py-2 lg:px-3'>
              <form className='space-y-6' onSubmit={handleSetPassword}>
                <div>
                  <label  className='block text-sm font-medium leading-6 text-gray-900'>
                    Password
                  </label>
                  <div className='relative mt-1 rounded-md shadow-sm' id='app-title'>
                    <input
                      id='password'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      required
                      className='block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>
                            <ReactTooltip
                  anchorId='app-title'
                 place="top"
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
                      value={password}
                      iconSize={16}
                      invalidColor='red'
                      validColor='#4BCA81'
                      style={{ fontSize: '15px', }}
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
            
                <div>
                  <label htmlFor='password2' className='block text-sm font-medium leading-6 text-gray-900'>
                    Confirm Password
                  </label>
                  <div className='relative mt-2 rounded-md shadow-sm'>
                    <input
                      id='password2'
                      name='password2'
                      type={conshowPassword ? 'text' : 'password'}
                      autoComplete='new-password'
                      required
                      className='block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      onChange={confirmPassword}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button type="button" onClick={handleClickShowPasswordCon}>
                        {conshowPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={messageColor}>{confirmPass}</div>
                <div>
                  <button
                    type='submit'
                    disabled={isResetenabled}
                    className={`flex w-full justify-center ${isResetenabled?'opacity-40 cursor-not-allowed':'cursor-pointer'} rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-r from-[#364161] to-[#06081f] hover:from-[#06081f] hover:to-[#364161] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {loading ? 'Please wait...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
            <div>
              <Link href='/'>
                <p className='text-center mb-5 text-sm flex items-center justify-center'>
                  <IoArrowBack className="mr-1" /> Back to log in
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default PasswordReset;
