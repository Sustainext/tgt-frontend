"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setViolationOfRights } from "../../../../../../lib/redux/features/ESGSlice/screen14Slice";

const Section3 = ({ section14_1_2Ref, data,orgName,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With'?'14.1.2':'14.1.1',
  sectionTitle = 'Incidents of Violation of Rights of Indigenous People',
  sectionOrder = 14,
 }) => {
 

  const violation_rights = useSelector(
    (state) => state.screen14Slice.violation_rights
  );
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setViolationOfRights(
        `At ${orgName?orgName:'[Company Name]'} , we are dedicated to supporting our people, ensuring their well-being, and promoting a positive and inclusive workplace culture. We believe that our commitment to our employees is key to our long-term success and sustainability.`
      )
    );
  };

  const handleEditorChange = (e) => {
    dispatch(setViolationOfRights(e.target.value));
  };

  return (
    <>
        <div ref={section14_1_2Ref} id="section14_1_2">
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
       {sectionNumber} {sectionTitle}
        </h3>
        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
            <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s policy on violation of rights of indigenous people
            </p>
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
            value={violation_rights}
            className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
            rows={4}
          />

          <p className="text-[15px] text-[#344054] font-semibold mb-2">
          Details about the Incident being reviewed by the organization
          </p>
          <p className="text-sm mb-4">
           {data['411_1b_status']?data['411_1b_status'].length>0?data['411_1b_status'][0]?.Q1 || 'No Data available':'No Data available':'No Data available'}
          </p>
          <p className="text-[15px] text-[#344054] font-semibold mb-2">
          Remediation plans implemented
          </p>
          <p className="text-sm mb-4">
          {data['411_1b_status']?data['411_1b_status'].length>0?data['411_1b_status'][0]?.Q2 || 'No Data available':'No Data available':'No Data available'}
         </p>
          <p className="text-[15px] text-[#344054] font-semibold mb-2">
          Remediation plans that have been implemented, with results reviewed through routine internal management review process
          </p>
          <p className="text-sm mb-4">
          {data['411_1b_status']?data['411_1b_status'].length>0?data['411_1b_status'][0]?.Q3 || 'No Data available':'No Data available':'No Data available'}
         
          </p>
          <p className="text-[15px] text-[#344054] font-semibold mb-2">
          List which Incidents are no longer subject to action
          </p>
          <p className="text-sm mb-4">
          {data['411_1b_status']?data['411_1b_status'].length>0?data['411_1b_status'][0]?.Q4 || 'No Data available':'No Data available':'No Data available'}
         
          </p>
          <p className="text-[15px] text-[#344054] font-semibold mb-2">
          Total number of incident violations involving the rights of indigenous peoples
          </p>
          <p className="text-sm mb-4">
          {data['411_1a_incidents']?data['411_1a_incidents'].length>0?data['411_1a_incidents'][0]?.Q1=='No'?'No':data['411_1a_incidents'][0]?.Q2 || 'No Data available':'No Data available':'No Data available'}
         
          </p>
      </div>
    </>
  );
};

export default Section3;
