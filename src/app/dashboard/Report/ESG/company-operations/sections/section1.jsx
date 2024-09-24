

"use client";
import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1=()=>{
    return (
        <>
        <div>
              <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
                2. About the company and operations
              </h3>
            </div>
            <p className="text-[15px] text-[#344054] mb-2">Edit Statement</p>
            <div className="mb-6">
              <JoditEditor
              // ref={editor}
              // value={content}
              // config={config}
              // tabIndex={1}
              // onBlur={handleEditorChange}
              />
            </div>
        </>
    )
}

export default Section1