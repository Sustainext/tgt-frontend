"use client";
import { useState, useRef, useEffect } from "react";
import CommunityTable from "../table";
import CommunityTable2 from "../table2"
const Section1 = ({ section14_1Ref }) => {
  const [content, setContent] = useState(
    `Our commitment to community engagement is integral to our business strategy and operational philosophy. We recognize the importance of fostering strong, positive relationships with the communities where we operate. This approach not only enhances our social license to operate but also contributes to the overall well-being and development of these communities.  `
  );
  const [content2, setContent2] = useState(
    `We conduct comprehensive social impact assessments to understand the potential effects of our operations on local communities. These assessments help us identify both positive and negative impacts, enabling us to implement mitigation measures where necessary and enhance beneficial outcomes. `
  );
  return (
    <>
      <div ref={section14_1Ref} id="section14_1">
        <div>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          14.1 Community Engagement
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">Edit data</p>
        <textarea
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        </div>
    
        <div className="shadow-md rounded-md mb-4">
            <CommunityTable/>
        </div>
        <div>
        <p className="text-[15px] text-[#344054] mb-2">Impact Assessment </p>
        <textarea
          value={content2}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer  mt-2 w-full mb-4 `}
          rows={4}
        />
        </div>
        <div className="shadow-md rounded-md mb-4">
          <CommunityTable2/>
        </div>
      </div>
    </>
  );
};

export default Section1;
