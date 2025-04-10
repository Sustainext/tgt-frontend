'use client';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Moment from 'react-moment';
import { Countryname } from '../../../../shared/data/countryname';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { MdInfoOutline } from 'react-icons/md';

// Dynamically import JoditEditor to handle server-side rendering
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function Aboutthereport({
  reportingdateform,
  setReportingdateform,
  reportingdateto,
  setReportingdateto,
  reportingcy,
  setReportingCy,
  firstSelection,
  setFirstSelection,
  content,
  setContent,
}) {
  const orgname = typeof window !== 'undefined' ? localStorage.getItem('reportorgname') : '';
  const orgcontry = typeof window !== 'undefined' ? localStorage.getItem('organizationcountry') : '';
  const reportstartdateStr = typeof window !== 'undefined' ? localStorage.getItem('reportstartdate') : '';
  const reportenddateStr = typeof window !== 'undefined' ? localStorage.getItem('reportenddate') : '';
  const [showSecondSelect, setShowSecondSelect] = useState(true);

  const country = Countryname.find(country => country.code === orgcontry);
  const handleFirstSelectChange = event => {
    setFirstSelection(event.target.value);
    setShowSecondSelect(true); // Show the second select box when an option is selected
  };
  const editor = useRef(null);

  const config = {
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html',
    height: 400,
    disablePlugins: ['image'],
    readonly: false,
    uploader: {
      url: 'none', // Disables the default uploader
      insertImageAsBase64URI: false,
    },
  };

  const handleReportndate = event => {
    setReportingdateform(event.target.value);
    console.log(event.target.value, 'name');
  };
  const handleReportndateto = event => {
    setReportingdateto(event.target.value);
    console.log(event.target.value, 'name');
  };
  const handleReportndatecy = event => {
    setReportingCy(event.target.value);
    console.log(event.target.value, 'setReportingCy');
  };
  const handleEditorChange = newContent => {
    setContent(newContent);
  };
  const renderSecondSelect = () => {
    if (firstSelection === 'financialyear') {
      return (
        <div className="flex xl:mt-5">
          <div className="w-[45%]">
            <div className="relative mb-1">
              <input
                type="date"
                value={reportingdateform}
                onChange={handleReportndate}
                className="w-[100%] border appearance-none text-xs text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
              />
            </div>
          </div>
          <div className="w-[45%] ml-2">
            <div className="relative mb-1">
              <input
                type="date"
                value={reportingdateto}
                onChange={handleReportndateto}
                className="w-[100%] border appearance-none text-xs text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      );
    } else if (firstSelection === 'calendaryear') {
      return (
        <>
          <div className="w-[40%] mt-5">
            <div className="relative mb-1">
              <input
                type="date"
                value={reportingcy}
                onChange={handleReportndatecy}
                className="w-[100%] border appearance-none text-xs text-neutral-600 m-0.5 pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 cursor-pointer"
              />
            </div>
          </div>
        </>
      );
    } else {
      return null; // Return null if no option or an unknown option is selected
    }
  };
  const NewTooltip = ({ tooltiptext, display }) => {
    return (
      <>
        <MdInfoOutline
          data-tooltip-id={`tooltip-${tooltiptext.replace(/\s+/g, '-')}`}
          data-tooltip-content={tooltiptext}
          className="mt-1 text-[14px]"
          style={{ display: display }}
        />
        <ReactTooltip
          id={`tooltip-${tooltiptext.replace(/\s+/g, '-')}`}
          place="top"
          effect="solid"
          style={{
            width: '300px',
            backgroundColor: '#000',
            color: 'white',
            fontSize: '12px',
            boxShadow: '3px 3px 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          }}
        />
      </>
    );
  };
  return (
    <>
      <div className="xl:px-3">
        <h3 className="text-left mb-2 p-3">
          <b>INTRODUCTION</b>
        </h3>
        <div className="box rounded-lg p-4">
          <h4 className="text-left mb-2">
            <b>ABOUT THE REPORT</b>
          </h4>
          <p className="text-left wordsping">
            {orgname} GHG emissions inventory for the period{' '}
            <Moment format="DD-MMM-YYYY">{reportstartdateStr}</Moment> to{' '}
            <Moment format="DD-MMM-YYYY">{reportenddateStr}</Moment> are presented in this Carbon Accounting Report. It covers {orgname} operations across{' '}
            {country ? <>{country.name}</> : <>Country not found</>} and is presented in accordance with ISO 14064 and GHG Protocol. The report facilitates improvement
            of {orgname} sustainability performance by demonstrating an accurate assessment of the organization’s GHG emissions arising from its activities and facilities. Through this evaluation, key GHG emissions sources are identified which will assist {orgname} in designing appropriate emission reduction and mitigation strategies. Evaluating principal sources of GHG emissions will enable the identification of areas for improvement and further emission reduction.
          </p>
        </div>
        <div className="">
          <div className="box rounded-lg p-4">
            <h4 className="text-left mb-2">
              <b>REPORTING PERIOD</b>
            </h4>
            <p className="text-left wordsping">
              The GHG emissions inventory presented in this report covers {orgname} GHG emissions for reporting period, starting from{' '}
              <Moment format="MMM-YYYY">{reportstartdateStr}</Moment> to{' '}
              <Moment format="MMM-YYYY">{reportenddateStr}</Moment> . The base year for {orgname} GHG emissions inventory is{' '}
              <select
                className="xl:w-[30%] w-full rounded-md border-0 py-1 xl:pl-4 xl:mt-0 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleFirstSelectChange}
                value={firstSelection}
              >
                <option>Select option</option>
                <option value="financialyear">Financial year</option>
                <option value="calendaryear">Calendar year</option>
              </select>{' '}
              .
            </p>
            <div className="mb-3">
              {showSecondSelect && renderSecondSelect()}
            </div>
          </div>
          <div className="">
            <div className="box rounded-lg p-4 flex">
              <h4 className="text-left mb-2">
                <b>ABOUT THE ORGANIZATION</b>
              </h4>
              <NewTooltip tooltiptext=" This section will be dependent based on the company-specific data which shall be provided by the organizational admin." display="inline" className="ml-1" />
            </div>
            <div className="ml-2">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={handleEditorChange} // preferred to use only this option to update the content for performance reasons
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Aboutthereport;
