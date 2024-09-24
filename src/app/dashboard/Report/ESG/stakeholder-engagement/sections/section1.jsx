'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';
import StakeholderTable from "../table";

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section1 =()=>{
    const [content,setContent] = useState(
        `Effective stakeholder engagement is vital to [Company Name]'s sustainability strategy and overall business success. We recognize that our actions impact a wide range of stakeholders, including employees, customers, suppliers, investors, local communities, and regulatory bodies`
    )
    return (

        <>
        <div>

        <p className="text-[15px] text-[#344054] mb-2">
            Edit Stakeholder Engagement
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
                6.1 Approach to Stakeholder Engagement
        </h3>

        <div className="text-sm mb-6">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Identification and Prioritization 
            </li>
           <p className="mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius voluptatibus saepe, nemo unde animi accusantium illo ex alias fugiat? Voluptas animi placeat ad quos commodi laborum incidunt facere corrupti natus.</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            Stakeholder Categories 
            </li>
            <p className="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quaerat debitis quia provident possimus nostrum, nobis, consequatur pariatur magnam quo iure minus suscipit vitae tempora ex qui? Fugiat, voluptatem ipsam.</p>
            </ul>  
        
        </div>

        <div className="mb-6">
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
        Approach to Stakeholder engagement.
        </p>
        <div className="shadow-md rounded-md">
        <StakeholderTable/>
        </div>
       
        </div>

        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
            We employ a variety of engagement methods tailored to the needs and preferences of different stakeholder groups.
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Engagement with stakeholders
            </li>
           <p className="mb-4 ml-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus ipsa ducimus, aperiam exercitationem fugit accusantium minus deleniti cum impedit reprehenderit maiores mollitia nihil, culpa est quisquam maxime rem voluptates consequuntur.</p>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold ml-4">
            Stakeholder’s Feedback
            </li>
            <p className="mb-2 ml-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus ipsa ducimus, aperiam exercitationem fugit accusantium minus deleniti cum impedit reprehenderit maiores mollitia nihil, culpa est quisquam maxime rem voluptates consequuntur.</p>
            </ul>  
        
        </div>
        </div>
        </>
    )
}

export default Section1