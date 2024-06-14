'use client'
import { useState, useRef, useEffect } from "react";
import CoverSheet from "../cover-sheet";
import Aboutthereport from "../Introduction/about-the-report";
import Executivesummary from "../executive-summary";
import Carbonaccountingobjectives from "../carbon-accounting-objectives/carbon-accounting-objectives";
import Organizationalboundaries from "../boundaries/organizational-boundaries";
import Datacollection from "../data-collection/data-collection";
import Results from "../results";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';
import { MdDownload, MdDelete, MdKeyboardArrowDown, MdFileDownload } from "react-icons/md";
import axiosInstance,{patch} from "../../../utils/axiosMiddleware";
import Link from 'next/link'
import { GlobalState } from "@/Context/page";
function Ghgtemplates() {
const { open } = GlobalState();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isPrintableVisible, setIsPrintableVisible] = useState(false);
  const printRef = useRef(null);
  const printComponentRef = useRef();
  const [loopen, setLoOpen] = useState(false);
  const [exdata, setExdata] = useState([]);
  const [locatiodata, setLocationdata] = useState();
  const [souresdata, setSouresdata] = useState();
  const [totalContributionScope, setTotalContributionScope] = useState(0);
  const [highestContributionSource, setHighestContributionSource] = useState([]);
  const [reportingdateform, setReportingdateform] = useState("");
  const [reportingdateto, setReportingdateto] = useState("");
  const [reportingcy, setReportingCy] = useState("");
  const [firstSelection, setFirstSelection] = useState("");
  const [content, setContent] = useState("");
  const [roles, setRoles] = useState("");
  const [childValue, setChildValue] = useState("");
  const [boundaries, setBoundaries] = useState("");
  const [excludedsources, setExcludedsources] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [imageSrc, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const reportname = localStorage.getItem("reportname");
  const reportstartdateStr = localStorage.getItem("reportstartdate");
  const reportenddateStr = localStorage.getItem("reportenddate");
  const reportstartdate = reportstartdateStr ? new Date(reportstartdateStr) : null;
  const reportenddate = reportenddateStr ? new Date(reportenddateStr) : null;
  const startYear = reportstartdate ? reportstartdate.getFullYear() : null;
  const endYear = reportenddate ? reportenddate.getFullYear() : null;
  const reportId=localStorage.getItem("reportid");
  const [loadingById, setLoadingById] = useState({});
  let display;

  if (startYear === endYear) {
    display = `${startYear}`;
  } else {
    display = `${startYear} - ${endYear}`;
  }

  const isMounted = useRef(true);

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchExecutive = async () => {
    LoaderOpen();
    const response = await axiosInstance.get(
        `/sustainapp/report_data/${reportId}`
      );
    setExdata(response.data.data);
    setLocationdata(response.data.data);
    setSouresdata(response.data.data);
    const corporatesData = response.data.data;
    const total = corporatesData.reduce((acc, corporate) => {
      const scopesTotal = corporate.scopes.reduce((scopeAcc, scope) => {
        const totalCo2e = parseFloat(scope.total_co2e);
        return scopeAcc + totalCo2e;
      }, 0);
      return acc + scopesTotal;
    }, 0);
    const roundedTotal = parseFloat(total.toFixed(2));
    setTotalContributionScope(roundedTotal);
    const sourcesData = response.data.data.flatMap(
      (corporate) => corporate.sources
    );
    if (sourcesData.length > 0) {
      const maxContribution = Math.max(
        ...sourcesData.map((source) => parseFloat(source.contribution_source))
      );
      const highestSources = sourcesData.filter(
        (source) => parseFloat(source.contribution_source) === maxContribution
      );
      const highestSourceNames = highestSources
        .map((source) => source.source_name)
        .join(", ");
      setHighestContributionSource(highestSourceNames);
    }
    LoaderClose();
  };

  const fetchDatareport = async () => {
    LoaderOpen();
    const response = await axiosInstance.get(
        `/sustainapp/ghgreport/${reportId}`
      );
    setReportingdateform(response.data.from_year);
    setReportingdateto(response.data.to_year);
    setReportingCy(response.data.calender_year);
    setFirstSelection(response.data.reporting_period_name);
    setContent(response.data.about_the_organization);
    setRoles(response.data.roles_and_responsibilities);
    setChildValue(response.data.designation_of_organizational_admin);
    setBoundaries(response.data.organizational_boundries);
    setExcludedsources(response.data.excluded_sources);
    setSelectedOptions(response.data.data_source || {});
    setImage(response.data.org_logo);
    LoaderClose();
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchExecutive();
      fetchDatareport();
      isMounted.current = false;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = async () => {
    LoaderOpen();
    const formData = new FormData();
    formData.append("org_logo", imageSrc);
    const sandData = {
      about_the_organization: content,
      roles_and_responsibilities: roles,
      organizational_boundries: boundaries,
      excluded_sources: excludedsources,
      data_source: selectedOptions,
      designation_of_organizational_admin: childValue,
      reporting_period_name: firstSelection,
      from_year: reportingdateform === "" ? null : reportingdateform,
      to_year: reportingdateto === "" ? null : reportingdateto,
      calender_year: reportingcy === "" ? null : reportingcy,
    };
    formData.append("data", JSON.stringify(sandData));
    await patch(
        `/sustainapp/ghgreport/${reportId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (response.status == "200") {
          toast.success("Report has been added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          LoaderClose();
          openModal();
          setSelectedImage();
          setImage();
        } else {
          toast.error("Error", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          LoaderClose();
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "An unexpected error occurred";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        LoaderClose();
        setSelectedImage();
      });
  };
  const handleDownloadpdf = async () => {
    // Set loading to true for the specific item
    setLoading(true);
    setIsOpen(false);
    setLoadingById(prevState => ({ ...prevState, [reportId]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_pdf/${reportId}/?download=true`
      );
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${reporttepname}.pdf`); // Setting the file name dynamically
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      // Set loading to false for the specific item
      setLoadingById(prevState => ({ ...prevState, [reportId]: false }));
      setIsOpen(null);
    }
  };
  const handleDownloaddocx = async () => {
    const stringWithQuotes = localStorage.getItem("authTokens");
    const stringWithoutQuotes = stringWithQuotes.replace(/"/g, "");
    const options = {
      headers: {
        Authorization: `Token ${stringWithoutQuotes}`,
      },
    };

    setLoading(true);
    setIsOpen(false);
    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_word_download/${reportId}/`, options

      );

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${reporttepname}.docx`); // Setting the file name dynamically
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      // Set loading to false for the specific item

      setIsOpen(null);
    }


  };
  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />

      <div   className={`${open ? " w-[105vw]" :" w-[115vw]" } flex` } >
        <div className="bg-[#f2f2f2] items-start py-4 px-3 min-w-[270px] min-h-[100vh] rounded-lg text-sm">
          <section className="flex min-h-screen justify-center">
            <div className="w-80">
              <h2 className="text-xl text-[#727272] mb-2 text-left">
                <b>PRESENTATION</b>
              </h2>
              <h2 className="text-gray-700 mb-3 mt-8 text-left">Templates</h2>
              <ul>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 1
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 1
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 1
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Cover Sheet
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 2
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 2
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 2
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Executive summary
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 3
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 3
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 3
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Introduction
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 4
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 4
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 4
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Carbon accounting objectives
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 5
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 5
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 5
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Boundaries
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div
                    className={`${
                      activeStep === 6
                        ? "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-sky-800 font-bold"
                        : "before:absolute before:left-[5.5px] before:h-full before:w-[1px] before:bg-gray-400"
                    } `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 6
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 6
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Data collection
                    </p>
                  </div>
                </li>
                <li className="relative flex items-baseline gap-6 pb-5">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`${
                        activeStep === 7
                          ? "bi bi-circle-fill fill-sky-800 font-bold"
                          : "bi bi-circle-fill fill-gray-400"
                      } `}
                      viewBox="0 0 16 16"
                    >
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`${
                        activeStep === 7
                          ? "text-sm text-sky-800 font-bold"
                          : "text-sm text-gray-600"
                      } `}
                    >
                      Results
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div className="w-full mb-5">
          <div className="flex justify-between shadow-md border-gray-100 mt-4 py-2">
            <div className="flex items-center justify-center">
              <h1 className="text-lg text-left  ml-2">
                <p>Carbon Accounting Report</p>
              </h1>
            </div>
            <div className="float-right mr-2 flex items-center justify-center ">
              <div className="flex items-center justify-center">
                <button
                  style={{
                    display: activeStep === 1 ? "none" : "inline-block",
                  }}
                  className={`${
                    activeStep === 1 ? "" : "text-blue-500"
                  } px-3 py-1.5 rounded font-bold`}
                  onClick={handlePrevious}
                  disabled={activeStep === 1}
                >
                  &lt; Previous
                </button>

                {activeStep < 7 ? (
                  <button
                    className={`${
                      activeStep === 7
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white"
                    } px-3 py-1.5 rounded ml-2 font-bold w-[100px]`}
                    onClick={handleNext}
                    disabled={activeStep === 7}
                  >
                    Next &gt;
                  </button>
                ) : (
                  <button
                    className="flex w-[120px] justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                    onClick={submitForm}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mx-3 my-2">
            <div className="h-[800px] overflow-y-auto">
              {/* Step 1 */}
              {activeStep === 1 && (
                <>
                  <div>
                    <CoverSheet
                      display={display}
                      imageSrc={imageSrc}
                      setImage={setImage}
                      setSelectedImage={setSelectedImage}
                      selectedImage={selectedImage}
                    />
                  </div>
                </>
              )}
              {/* Step 2 */}
              {activeStep === 2 && (
                <div>
                  <Executivesummary
                    exdata={exdata}
                    totalContributionScope={totalContributionScope}
                    highestContributionSource={highestContributionSource}
                  />
                  {/* Your Step 2 form content goes here */}
                </div>
              )}

              {/* Step 3 */}
              {activeStep === 3 && (
                <div>
                  <div className="mb-4">
                    <Aboutthereport
                      reportingdateform={reportingdateform}
                      setReportingdateform={setReportingdateform}
                      reportingdateto={reportingdateto}
                      setReportingdateto={setReportingdateto}
                      reportingcy={reportingcy}
                      setReportingCy={setReportingCy}
                      firstSelection={firstSelection}
                      setFirstSelection={setFirstSelection}
                      content={content}
                      setContent={setContent}
                    />
                  </div>
                </div>
              )}
              {activeStep === 4 && (
                <div>
                  <div className="mb-4">
                    <Carbonaccountingobjectives
                      value={childValue}
                      setValue={setChildValue}
                      roles={roles}
                      setRoles={setRoles}
                    />
                  </div>
                </div>
              )}
              {activeStep === 5 && (
                <div>
                  <div className="mb-4">
                    <Organizationalboundaries
                      locatiodata={locatiodata}
                      boundaries={boundaries}
                      setBoundaries={setBoundaries}
                    />
                  </div>
                </div>
              )}
              {activeStep === 6 && (
                <div>
                  <div className="mb-4">
                    <Datacollection
                      souresdata={souresdata}
                      display={display}
                      selectedOptions={selectedOptions}
                      setSelectedOptions={setSelectedOptions}
                      excludedsources={excludedsources}
                      setExcludedsources={setExcludedsources}
                    />
                  </div>
                </div>
              )}
              {activeStep === 7 && (
                <div>
                  <>
                    <div className="mb-4">
                      <Results
                        exdata={exdata}
                        totalContributionScope={totalContributionScope}
                        souresdata={souresdata}
                        locatiodata={locatiodata}
                      />
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg h-[250px]">
            <div>
              <div className="text-left text-lg font-semibold">
                Report has been created
              </div>
              <div className="text-left text-sm text-gray-500 mb-8">
                The report has been created
              </div>
            </div>
            <div>
              <div className="text-left text-sm">Report Name</div>
              <div className="text-left text-sm text-blue-500 mb-8">
                {reportname}
              </div>
            </div>

            <div className="flex">
              <div className="px-4 py-1 border border-gary-400 me-4 text-black rounded-md h-[36px] w-[175px] text-center">
                <Link
                  href="/dashboard/Report"
                  className="text-black text-sm leading-[15px]"
                >
                  Back to Report
                </Link>
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-md w-[175px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="w-[10%]">
                  <MdDownload />
                </div>

                {loading ? (
                  <button className="font-bold px-2 flex justify-between">
                    <Oval
                      height={20}
                      width={20}
                      color="#fff"
                      margin
                      secondaryColor="#fff"
                      strokeWidth={2}
                      strokeWidthSecondary={2}

                    />
                    <p className="ml-2">Download</p>
                  </button>
                ) : (
                  <button
                    className="font-bold mx-4"
                  >
                    Download
                  </button>
                )}
                <div className="w-[15%]">
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="w-[11.3rem] bg-white shadow-xl z-10 float-right">
                <div className="px-3 mb-1 py-2">
                  <div className="mb-2">
                    <h5
                      className="text-blue-500 cursor-pointer text-sm flex"
                      onClick={handleDownloaddocx}
                    >
                      <MdFileDownload className="text-[18px]"/> Download as Docx
                    </h5>
                  </div>
                  <div>
                    <h5
                      className="text-blue-500 cursor-pointer text-sm flex"
                      onClick={handleDownloadpdf}
                    >
                      <MdFileDownload className="text-[18px]"/> Download as PDF
                    </h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
    </>
  );
}

export default Ghgtemplates;
