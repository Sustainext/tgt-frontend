'use client'
import { useState, useRef, useEffect } from "react";


const Section17=({section13_5_2Ref})=>{
    const [content,setContent] = useState(
        `We invest in continuous learning and development opportunities for our employees. Our programs include skills training, leadership development, and transition assistance for those moving to new roles or retiring.`
    )
    
    return (
        <>
        <div id="section13_5_2" ref={section13_5_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.5.2 Programs for Upgrading Employee Skills and Transition Assistance Programs 
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Programs for upgrading employee skills : type of program and its scope 
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed exercitationem nemo ea eaque, in nesciunt aspernatur nam adipisci sunt magni facilis debitis vel provident iusto blanditiis unde est beatae esse.</p>
            <p className="text-[15px]  mb-2 font-semibold">
            Describe the programs provided to facilitate continued employability
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed exercitationem nemo ea eaque, in nesciunt aspernatur nam adipisci sunt magni facilis debitis vel provident iusto blanditiis unde est beatae esse.</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Describe assistance programs to manage career endings resulting from retirement or termination
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed exercitationem nemo ea eaque, in nesciunt aspernatur nam adipisci sunt magni facilis debitis vel provident iusto blanditiis unde est beatae esse.</p>
            
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per employee: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per female employee: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per male employee:
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours per employee category: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours   of male employee in category:
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours   of female employee in category:
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Average training hours   of non-binary employee in category: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of security personnel who have received formal training in the organisation: 
            </p>
            <p className="text-[15px]  mb-2 font-semibold">
            Percentage of security personnel who have received formal training from third-party organisation: 
            </p>

</div>
        </>
    )
}

export default Section17