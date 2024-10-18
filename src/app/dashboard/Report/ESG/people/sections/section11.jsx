'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setChildLaborPosition} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section11=({section13_3Ref})=>{
    
    const content = useSelector(state => state.screen13Slice.child_labor_position);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setChildLaborPosition(
       `We have strict policies and procedures in place to prevent child labor. Any incidents are thoroughly investigated, and corrective actions are implemented to prevent recurrence.`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setChildLaborPosition(e.target.value))
    }
    const [operationTableColumns] = useState([
        "Operations considered to have significant risk of young workers exposed to hazardous work ", 
        "Type of Operation", 
        "Countries or Geographic Areas"
      ]);
    
      const [operationTableData] = useState([
        { 
          "Operations considered to have significant risk of young workers exposed to hazardous work ": "Operation 1", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Operations considered to have significant risk of young workers exposed to hazardous work ": "Operation 2", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);

      const [childLaborTableColumns] = useState([
        "Operations considered to have significant risk of child labor ", 
        "Type of Operation", 
        "Countries or Geographic Areas"
      ]);
    
      const [childLaborTableData] = useState([
        { 
          "Operations considered to have significant risk of child labor ": "Operation 1", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Operations considered to have significant risk of child labor ": "Operation 2", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);

      const [supplierchildLaborTableColumns] = useState([
        "Operations considered to have significant risk of child labor ", 
        "Type of Operation", 
        "Countries or Geographic Areas"
      ]);
    
      const [supplierchildLaborTableData] = useState([
        { 
          "Operations considered to have significant risk of child labor ": "Supplier 1", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Operations considered to have significant risk of child labor ": "Supplier 2", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);

      const [supplierHazardousTableColumns] = useState([
        "Suppliers considered to have significant risk of young workers exposed to hazardous work ", 
        "Type of Operation", 
        "Countries or Geographic Areas"
      ]);
    
      const [supplierHazardousTableData] = useState([
        { 
          "Suppliers considered to have significant risk of young workers exposed to hazardous work ": "Supplier 1", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
        { 
          "Suppliers considered to have significant risk of young workers exposed to hazardous work ": "Supplier 2", 
          "Type of Operation": "", 
          "Countries or Geographic Areas": "" 
        },
      ]);

    return (
        <>
        <div id="section13_3" ref={section13_3Ref}>

<h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
13.3 Incidents of Child Labour
</h3>
<p className="text-[15px]  mb-2 font-semibold">
        Operations at significant risk for incidents of young workers exposed to hazardous work 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={operationTableColumns} data={operationTableData} />
            </div>
            <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s position on child labor</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
            <textarea
            onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />

        
            <p className="text-[15px]  mb-2 font-semibold">
            Operations considered to have significant risk of child labor
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={childLaborTableColumns} data={childLaborTableData} />
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of child labor
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={supplierchildLaborTableColumns} data={supplierchildLaborTableData} />
            </div>

            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers at significant risk for incidents of young workers exposed to hazardous work 
            </p>
            <div className="shadow-md rounded-md mb-4">
                <LeaveTable columns={supplierHazardousTableColumns} data={supplierHazardousTableData} />
            </div>
            

</div>
        </>
    )
}

export default Section11