"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessactivities } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Businessactivities = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.business_activities
  );
  const dispatch = useDispatch();

const loadContent = () => {
  dispatch(
    setBusinessactivities(
     `<p style="margin-bottom: 8px;">Its core business activities include:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Providing consumer electronics and home appliances</li>
  <li style="margin-bottom: 5px;">Delivering logistics and supply chain management services</li>
  <li style="margin-bottom: 5px;">Supplying after-sales technical support and repair services</li>
</ul>

<p>
The company operates in Canada, the United States, and the United Kingdom, and sources
products from China, Bangladesh, and Indonesia, with an annual import volume of
approximately $75 million CAD in electronic components, finished goods, and packaging
materials. It complies with all relevant trade and regulatory requirements, ensuring responsible
and ethical sourcing.
</p>`
    )
  );
};

  const config = {
    enter: "BR", // Or customize behavior on Enter key
    cleanHTML: true,
    enablePasteHTMLFilter: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color: "#667085",
    },
    allowResizeY: false,
    defaultActionOnPaste: "insert_clear_html",
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "align",
      "outdent",
      "indent",
      "ul",
      "ol",
      "paragraph",
      "link",
      "table",
      "undo",
      "redo",
      "hr",
      "fontsize",
      "selectall",
    ],
    removeButtons: [
      "fullsize",
      "preview",
      "source",
      "print",
      "about",
      "find",
      "changeMode",
      "paintFormat",
      "image",
      "brush",
      "font",
    ],
  };

  const handleEditorChange = (value) => {
    dispatch(setBusinessactivities(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          2.Business Activities
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
         ABC is engaged in Producing goods (includes manufacturing, extracting, growing and processing), in Canada, Producing goods (includes manufacturing, extracting, growing and processing), outside Canada, Importing into Canada goods produced outside Canada, Controlling an entity engaged in producing goods, in Canada, Controlling an entity engaged in producing goods, outside Canada and Controlling an entity engaged in importing into Canada
goods produced outside Canada
        </p>
    
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
       Add additional information about the Business Activities (If required)  
Note: Entities should describe the activities of any entities under their control but are only required to report on the activities of subsidiaries that are entities with reporting obligations under the Act
        </p>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>

      <div className="mb-4">
        <JoditEditor
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleEditorChange}
        />
      </div>
    </>
  );
};

export default Businessactivities;
