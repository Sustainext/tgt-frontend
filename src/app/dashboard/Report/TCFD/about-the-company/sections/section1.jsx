"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import STARSVG from "../../../../../../../public/star.svg";
import {
  setCompanyOverview,
  selectAboutCompany,
} from "../../../../../../lib/redux/features/TCFDSlice/tcfdslice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ section3_1Ref, data, orgName }) => {
  const dispatch = useDispatch();
  const aboutCompany = useSelector(selectAboutCompany);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about your company's core business activities, sectors served, and key markets.",
    height: 300,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', '|',
      'align', '|',
      'undo', 'redo'
    ],
  };

  const loadAutoFillContent = () => {
    const autoFillContent = `<p>${orgName || '[Company Name]'} is a leading organization operating in [Industry/Sector]. We specialize in [core business activities] and serve customers across [key markets/regions]. Our business model is built on [key value propositions], and we are committed to delivering sustainable value to our stakeholders.</p>

<p>Our core business activities include:</p>
<ul>
<li>[Business Activity 1]</li>
<li>[Business Activity 2]</li>
<li>[Business Activity 3]</li>
</ul>

<p>We operate across [number] countries/regions, serving [customer segments] in sectors including [sector 1], [sector 2], and [sector 3]. Our strategic focus is on [strategic priorities] while maintaining our commitment to sustainable and responsible business practices.</p>`;
    
    dispatch(setCompanyOverview(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setCompanyOverview(content));
  };

  return (
    <>
      <div>
        <div id="section3_1" ref={section3_1Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
            3.1 Our Business
          </h3>
          
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about your company's core business activities, sectors served, and key markets.
            </p>
            {/* <button
              className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
              onClick={loadAutoFillContent}
            >
              <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
              Auto Fill
            </button> */}
          </div>

          <div className="mb-4">
            <JoditEditor
              ref={editorRef}
              value={aboutCompany.companyOverview}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;