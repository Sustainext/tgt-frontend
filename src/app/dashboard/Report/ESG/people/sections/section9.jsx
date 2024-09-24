'use client'
import { useState, useRef, useEffect } from "react";


const Section9=({section13_2_2Ref})=>{
    const [content,setContent] = useState(
        `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus, voluptates obcaecati velit fuga tempore laudantium consequuntur illo`
    )
    
    return (
        <>
        <div id="section13_2_2" ref={section13_2_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.2.2 Workers Who Are Not Employees
</h3>   

<p className="text-sm mb-4">We ensure that all workers, including those who are not direct employees, are treated fairly and have access to safe working conditions. This includes contractors, temporary workers, and subcontractors</p>

</div>
        </>
    )
}

export default Section9