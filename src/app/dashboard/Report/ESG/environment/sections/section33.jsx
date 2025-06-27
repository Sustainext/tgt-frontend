"use client";
import { useState, useRef, useEffect } from "react";
import AirQualityTable from "../tables/airQualityTable";
import dynamic from "next/dynamic";
import STARSVG from "../../../../../../../public/star.svg";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setAirQualityProtectionCommitment } from "../../../../../../lib/redux/features/ESGSlice/screen12Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const col1 = [
  {
    label: "S.No",
    dataIndex: "SNO",
    headerClass:
      "px-4 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Air Pollutants",
    dataIndex: "pollutant",
    headerClass:
      "px-4 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Total Emissions",
    dataIndex: "total_emission_kg",
    headerClass:
      "px-2 py-2 border-r text-[12px]  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Contribution %",
    dataIndex: "contribution",
    headerClass:
      "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Source of emission factor",
    dataIndex: "source_of_emission",
    headerClass:
      "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

const col2 = [
  {
    label: "S.No",
    dataIndex: "SNO",
    headerClass:
      "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Air Pollutants",
    dataIndex: "pollutant",
    headerClass:
      "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Total Emissions",
    dataIndex: "total_emission",
    headerClass:
      "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Source of emission factor",
    dataIndex: "source_of_emission",
    headerClass:
      "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

col2.totalLabelKey = "Average emission";

const col3 = [
  {
    label: "S.No",
    dataIndex: "SNO",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Location",
    dataIndex: "location",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "NOx",
    dataIndex: "NOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "SOx",
    dataIndex: "SOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Persistent organic pollutants (POP)",
    dataIndex: "Persistent organic pollutants (POP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Volatile organic compounds (VOC)",
    dataIndex: "Volatile organic compounds (VOC)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Hazardous air pollutants (HAP)",
    dataIndex: "Hazardous air pollutants (HAP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Particulate matter (PM 2.5)",
    dataIndex: "Particulate matter (PM 2.5)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Carbon Monoxide(CO)",
    dataIndex: "Carbon Monoxide(CO)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

const col4 = [
  {
    label: "S.No",
    dataIndex: "SNO",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Location",
    dataIndex: "location",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "NOx",
    dataIndex: "NOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "SOx",
    dataIndex: "SOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r  text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Persistent organic pollutants (POP)",
    dataIndex: "Persistent organic pollutants (POP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Volatile organic compounds (VOC)",
    dataIndex: "Volatile organic compounds (VOC)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Hazardous air pollutants (HAP)",
    dataIndex: "Hazardous air pollutants (HAP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Particulate matter (PM 2.5)",
    dataIndex: "Particulate matter (PM 2.5)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Carbon Monoxide(CO)",
    dataIndex: "Carbon Monoxide(CO)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

const col5 = [
  {
    label: "S.No",
    dataIndex: "SNO",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Location",
    dataIndex: "location",
    headerClass:
      "px-4 py-2 text-[12px]  text-[#727272] border-r w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "NOx",
    dataIndex: "NOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "SOx",
    dataIndex: "SOx",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Persistent organic pollutants (POP)",
    dataIndex: "Persistent organic pollutants (POP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Volatile organic compounds (VOC)",
    dataIndex: "Volatile organic compounds (VOC)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Hazardous air pollutants (HAP)",
    dataIndex: "Hazardous air pollutants (HAP)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Particulate matter (PM 2.5)",
    dataIndex: "Particulate matter (PM 2.5)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Carbon Monoxide(CO)",
    dataIndex: "Carbon Monoxide(CO)",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

const col6 = [
  {
    label: "Standards used",
    dataIndex: "StandardsUsed",
    headerClass:
      "px-4 py-2 text-[12px] border-r text-[#727272] w-[10%] text-left rounded-tl-lg rounded-tr-lg h-[44px]",
    cellClass:
      "px-4 py-2 border-y  border-r font-normal text-[13px]  w-[13%] text-left",
  },
  {
    label: "Methodologies used",
    dataIndex: "MethodologiesUsed",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
  {
    label: "Assumptions considered",
    dataIndex: "AssumptionsConsidered",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },

  {
    label: "Calculation tools used",
    dataIndex: "CalculationToolsUsed",
    headerClass:
      "px-2 py-2 text-[12px] border-r text-[#727272] w-[10%] text-center",
    cellClass:
      "px-4 py-2 border-y text-center border-r  font-normal text-[13px] ",
  },
];

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function generateColumns(apiResponse) {
  const dataKeys = Object.keys(apiResponse[0] || {});

  const columns = dataKeys.map((key, index) => {
    return {
      label: capitalizeFirstLetter(key.replace(/_/g, " ")),
      dataIndex: key,
      headerClass:
        "px-2 py-2  border-r text-[12px] text-[#727272] w-[10%] text-center",
      cellClass:
        "px-4 py-2 border-y border-r text-center font-normal text-[13px]",
    };
  });

  return columns;
}

function removeContributionColumn(columns) {
  return columns.filter((column) => column.dataIndex !== "contribution");
}

const Section33 = ({ section12_7Ref, data,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'12.7':'12.7',
  sectionTitle = 'Air Quality',
  sectionOrder = 12,
 }) => {
  const content = useSelector(
    (state) => state.screen12Slice.air_quality_protection_commitment
  );
  const [dynamicColumn1, setdynamicColumn1] = useState(col1);
  const [dynamicColumn3, setdynamicColumn3] = useState(col3);
  const [dynamicColumn4, setdynamicColumn4] = useState(col4);
  const [dynamicColumn5, setdynamicColumn5] = useState(col5);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const loadContent = () => {
    dispatch(
      setAirQualityProtectionCommitment(
        `We recognize the importance of maintaining air quality and work to minimize air emissions from our operations. This includes implementing measures to reduce pollutants, monitoring air quality, and complying with regulatory standards.`
      )
    );
  };

  const TableData1 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"]["air_emission_by_pollution"]
        ? data["air_quality_analyze"]["air_emission_by_pollution"]
        : []
      : [];
  const TableData2 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"]["air_emission_by_pollution_ppm_or_ugm2"]
        ? data["air_quality_analyze"]["air_emission_by_pollution_ppm_or_ugm2"]
        : []
      : [];
  const TableData3 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"][
          "percentage_contribution_of_pollutant_by_location"
        ]
        ? data["air_quality_analyze"][
            "percentage_contribution_of_pollutant_by_location"
          ]
        : []
      : [];
  const TableData4 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"]["total_air_pollution_by_location"]
        ? data["air_quality_analyze"]["total_air_pollution_by_location"]
        : []
      : [];
  const TableData5 =
    data && data["air_quality_analyze"]
      ? data["air_quality_analyze"][
          "total_air_pollution_by_location_ppm_or_ugm2"
        ]
        ? data["air_quality_analyze"][
            "total_air_pollution_by_location_ppm_or_ugm2"
          ]
        : []
      : [];
  const TableData6 =
    data && data["air_quality_collect"]
      ? data["air_quality_collect"]["air_quality_standard_methodology"]
        ? data["air_quality_collect"]["air_quality_standard_methodology"]
        : []
      : [];

  useEffect(() => {
    if (
      TableData1 &&
      TableData1.length > 0 &&
      TableData1[0].contribution == ""
    ) {
      setdynamicColumn1(
        TableData1?.length > 0 ? removeContributionColumn(col1) : col1
      );
      setShow(true);
    } else {
      setdynamicColumn1(col1);
      setShow(false);
    }

    setdynamicColumn3(
      TableData3.length > 0 ? generateColumns(TableData3) : col3
    );
    setdynamicColumn4(
      TableData4.length > 0 ? generateColumns(TableData4) : col4
    );
    setdynamicColumn5(
      TableData5.length > 0 ? generateColumns(TableData5) : col5
    );
  }, [data]);

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
    // Remove buttons from the extra buttons list
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

  const handleEditorChange = (e) => {
    dispatch(setAirQualityProtectionCommitment(e.taget.value));
  };

  return (
    <>
      <div id="section12_7" ref={section12_7Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          {sectionNumber} {sectionTitle}
        </h3>

        <div className="xl:flex lg:flex md:flex 4k:flex 2k:flex 2xl:flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2 mt-3">
            Add statement about company’s commitment to protect and maintain air
            quality
          </p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
            onClick={loadContent}
          >
            {/* <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/> */}
            <Image src={STARSVG} className="w-5 h-5 mr-1.5" alt="star" />
            Auto Fill
          </button>
        </div>
        <textarea
          onChange={handleEditorChange}
          value={content}
          className={`border appearance-none text-sm border-gray-400 text-[#667085] pl-2 rounded-md py-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-400 cursor-pointer w-full mb-4 `}
          rows={4}
        />
        {/* <div className="mb-4">
              <JoditEditor
              // ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={handleEditorChange}
              />
            </div> */}

        {TableData1 && TableData1.length > 0 && (
          <div>
            <p className="text-[15px] text-[#344054] mb-1 font-semibold">
              Air Emissions by Pollutants in (Kg)
            </p>
            {show ? (
              <p className="text-neutral-500 text-[13px] font-semibold mt-1 mb-2">
                Contribution % calculation cannot be performed due to differing
                units of the air pollutants.
              </p>
            ) : (
              <div></div>
            )}
            <div className="shadow-md rounded-md mb-4">
              <AirQualityTable columns={dynamicColumn1} data={TableData1} />
            </div>
          </div>
        )}

        {TableData2 && TableData2.length > 0 && (
          <div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
              Air Emissions by Pollutants (in ppm or µg/m³)
            </p>
            <div className="shadow-md rounded-md mb-4">
              <AirQualityTable columns={col2} data={TableData2} />
            </div>
          </div>
        )}

        {TableData3 && TableData3.length > 0 && (
          <div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
              Percentage Contribution of Air Pollutants by Location
            </p>
            <div className="shadow-md rounded-md mb-4">
              <AirQualityTable columns={dynamicColumn3} data={TableData3} />
            </div>
          </div>
        )}

        {TableData4 && TableData4.length > 0 && (
          <div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
              Total Air Emissions by Location (in Kg)
            </p>
            <div className="shadow-md rounded-md mb-4">
              <AirQualityTable columns={dynamicColumn4} data={TableData4} />
            </div>
          </div>
        )}

        {TableData5 && TableData5.length > 0 && (
          <div>
            <p className="text-[15px] text-[#344054] mb-2 font-semibold">
              Total Air Emissions by Location (in ppm or µg/m³)
            </p>
            <div className="shadow-md rounded-md mb-4">
              <AirQualityTable columns={dynamicColumn5} data={TableData5} />
            </div>
          </div>
        )}

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Standards, methodologies, assumptions, and/or calculation tools used
        </p>
        <div className="shadow-md rounded-md mb-4">
          <AirQualityTable columns={col6} data={TableData6} />
        </div>
      </div>
    </>
  );
};

export default Section33;
