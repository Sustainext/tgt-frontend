"use client";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axiosInstance from "../../../../utils/axiosMiddleware";
import StatementPopup from "./modals/statementPopup";
import DisclosureTable from "./tables/disclosureTable";
import ReportCreatedPopup from "./modals/reportCreatedPopup";
import NotifyGRI from "./modals/notifyGRIPopup";
import OmissionPopup from "./modals/omissionPopup";

const ContentIndex = ({
  reportName,
  setActiveStep,
  isOmissionSubmitted,
  setIsOmissionSubmitted,
  setIsOmissionModalOpen,
  isOmissionModalOpen,
  isCreateReportModalOpen,
  setIsCreateReportModalOpen,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const orgName =
    typeof window !== "undefined" ? localStorage.getItem("reportorgname") : "";
  const userName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : "";
  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : "";
  const fromDate =
    typeof window !== "undefined"
      ? localStorage.getItem("reportstartdate")
      : "";
  const toDate =
    typeof window !== "undefined" ? localStorage.getItem("reportenddate") : "";
  const reportid =
    typeof window !== "undefined" ? localStorage.getItem("reportid") : "";
  const reportname =
    typeof window !== "undefined" ? localStorage.getItem("reportname") : "";
  const apiCalledRef = useRef(false);
  const [data, setData] = useState("");
  const [loopen, setLoOpen] = useState(false);

  const [statement, setStatement] = useState(
    `${
      orgName ? orgName : "[Company name]"
    } has reported in accordance with the GRI Standards for the period ${
      fromDate ? fromDate : "start date"
    } to ${toDate ? toDate : "end date"}.`
  );
  const handleChange = (e) => {
    setStatement(e.target.value);
  };

  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };
  const loadFormData = async () => {
    LoaderOpen();
    const url = `${process.env.BACKEND_API_URL}/esg_report/content_index/${reportid}/`;
    const statementUrl = `${process.env.BACKEND_API_URL}/esg_report/statement_of_use/${reportid}/`;
    try {
      const response = await axiosInstance.get(url);
      if (response.data) {
        setData(response.data);
        response.data.map((val) => {
          if (!val.is_filled) {
            setIsOmissionSubmitted(false);
          }
        });
        const respons2 = await axiosInstance.get(statementUrl);
        if (respons2.data.statement_of_use) {
          setStatement(respons2.data.statement_of_use);
        }
      }

      LoaderClose();
    } catch (error) {
      console.error("API call failed:", error);
      LoaderClose();
    }
  };

  useEffect(() => {
    if (reportid) {
      loadFormData();
    }
  }, [reportid, isOmissionSubmitted]);

  const updateOmissionData = (updatedData) => {
    setData((prevData) =>
      prevData.map((row) => {
        const updatedRow = updatedData.find(
          (item) => item.disclosure === row.title
        );
        if (updatedRow) {
          return {
            ...row,
            omission: [
              {
                req_omitted: updatedRow.reqOmitted,
                reason: updatedRow.reason,
                explanation: updatedRow.explanation,
              },
            ],
          };
        }
        return row;
      })
    );
  };

  return (
    <>
      <div className="mx-2 p-2">
        <div className="mb-4">
          <h3 className="text-[20px] text-[#191C2C] mb-1 text-left font-bold">
            Content Index
          </h3>
          <p className="text-[#64709C] text-[15px]">
            Content Index generated for {reportName}
          </p>
        </div>
        <div className="rounded-md shadow-sm p-4 border border-gray-200 xl:w-[55%] md:w-[55%] lg:w-[55%] 2k:w-[55%] 4k:w-[55%] 2xl:w-[55%] w-full mb-6 flex justify-between">
          <div>
            <p className="text-[#343A40] text-[16px] mb-2">
              GRI Statement of Use
            </p>
            {/* <p className="text-[#343A40] text-[13px] mb-2"><span className="text-[#0F6CBD] text-[13px]">{orgName}</span> has reported in accordance with the GRI Standards for the period <span className="text-[#0F6CBD] text-[13px]">{fromDate} to {toDate}</span></p> */}
            <p className="text-[#343A40] text-[13px] mb-2">
              <span className="text-[#0F6CBD] text-[13px]">
                {statement.slice(0, statement.indexOf(" has"))}
              </span>
              {statement.slice(
                statement.indexOf(" has"),
                statement.indexOf(" period") + 7
              )}
              <span className="text-[#0F6CBD] text-[13px]">
                {statement.slice(statement.indexOf(" period") + 7)}
              </span>
            </p>
            <p className="text-[#343A40] text-[16px] mb-2">
              Applicable Sector Standard
            </p>
            <p className="text-[#0F6CBD] text-[13px]">Not Applicable</p>
          </div>
          <MdOutlineModeEditOutline
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="w-4 h-4 mt-[3px] text-[#727272] cursor-pointer"
          />
        </div>
        <div className="rounded-md p-4 flex gap-2 bg-[#F1F7FF] xl:w-[85%] md:w-[85%] lg:w-[85%] 2k:w-[85%] 4k:w-[85%] 2xl:w-[85%] w-full mb-6">
          <IoIosInformationCircleOutline className="xl:w-7 w-14 h-7 text-blue-500 mt-1" />
          <p className="text-[14px] text-[#051833]">
            The requirement omitted are displayed in red below. As GRI-Report in
            accordance with framework is chosen, the reason for omission of
            these disclosures are needed to be filled . Click on the add reason
            for omission button to add this data to the report.
          </p>
        </div>
        <div className="flex justify-end mb-4">
          {isOmissionSubmitted ? (
            <button
              onClick={() => {
                setIsOmissionModalOpen(true);
              }}
              className="flex gap-1 w-[auto] justify-center rounded-md bg-transparent px-2 py-1.5 text-[12px] font-semibold leading-6 text-[#2196F3] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2 border border-blue-400"
            >
              Edit reasons for omission
              <MdOutlineModeEditOutline className="w-4 h-4 mt-[3px]" />
            </button>
          ) : (
            <button
              onClick={() => {
                setActiveStep(1);
              }}
              className="flex gap-1 w-[auto] justify-center rounded-md bg-transparent px-2 py-1.5 text-[12px] font-semibold leading-6 text-[#2196F3] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2 border border-blue-400"
            >
              Edit Report
              <MdOutlineModeEditOutline className="w-4 h-4 mt-[3px]" />
            </button>
          )}
        </div>
        <div>
          <DisclosureTable data={data ? data : []} />
        </div>
      </div>
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={50}
            width={50}
            color="#00BFFF"
            secondaryColor="#f3f3f3"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <StatementPopup
        reportid={reportid}
        statement={statement}
        setStatement={setStatement}
        handleChange={handleChange}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setActiveStep={setActiveStep}
        orgName={orgName}
        fromDate={fromDate}
        toDate={toDate}
      />
      <OmissionPopup
        reportid={reportid}
        onSave={updateOmissionData}
        data={data ? data : []}
        isModalOpen={isOmissionModalOpen}
        setIsModalOpen={setIsOmissionModalOpen}
        isOmissionSubmitted={isOmissionSubmitted}
        setIsOmissionSubmitted={setIsOmissionSubmitted}
      />
      <ReportCreatedPopup
        reportname={reportname}
        reportid={reportid}
        userEmail={userEmail}
        userName={userName}
        orgName={orgName}
        statement={statement}
        reportName={reportName}
        isCreateReportModalOpen={isCreateReportModalOpen}
        setIsCreateReportModalOpen={setIsCreateReportModalOpen}
      />
    </>
  );
};

export default ContentIndex;
