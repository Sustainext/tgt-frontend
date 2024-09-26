'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section11=({section13_3Ref})=>{
    const [content,setContent] = useState(
        `We have strict policies and procedures in place to prevent child labor. Any incidents are thoroughly investigated, and corrective actions are implemented to prevent recurrence. `
    )
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
<p className="text-[15px] text-[#344054] mb-2">
            Edit Data
            </p>
            <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-neutral-600 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
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