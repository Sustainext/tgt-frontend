"use client";
import { useState, useRef, useEffect } from "react";
import CommunityTable from "../table";
import CommunityTable2 from "../table2";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommunityEngagementStatement,
  setImpactAssessment,
} from "../../../../../../lib/redux/features/ESGSlice/screen14Slice";

const Section1 = ({ section14_1Ref, data }) => {
  const community_engagement_statement = useSelector(
    (state) => state.screen14Slice.community_engagement_statement
  );
  const impact_assessment = useSelector(
    (state) => state.screen14Slice.impact_assessment
  );
  const dispatch = useDispatch();
  const loadContentStatement = () => {
    dispatch(
      setCommunityEngagementStatement(
        `Our commitment to community engagement is integral to our business strategy and operational philosophy. We recognize the importance of fostering strong, positive relationships with the communities where we operate. This approach not only enhances our social license to operate but also contributes to the overall well-being and development of these communities.`
      )
    );
  };

  const handleEditorChangeStatement = (e) => {
    dispatch(setCommunityEngagementStatement(e.target.value));
  };

  const loadContentImpact = () => {
    dispatch(
      setImpactAssessment(
        `We conduct comprehensive social impact assessments to understand the potential effects of our operations on local communities. These assessments help us identify both positive and negative impacts, enabling us to implement mitigation measures where necessary and enhance beneficial outcomes.`
      )
    );
  };

  const handleEditorChangeImpact = (e) => {
    dispatch(setImpactAssessment(e.target.value));
  };
  const TableData = data["413_1a_analyse"] ? data["413_1a_analyse"] : [];
  return (
    <>
      <div ref={section14_1Ref} id="section14_1">
        <div>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            14.1 Community Engagement
          </h3>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Add statement about company’s community engagement
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadContentStatement}
            >
              {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>
          <textarea
            onChange={handleEditorChangeStatement}
            value={community_engagement_statement}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
        </div>

        <div className="shadow-md rounded-md mb-4">
          <CommunityTable data={TableData} />
        </div>
        <div>
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
              Impact Assessment
            </p>
            <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadContentImpact}
            >
              {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button>
          </div>
          <textarea
            onChange={handleEditorChangeImpact}
            value={impact_assessment}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />
        </div>
        <div className="shadow-md rounded-md mb-4">
          <CommunityTable2
            data={
              data["413_2a"]
                ? data["413_2a"].data
                  ? data["413_2a"].data
                  : []
                : []
            }
          />
        </div>
      </div>
    </>
  );
};

export default Section1;
