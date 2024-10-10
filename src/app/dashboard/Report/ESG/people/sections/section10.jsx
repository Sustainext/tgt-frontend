'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";

const Section10=({section13_2_3Ref})=>{
    const [content,setContent] = useState(
        `We are committed to eradicating forced or compulsory labor from our operations and supply chain. We conduct regular audits and assessments to ensure compliance with our labor standards. `
    )
    const [operationTableColumns] = useState([
        "Operations considered to have significant risk for incidents of forced or compulsory labor", 
        "Type of Operation", 
        "Countries or Geographic Areas"
      ]);
    
      const [operationTableData] = useState([
        { 
          "Operations considered to have significant risk for incidents of forced or compulsory labor": "Operation 1", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Operations considered to have significant risk for incidents of forced or compulsory labor": "Operation 2", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);
    
      const [supplierTableColumns] = useState([
        "Suppliers considered to have significant risk for incidents of forced or compulsory labor", 
        "Type of Supplier", 
        "Countries or Geographic Areas"
      ]);
    
      const [supplierTableData] = useState([
        { 
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor": "Supplier 1", 
          "Type of Supplier": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Suppliers considered to have significant risk for incidents of forced or compulsory labor": "Supplier 2", 
          "Type of Supplier": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);
    
      
    
    
    return (
        <>
        <div id="section13_2_3" ref={section13_2_3Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.2.3 Forced or Compulsory Labour
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s position on forced / compulsory labor</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            // onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />

        <p className="text-[15px]  mb-2 font-semibold">
        Operations considered to have significant risk for incidents of forced or compulsary labor  
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={operationTableColumns} data={operationTableData} />
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of forced or compulsory labor 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={supplierTableColumns} data={supplierTableData} />
            </div>
            

</div>
        </>
    )
}

export default Section10