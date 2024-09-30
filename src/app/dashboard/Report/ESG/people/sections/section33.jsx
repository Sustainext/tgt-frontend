'use client'
import { useState, useRef, useEffect } from "react";


const Section33=({section13_8_2Ref})=>{
    const [content,setContent] = useState(
        `At [Company Name], we are dedicated to supporting our people, ensuring their well-being, and promoting a positive and inclusive workplace culture. We believe that our commitment to our employees is key to our long-term success and sustainability. `
    )
   
      
    
    return (
        <>
        <div id="section13_8_2" ref={section13_8_2Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
13.8.2 Incidents of Violation of Rights of Indigenous People
</h3>
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
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

export default Section33