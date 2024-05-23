'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/auth';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(email, password);
      
    } catch (e) {
      console.log('Could not login');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <main>
        <div
          className="min-h-screen bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/Home/authbg.webp')",
          }}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2  h-screen">
            <div className="mb-4">
              {/* Logo placeholder */}
              <img
                src="https://sustainextstorage1.blob.core.windows.net/sustainext-frontend-assets/Home/sustainext-new-white-logo.webp"
                alt="Logo"
                className="h-28 w-auto"
              />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-16 max-w-md w-full my-10 mx-auto h-[540px] ">
              <h2 className="text-left text-2xl font-extrabold text-gray-900">
                Welcome back
              </h2>
              <p className="text-sm mb-6">Login to sustainable solutions</p>
              <form className="" action="#" method="POST">
                <div className="mb-4">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500
                text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  {/* <Link href="/dashboard"> */}
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="group relative flex w-full justify-center rounded-md  bg-gradient-to-r from-[#007EEF] to-[#2AE4FF] hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#6adf23] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Login
                    </button>
                  {/* </Link> */}
                </div>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm">
                  Don't have an account?
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
