'use client'
import { useState, useRef, useEffect } from "react";

const Section16=({section9_4_2Ref,data,
  sectionNumber = "9.4.2",
    sectionTitle = 'Membership Association',
    sectionOrder = 9,
})=>{
    const [content,setContent] = useState(
        `We actively participate in various industry associations and sustainability networks to stay informed of best practices, collaborate on common challenges, and advocate for sustainable development.Our membership included:`
    )
    const tableData = data["2_28_a"] ? Object.values(data["2_28_a"]) : "";
    return (
        <>
        <div id="section9_4_2" ref={section9_4_2Ref}>
        
            <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
           {sectionNumber} {sectionTitle}
            </h3>
            {/* <p className="text-sm mb-4">{content}</p> */}
            {data["2_28_a"] ? (
          <div className="shadow-md rounded-md mb-4">
            <div
              style={{ maxHeight: "400px", overflowY: "auto" }}
              className="mb-2"
            >
              <table className="w-full border border-gray-200 rounded-md overflow-hidden">
                <tbody>
                  {tableData?.map((rowData, rowIndex) => (
                    <tr key={rowIndex} className="text-[13px]">
                      {rowData.map((cellData, colIndex) => (
                        <td
                          key={colIndex}
                          className="border-t border-r border-gray-200 p-4 text-center"
                        >
                          {cellData}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-sm mb-4">No data available</p>
        )}
        
        </div>
        </>
    )
}

export default Section16