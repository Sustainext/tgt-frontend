'use client'
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {setFreedomOfAssociationViews} from "../../../../../../lib/redux/features/ESGSlice/screen13Slice"

const Section30=({section13_7_2Ref,orgName,data})=>{

    const content = useSelector(state => state.screen13Slice.freedom_of_association_views);
    const dispatch = useDispatch();
    const loadContent = () => {
      dispatch(setFreedomOfAssociationViews(
       `We respect the rights of our employees to freedom of association and collective bargaining. We work to ensure that these rights are upheld across our operations and supply chain. At ${orgName ? orgName : "[Company name]"}`))
    }
  
    const handleEditorChange=(e)=>{
      dispatch(setFreedomOfAssociationViews(e.target.value))
    }
    const col1=[
        "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ",
       "Type of Operation ",
        "Countries or Geographic Areas ",
     
    ]
    const Tabledata1=data["407_1_analyse"]?data["407_1_analyse"]["operation_bargaining"].length>0?

    data["407_1_analyse"]["operation_bargaining"].map((val,index)=>{
        return (
            
          {
           "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":val["Operations in which workers' rights to exercise freedom of association or collective bargaining may be violated or at significant risk"],
            "Type of Operation ":val["Type of Operation"],
            "Countries or Geographic Areas ":val["Countries or Geographic Areas"],
        
        }
            
        )
    })
:[
  {
    "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"No data available",
            "Type of Operation ":"No data available",
            "Countries or Geographic Areas ":"No data available",
},
]:[
  {
   "Operations in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"No data available",
            "Type of Operation ":"No data available",
            "Countries or Geographic Areas ":"No data available",

},
]

    const col2=[
        "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ",
       "Type of Supplier",
        "Countries or Geographic Areas ",
     
    ]

    const Tabledata2=data["407_1_analyse"]?data["407_1_analyse"]["supplier_bargaining"].length>0?

    data["407_1_analyse"]["supplier_bargaining"].map((val,index)=>{
        return (
            
          {
           "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":val["Suppliers in which workers' rights to exercise freedom of association or collective bargaining may be violated or at significant risk"],
            "Type of Supplier":val["Type of Supplier"],
            "Countries or Geographic Areas ":val["Countries or Geographic Areas"],
        
        }
            
        )
    })
:[
  {
    "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"No data available",
            "Type of Supplier":"No data available",
            "Countries or Geographic Areas ":"No data available",
},
]:[
  {
  "Suppliers in which workers’ rights to exercise freedom of association or collective bargaining may be violated or at significant risk ":"No data available",
            "Type of Supplier":"No data available",
            "Countries or Geographic Areas ":"No data available",
},
]
      
    
    return (
        <>
        <div id="section13_7_2" ref={section13_7_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
13.7.1 Operations and Suppliers in Which the Right to Freedom of Association and Collective Bargaining May Be at Risk
</h3>
<div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">Add statement about company’s views on freedom of association and collective bargaining</p>
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
        <p className="text-[15px]  mb-2 font-semibold">Measures taken by the organization</p>
        {data["407_1b"]?data["407_1b"].length>0?(
          <p className="text-sm mb-4">{data["407_1b"][0].Q1?data["407_1b"][0].Q1:"No data available"}</p>
        ):(
          <p className="text-sm mb-4">No data available</p>
        ):""}

        <p className="text-[15px]  mb-2 font-semibold">
        Operations where workers' freedom of association or collective bargaining is at risk   
            </p>
            <div className="shadow-md rounded-md mb-4">
               <LeaveTable columns={col1} data={Tabledata1}/>
            </div>
            <p className="text-[15px]  mb-2 font-semibold">
            Suppliers in which the right to freedom of association or collective bargaining may be at risk 
            </p>
            <div className="shadow-md rounded-md mb-4">
            <LeaveTable columns={col2} data={Tabledata2}/>
            </div>
            

</div>
        </>
    )
}

export default Section30