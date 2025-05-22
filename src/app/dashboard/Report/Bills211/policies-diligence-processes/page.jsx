"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setPoliciesdiligence } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Policiesdiligence = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.policies_diligence_processes
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setPoliciesdiligence(
        `<p style="margin-bottom: 8px;">ABC maintains a supply chain network that includes direct and indirect suppliers providing
goods, services, and logistics support.
</p>
        <p style="margin-bottom: 8px;">The supply chain spans across 10 countries and includes:

</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Suppliers: IT components, consumer electronics parts, finished appliances, sourced from China, Vietnam, and Mexico
</li>
  <li style="margin-bottom: 5px;">and Mexico
Service Providers: Logistics, warehousing, and IT services from Canada, the United States, and Singapore
</li>
  <li style="margin-bottom: 5px;">Third-Party Distributors/Retailers: Partnerships for sales and distribution with major retailers in North America, Europe, and Asia
</li>
</ul>

<p>
In 2024, ABC worked with approximately 250 suppliers in Canada and globally. It continues to
enhance supply chain visibility and ensure compliance with sustainability, ethical sourcing, and
human rights commitments
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
    dispatch(setPoliciesdiligence(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          4.Policies and Due Diligence Processes
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add additional information on any Policies and/or Due Diligence
          Processes related to forced labour and/or child labour, or Add a
          statement if no such policies and/or due diligence processes are in
          place.
        </p>
        <button
          className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
          onClick={loadContent}
        >
          <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
          Auto Fill
        </button>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-4  w-[85%]">
          Note: If an entity controls other entities, it must also describe the
          policies and due diligence processes that these controlled entities
          have in place
        </p>
      </div>
      <div className="mb-4">
        <JoditEditor
          value={content}
          config={config}
          tabIndex={1}
          onBlur={handleEditorChange}
        />
      </div>

      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          Due diligence processes include:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-[14px] text-[#344054] mb-2">
            Embedding responsible business conduct into policies and management
            systems
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            Identifying and assessing potential and actual adverse impacts in
            operations, supply chains and business relationships
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            Ceasing, preventing or mitigating potential and actual adverse
            impacts
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            Tracking implementation and resultsts
          </li>
        </ul>
      </div>
    </>
  );
};

export default Policiesdiligence;
