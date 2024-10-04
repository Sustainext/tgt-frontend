'use client'
import { useState, useRef, useEffect } from "react";

const Section13=({section9_3_7Ref})=>{
    const [content,setContent] = useState(
        `Our remuneration policies are designed to attract, retain, and motivate high-caliber Board members and executives. Compensation is based on industry benchmarks, individual performance, and the achievement of strategic objectives`
    )
    return (
        <>
        <div id="section9_3_7" ref={section9_3_7Ref} >
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
            9.3.7 Remuneration Policies & Process to Determine Remuneration
            </h3>
            <p className="text-[15px] text-[#344054] mb-2">
            Edit Statement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-2 `}
          rows={4}
        />
        
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Fixed pay & variable pay: 
            </p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Sign-on bonuses or recruitment incentive payments: 
            </p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Termination payments:
            </p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Clawbacks: 
            </p>
            <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Retirement benefits: 
            </p>

            <p className="text-[15px] text-[#344054] mb-4 font-semibold">
            Process to determine remuneration:
            </p>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Process for designing remuneration policies and for determining remuneration
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tempore pariatur qui. Unde commodi animi consequuntur voluptatum fuga, cum porro? Repellendus autem facere reprehenderit amet nostrum maiores sed illum reiciendis.</p>
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Independent highest governance body members or an independent remuneration committee Overseeing the process for determining remuneration
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tempore pariatur qui. Unde commodi animi consequuntur voluptatum fuga, cum porro? Repellendus autem facere reprehenderit amet nostrum maiores sed illum reiciendis.</p>
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            How the views of stakeholders (including shareholders) regarding remuneration are sought and taken into consideration
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tempore pariatur qui. Unde commodi animi consequuntur voluptatum fuga, cum porro? Repellendus autem facere reprehenderit amet nostrum maiores sed illum reiciendis.</p>
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Remuneration consultants involved in determining remuneration and whether they are independent of the organization, its highest governance body and senior executives
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tempore pariatur qui. Unde commodi animi consequuntur voluptatum fuga, cum porro? Repellendus autem facere reprehenderit amet nostrum maiores sed illum reiciendis.</p>
           
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
            Results of votes of stakeholders (including shareholders) on remuneration policies and proposals.
            </p>
            <p className="text-sm mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tempore pariatur qui. Unde commodi animi consequuntur voluptatum fuga, cum porro? Repellendus autem facere reprehenderit amet nostrum maiores sed illum reiciendis.</p>
           
        </div>
        </>
    )
}

export default Section13