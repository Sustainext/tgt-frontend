"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setSupplychains } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Supplychains = ({ orgName, data }) => {
  const content = useSelector((state) => state.BillScreen1About.Supply_chains);
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setSupplychains(
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
    dispatch(setSupplychains(value));
  };

  return (
    <>
        <div>
          <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          3. Supply Chains
          </h3>
        </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">

        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
         Add details about the Supply Chains, including suppliers and service providers in Canada and abroad, and the source countries or regions of origin for each good and service used
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

export default Supplychains;

