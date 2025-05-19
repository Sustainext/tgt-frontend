"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationprofilestructure } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Organizationprofilestructure = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.organization_profile_structure
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setOrganizationprofilestructure(
        `<p>[Company Name – P1-Q2] has a presence in [number] location(s) worldwide. The entity employs approximately [number] employees globally, including [number] in Canada and [number] outside Canada. It does not control or own any other entities [or specify subsidiaries and their functions]. 

The organizational structure includes the following key departments: [list key departments such as operations, sales, R&D, logistics, corporate affairs, sustainability, etc.]. 

[Company Name – P1-Q2] is a member of [list relevant industry associations, partnerships, or coalitions], which support its commitment to [sustainability, ethical sourcing, innovation, etc.]. 

</p> <p>Shape </p>`
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
    dispatch(setOrganizationprofilestructure(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          1.Organization Profile and Structure
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          [Company Name – P1-Q2] is a Corporation headquartered in [headquarters
          location – P1-Q11], operating in the following industry/sector(s):
        </p>
      <div className="">
  <ul className="list-disc pl-12">
    <li className="text-[14px] text-[#344054] mb-2">Construction</li>
    <li className="text-[14px] text-[#344054] mb-2">
      Heavy and civil engineering construction
    </li>
    <li className="text-[14px] text-[#344054] mb-2">
      Specialty trade contractors
    </li>
  </ul>
</div>

        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          The entity is listed on a stock exchange in Canada, has a place of
          business in Canada, does business in Canada and has generated at least
          $40 million in revenue for at least one of its two most recent
          financial years.
        </p>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add additional information about the Organization Structure including
          Control of other entities, including what the controlled entities do
          and where they are located (If applicable)
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

export default Organizationprofilestructure;
