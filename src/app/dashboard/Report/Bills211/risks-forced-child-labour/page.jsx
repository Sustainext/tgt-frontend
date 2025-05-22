"use client";
import { useState, useRef, useEffect } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import STARSVG from "../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setRisksforcedchildlabour } from "../../../../../lib/redux/features/Billsreport/Billscreen1Slice";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Risksforcedchildlabour = ({ orgName, data }) => {
  const content = useSelector(
    (state) => state.BillScreen1About.risks_forced_child_labour
  );
  const dispatch = useDispatch();

  const loadContent = () => {
    dispatch(
      setRisksforcedchildlabour(
        `<p style="margin-bottom: 8px;">ABC assesses forced labour and child labour risks in its operations and supply chains through:
</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Risk mapping of supply chains: ABC conducts regular assessments of suppliers, subcontractors, and partners across key regions to identify potential risks related to forced and child labour. This process includes field audits, third-party assessments, and employee interviews at key supplier locations.
</li>
  <li style="margin-bottom: 5px;">Supplier risk categorization: Based on the risk mapping, suppliers are categorized as high, medium, or low risk. This categorization helps prioritize monitoring and intervention strategies. In 2024, 10 suppliers were categorized as high risk, 20 suppliers as medium risk, and 50 suppliers as low risk.
</li>
  <li style="margin-bottom: 5px;">Collaboration with industry bodies to identify risk factors: ABC collaborates with the Responsible Business Alliance (RBA) to identify industry-specific risk factors and develop best practices for mitigating forced and child labour risks. ABC also participates in workshops organized by the Ethical Trading Initiative (ETI).
</li>
</ul>
<p style="margin-bottom: 8px;">Identified risks may include:</p>
<ul style="list-style-type: disc; padding-left: 40px; margin-bottom: 16px;">
  <li style="margin-bottom: 5px;">Country-specific labour law violations: In China, Vietnam, and India, local labour laws are inconsistently enforced, with instances of forced overtime and underage workers found in specific factories within ABC’s supply chain. 
</li>
  <li style="margin-bottom: 5px;">Industry-related risks in sourcing materials/services: Sourcing of tin and tantalum from the Democratic Republic of the Congo (DRC) poses risks, as these materials have been historically linked to child labour in mining operations.

</li>
  <li style="margin-bottom: 5px;">Subcontracting risks in the supply chain: ABC identified significant subcontracting risks in Bangladesh, particularly in garment manufacturing. Subcontractors often fail to adhere to ABC’s labour standards, putting workers at risk of exploitation

</li>
</ul>
`
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
    dispatch(setRisksforcedchildlabour(value));
  };

  return (
    <>
      <div>
        <h3 className="text-[22px] text-[#344054] mb-4 text-left font-semibold">
          5.Risks of Forced Labour and Child Labour
        </h3>
      </div>
      <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between items-center">
        <p className="text-[15px] text-[#344054] mb-4 mt-3 w-[85%]">
          Add details about the Risks of Forced Labour and Child Labour
          identified or Add a statement if no such risks were identified
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

      <div>
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          The entity has identified forced labour or child labour risks related
          to the following aspects of its activities and supply chains:
        </p>

        <ul className="list-disc pl-6">
          <li className="text-[14px] text-[#344054] mb-2">
            The sector or industry it operates in
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            The types of products it produces or imports
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            The locations of its activities, operations or factories
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            The types of products it sources
          </li>
        </ul>
      </div>
      <div className="mb-6">
        <p className="text-[15px] text-[#344054] mb-2 mt-3">
          The entity has identified forced labour or child labour risks in its
          activities and supply chains related to the following sector(s) and
          industry(ies):
        </p>

        <ul className="list-disc pl-6">
          <li className="text-[14px] text-[#344054] mb-2">Construction</li>
          <li className="text-[14px] text-[#344054] mb-2">
            Construction of buildings
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            Heavy and civil engineering construction
          </li>
          <li className="text-[14px] text-[#344054] mb-2">
            Specialty trade contractors
          </li>
        </ul>
      </div>
      <div>
        <p className="text-[15px] text-[#344054] mb-4  w-[85%]">
          In 2024, ABC conducted a thorough supplier risk assessment,
          identifying 15 high-risk suppliers. ABC implemented corrective action
          plans with these suppliers, which included worker training programs,
          facility upgrades, and closer monitoring through third-party audits.
          ABC has also established a Supplier Code of Conduct and introduced
          penalties for non-compliance. ABC continues to enhance supply chain
          visibility, ensuring compliance with sustainability, ethical sourcing,
          and human rights commitments through ongoing collaboration with
          suppliers and stakeholders.
        </p>
      </div>
    </>
  );
};

export default Risksforcedchildlabour;
