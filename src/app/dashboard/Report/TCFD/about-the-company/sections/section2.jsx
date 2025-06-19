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

const Section2 = ({ section3_2Ref, data }) => {
  const dispatch = useDispatch();
  const aboutCompany = useSelector(selectAboutCompany);
  const editorRef = useRef(null);

  // Jodit Editor configuration
  const config = {
    readonly: false,
    placeholder: "Add a statement about company's operations",
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
    const autoFillContent = `<p>Our operations are structured to deliver efficient and sustainable outcomes across all business segments. We maintain operational excellence through [operational framework/methodology] and focus on continuous improvement in our processes.</p>

<p>Key operational areas include:</p>
<ul>
<li><strong>Manufacturing/Production:</strong> [Description of manufacturing processes, facilities, and capabilities]</li>
<li><strong>Supply Chain Management:</strong> [Description of supply chain operations and key suppliers]</li>
<li><strong>Distribution Network:</strong> [Description of distribution channels and logistics]</li>
<li><strong>Technology Infrastructure:</strong> [Description of key technologies and systems]</li>
</ul>

<p>Our operational footprint spans [geographic locations] with [number] facilities, including [types of facilities]. We employ [number] people globally and maintain partnerships with [number] key suppliers and vendors.</p>

<p>We are committed to operational sustainability, incorporating environmental and social considerations into our day-to-day operations while maintaining high standards of quality, safety, and efficiency.</p>`;
    
    dispatch(setKeyOperations(autoFillContent));
  };

  const handleEditorChange = (content) => {
    dispatch(setKeyOperations(content));
  };

  return (
    <>
      <div>
        <div id="section3_2" ref={section3_2Ref}>
          <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold pt-2">
            3.2 Operations
          </h3>
          
          <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex justify-between">
            <p className="text-[15px] text-[#667085] mb-2 mt-3">
              Add a statement about company's operations
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
              value={aboutCompany.keyOperations}
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

export default Section2;