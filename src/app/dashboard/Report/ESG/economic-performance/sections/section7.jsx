'use client'
import { useState, useRef, useEffect } from "react";


const Section7=({section11_2_2Ref})=>{
    const [content,setContent] = useState(
        ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, ipsum. In fugit cum, vitae sit amet veniam recusandae praesentium expedita dicta. Quidem, corporis atque nihil ipsa labore beatae accusamus deleniti?`
    )
  
    return (
        <>
        <div id="section11_2_2" ref={section11_2_2Ref} >
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.2.2 Indirect Economic impacts
</h3>
       <p className="text-sm mb-4">{content}</p>
        </div>
        </>
    )
}

export default Section7