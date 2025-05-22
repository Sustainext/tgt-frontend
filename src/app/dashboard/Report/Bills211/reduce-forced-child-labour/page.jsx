"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setReduceforcedchildlabour } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Reduceforcedchildlabour = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.reduce_forced_child_labour
  );
  const dispatch = useDispatch();

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
    dispatch(setReduceforcedchildlabour(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          6.Steps to prevent and reduce risks of forced labour and child labour
        </h3>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          Steps taken by the entity in the previous financial year to prevent
          and reduce the risk that forced labour or child labour is used at any
          step of the production of goods in Canada or elsewhere by the entity
          or of goods imported into Canada by the entity include:
        </p>
        <div className="">
          <ul className="list-disc pl-12">
            <li className="text-[14px] text-[#344054] mb-2">
              Conducting an internal assessment of risks of forced labour and/or
              child labour in the organization's activities and supply chains
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Contracting an external assessment of risks of forced labour
              and/or child labour in the organization's activities and supply
              chains
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Developing and implementing an action plan for addressing forced
              labour and/or child labour
            </li>
            <li className="text-[14px] text-[#344054] mb-2">
              Gathering information on worker recruitment and maintaining
              internal controls to ensure that all workers are recruited
              voluntarily
            </li>
          </ul>
        </div>

        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          Add additional information about the Steps taken to prevent and reduce
          risks of forced labour and child labour including details on mapping
          supply chains and details about the Supplier Risk Assessment conducted
          (If available) and Add a statement if no such steps were taken
        </p>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3">
          Note: If an entity controls other entities, it must also describe the
          steps that these controlled entities have taken to identify, assess
          and manage potential forced labour or child labour risks in their
          activities and supply chains
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
    </>
  );
};

export default Reduceforcedchildlabour;
