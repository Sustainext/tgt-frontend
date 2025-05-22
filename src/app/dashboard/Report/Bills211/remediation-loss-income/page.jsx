"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setRemediationlossincome } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Remediationlossincome = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.remediation_loss_income
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setRemediationlossincome(
        `<p style="margin-bottom: 8px;">Where efforts to eliminate forced or child labour impact vulnerable individuals and families, ABC
has implemented support initiatives such as:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Transition programs to alternative employment: ABC has developed transition programs to help affected workers move into alternative, sustainable employment, providing training and job placement services to ensure a smooth and secure shift to new roles.
</li>
  <li style="margin-bottom: 5px;">Financial support programs for affected communities
</li>
  <li style="margin-bottom: 5px;">Collaboration with NGOs for worker reintegration
</li>
</ul>`
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
    dispatch(setRemediationlossincome(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          8. Remediation of Loss of Income
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
        <div className="w-[85%]">
          <p className="text-[15px] text-[#344054] mb-2">
            Add additional information on any Remediation Measures taken for the
            Loss of Income, or Add a statement if no such measures were taken or
            required
          </p>
          <p className="text-[15px] text-[#344054] mb-4 ">
            Note: If an entity controls other entities, it must also describe
            the measures that these controlled entities have taken to remediate
            loss of income, if applicable
          </p>
        </div>
        <div>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex h-[35px]"
            onClick={loadContent}
          >
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
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

export default Remediationlossincome;
