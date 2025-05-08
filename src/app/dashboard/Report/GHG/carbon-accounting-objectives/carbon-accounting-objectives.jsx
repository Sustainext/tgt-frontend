
'use client';
import React, { useState, useRef, useEffect } from "react";
import Moment from "react-moment";
import Image from 'next/image';
import dynamic from 'next/dynamic';
function Carbonaccountingobjectives({ value, setValue, roles, setRoles }) {
  const orgname = localStorage.getItem("reportorgname");
  const reportstartdateStr = localStorage.getItem("reportstartdate");
  const reportenddateStr = localStorage.getItem("reportenddate");
  const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
  const editor = useRef(null);
  const [content, setContent] = useState("");
  // const config = {
  //   askBeforePasteHTML: false,
  //   askBeforePasteFromWord: false,
  //   defaultActionOnPaste: 'insert_clear_html',
  //   height: 400, // sets the height to 400 pixels
  // };
  const config = {
    enter: "BR", // Or customize behavior on Enter key
cleanHTML: true,
    enablePasteHTMLFilter: false, 
  askBeforePasteHTML: false, 
  askBeforePasteFromWord: false,
    style: {
      fontSize: "14px",
      color:"#667085"
    },
    height:400,
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'align',
        'outdent',
        'indent',
        'ul',
        'ol',
        'paragraph',
        'link',
        'table',
        'undo',
        'redo',
        'hr',
        'fontsize',
        'selectall'
    ],
    // Remove buttons from the extra buttons list
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode','paintFormat','image','brush','font'],
  };

  const handleEditorChange = (newContent) => {
    setRoles(newContent);
  };
  return (
    <>
      <div className="div">
        <div className="xl:px-3">
          <h3 className="text-left mb-2 p-3">
            <b>CARBON ACCOUNTING OBJECTIVES</b>
          </h3>
          <div className="box rounded-lg p-4">
            <p className="text-left mb-4">
              <b>The carbon accounting report aims to:</b>{" "}
            </p>
            <div className="ml-4">
              <ul className="text-left list-disc wordsping">
                <li>
                  Quantify {orgname} GHG emissions during the period{" "}
                  <Moment format="DD-MMM-YYYY">{reportstartdateStr}</Moment> to{" "}
                  <Moment format="DD-MMM-YYYY">{reportenddateStr}</Moment>
                </li>
                <li>
                  Identify gaps and to identify emission reduction opportunities
                </li>
                <li>
                  Communicate results to the third-party agency for
                  verification.
                </li>
                <li>Support development of sustainability strategies.</li>
                <li>
                  Increase opportunities to register in voluntary GHG programs.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="px-3">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Roles and Responsibilities</b>
            </h4>
            <div className="mb-2">
              <JoditEditor
                ref={editor}
                value={roles}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={handleEditorChange} // preferred to use only this option to update the content for performance reasons
              // onChange={newContent => {}}
              // onChange={handleEditorChange}
              />
            </div>
            <p className="text-left wordsping px-">
              The quantification of {orgname} carbon emissions was led by the
              <input
                type="text"
                placeholder="Designation of Organizational Admin"
                className="xl:ml-2 xl:w-[25%] w-full border appearance-none text-xs text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              ></input>{" "}
              Data has been collected using the Sustainext.ai platform.
            </p>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Methodology Used </b>
            </h4>
            <p className="text-left">
              This report follows the GHG protocol corporate standard and
              specifications for quantification of GHG Emissions. The
              methodology can be summarized as follows:
            </p>
            <div className="mt-3">
              <Image
                src="/report1.png"
                alt="Description of the image"
                width={1050}
                height={500}
              />

            </div>
          </div>
        </div>
        <div className="px-3">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>Principles of Carbon Accounting </b>
            </h4>
            <p className="text-left mb-4">
              GHG accounting and reporting practices are constantly evolving
              alongside advancements in the science of climate change. The GHG
              Protocol and ISO 14064 standards advise that GHG emissions
              inventories be carried out in accordance with the following
              principles:
            </p>
            <p className="text-left mb-4 ">
              <b className="mr-2">RELEVANCE:</b> For an organization’s GHG
              emissions inventory to contain information that users might need
              for making “informed” decisions. Accordingly, The organization has
              identified the appropriate boundaries that reflect its business
              operations.
            </p>
            <p className="text-left mb-4">
              <b className="mr-2">COMPLETENESS:</b> All relevant emission
              sources within the chosen inventory boundary have been accounted
              for in the GHG inventory so that a comprehensive and meaningful
              inventory of total emissions is compiled.
            </p>
            <p className="text-left mb-4">
              <b className="mr-2">CONSISTENCY:</b> The GHG inventory has been
              compiled in a manner that ensures that the overall emissions
              estimates are consistent and comparable over time.
            </p>
            <p className="text-left mb-4">
              <b className="mr-2">TRANSPARENCY:</b>
              All necessary information has been recorded, compiled, and
              analyzed in a manner that enables internal reviewers and external
              verifiers to attest to its credibility.{" "}
            </p>
            <p className="text-left mb-4">
              <b className="mr-2">ACCURACY:</b> Data reported is sufficiently
              precise to enable us to make decisions with reasonable assurance
              and the reported information is credible. Uncertainties in
              measurements, recording, and calculations have been reduced as far
              as possible and practicable.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Carbonaccountingobjectives;
