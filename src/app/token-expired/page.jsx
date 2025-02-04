'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';
import { MdKey } from "react-icons/md";
import Image from "next/image";
import { FcExpired } from "react-icons/fc";
import { PiWarningOctagonFill } from "react-icons/pi";
import { IoMdWarning } from "react-icons/io";

const TokenExpired = () => {
 

  return (
    <div className='min-h-[125vh] grid place-items-center bg-[#f2f2f2]'>
      <div className='bg-white px-10 py-16 rounded-md'>
      <>
        <IoMdWarning className='mx-auto py-2 text-yellow-400 w-20 h-20' />
            {/* <div className='w-16 h-16 bg-purple-50 rounded-full mx-auto'> */}
                {/* <FcExpired style={{height: '100%', width: '100%'}} className='mx-auto py-2 z-50 w-8 h-8'/> */}
            {/* <Image src={tokenImg} className="w-8 h-8" alt="token expired" /> */}
            {/* </div> */}
            <div className='mt-2'>
              <h5 className='text-center text-xl font-bold leading-9 tracking-tight text-gray-900'>
              The link has expired. Kindly contact the Administrator
              </h5>
              {/* <p className='text-center px-1 mt-2 text-sm'>
              
              </p> */}
            </div>
          </>
      </div>
    </div>
  );
};

export default TokenExpired;