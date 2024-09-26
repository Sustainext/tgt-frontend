'use client'
import { useState, useRef, useEffect } from "react";


const Section1=()=>{
    const [content,setContent] = useState(
        `Our employees are our most valuable asset, and we are committed to creating a safe, inclusive, and supportive work environment. We aim to attract, develop, and retain top talent while fostering a culture of respect, diversity, and inclusion. This section outlines our management of people-related material topics, including employee welfare, labor management, diversity and inclusion, training and education, occupational health and safety, and collective bargaining.`
    )
    return (
        <>
        <div>
        <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        </div>
        </>
    )
}

export default Section1