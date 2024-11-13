"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  MdDownload,
  MdEdit,
  MdDeleteOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineWarningAmber,
  MdMoreVert,
  MdOutlineEmail,
} from "react-icons/md";
import {
  BsFileEarmarkPdf,
  BsFileEarmarkWord,
  BsDownload,
} from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

import axiosInstance, { del } from "@/app/utils/axiosMiddleware";

const TableWithPagination = ({ data, defaultItemsPerPage, fetchReoprts,isMenuOpen,setIsMenuOpen }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDelete, setDelete] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [sort, setSort] = useState({ column: null, direction: "asc" });
  const [loadingByIdpdf, setLoadingByIdpdf] = useState({});
  const [loadingById, setLoadingById] = useState({});
  const [isOpen, setIsOpen] = useState(null);
  const [reportid, setReportid] = useState();
  const [reporttepname, setReportTepname] = useState();
  const router = useRouter();

  const ActionMenu = ({ item }) => {
    const isGRIReport = item.report_type === "GRI Report: In accordance With" || item.report_type === "GRI Report: With Reference to";
    return (
      <div className="absolute bg-white shadow-lg rounded-lg py-2 mt-5 w-[211px] z-10 right-8">
        <button
          className={`flex items-center p-2 w-full text-left text-[#344054] gradient-sky-blue`}
          onClick={() => {
            if (isGRIReport) {
              handleDownloadESGpdf(item.id,item.name)
            } else {
              handleDownloadpdf(item.id, item.name);
            }
          }}
        >
          {loadingByIdpdf[item.id] ? (
            <Oval
              height={20}
              width={20}
              color="#00BFFF"
              secondaryColor="#f3f3f3"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <BsFileEarmarkPdf className="mr-2" />
          )}
          Download Report PDF
        </button>
  
        <button
          className={`flex items-center p-2 w-full text-left   ${isGRIReport ? 'text-[#d1d5db]' : 'text-[#344054] gradient-sky-blue'}`}
          onClick={() => {
            if (isGRIReport) {
              // handleESGDownloaddocx()
            } else {
              handleDownloaddocx(item.id, item.name);
            }
          }}
        >
          {loadingById[item.id] ? (
            <Oval
              height={20}
              width={20}
              color="#00BFFF"
              secondaryColor="#f3f3f3"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <BsFileEarmarkWord className="mr-2" />
          )}
          Download Report Word
        </button>
  
        {/* Conditional Rendering for Additional GRI Options */}
        {isGRIReport && (
          <>
            <button className="flex items-center p-2 w-full text-left h text-[#d1d5db]">
              <BsDownload className="mr-2 text-[#d1d5db]" /> Download Content Index
            </button>
            <button
              onClick={() => console.log("Notify GRI")}
              className="flex items-center p-2 w-full text-left  text-[#d1d5db]"
            >
              <MdOutlineEmail className="mr-2 text-[#d1d5db]" /> Notify GRI
            </button>
          </>
        )}
  
        <button
          className={`flex items-center p-2 w-full text-left gradient-sky-blue  text-[#344054]`}
          onClick={() => {
            if (isGRIReport) {
              handleSetESGdata(
                item.id,
                item.organization_name,
                item.start_date,
                item.end_date,
                item.organization_country,
                item.name
              );
            } else {
              handleSetdata(
                item.id,
                item.organization_name,
                item.start_date,
                item.end_date,
                item.organization_country,
                item.name,
                item.report_by,
                item.corporate_name
              );
            }
          }}
        >
          <AiOutlineEdit className="mr-2" /> Edit Report
        </button>
  
        <button
          className="flex items-center p-2 w-full text-left gradient-sky-blue  text-[#344054]"
          onClick={() =>
            openModal(item.id, item.name, item.report_type, item.start_date)
          }
        >
          <MdDeleteOutline className="mr-2" /> Delete Report
        </button>
      </div>
    );
  };
  
  const toggleMenu = (itemId) => {
    setIsMenuOpen(isMenuOpen === itemId ? null : itemId);
  };

  const togglePopup = (itemId, itemName) => {
    setIsOpen((currentOpenPopupId) =>
      currentOpenPopupId === itemId ? null : itemId
    );
    setReportid(itemId);
    setReportTepname(itemName);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const openModal = (id, name, report_type, start_date) => {
    setIsModalOpen(true);
    setDelete({ id, name, report_type, start_date });
    setIsMenuOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle the download

  const handleSetdata = (
    id,
    organization_name,
    startdate,
    enddate,
    organization_country,
    name,
    report_by,
    corporate_name
  ) => {
    const newdata = {
      id: id,
      organization_name: organization_name,
      start_date: startdate,
      end_date: enddate,
      country_name: organization_country,
      reportname: name,
      report_by: report_by,
    };
    window.localStorage.setItem("reportid", id);

    window.localStorage.setItem("reportstartdate", startdate);
    window.localStorage.setItem("reportenddate", enddate);
    window.localStorage.setItem("organizationcountry", organization_country);
    window.localStorage.setItem("reportby", report_by);
    if (report_by == "Corporate") {
      if (corporate_name == undefined) {
        window.localStorage.setItem("reportorgname", organization_name);
      } else {
        window.localStorage.setItem("reportorgname", corporate_name);
      }
    } else {
      window.localStorage.setItem("reportorgname", organization_name);
    }
    // sessionStorage.setItem('reportData',newdata);
    router.push("/dashboard/Report/GHG/Ghgtemplates");

    window.localStorage.setItem("reportname", name);
  };

  const handleSetESGdata = (
    id,
    organization_name,
    startdate,
    enddate,
    organization_country,
    name
  ) => {
    const newdata = {
      id: id,
      organization_name: organization_name,
      start_date: startdate,
      end_date: enddate,
      country_name: organization_country,
      reportname: name,
    };
    window.localStorage.setItem("reportid", id);
    window.localStorage.setItem("reportorgname", organization_name);
    window.localStorage.setItem("reportstartdate", startdate);
    window.localStorage.setItem("reportenddate", enddate);
    window.localStorage.setItem("organizationcountry", organization_country);
    // sessionStorage.setItem('reportData',newdata);
    router.push("/dashboard/Report/ESG");

    window.localStorage.setItem("reportname", name);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Change items per page
  const onItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastItemIndex = Math.min(currentPage * itemsPerPage, data.length);

  const handleDelete = async () => {
    LoaderOpen();
    const reportId = dataDelete.id;

    await axiosInstance
      .delete(`/sustainapp/ghgreport/${reportId}`)
      .then((response) => {
        if (response.status === 204) {
          const { name, report_type, start_date } = dataDelete;
          const year = new Date(start_date).getFullYear();

          toast.error(
            <div>
              <div className="mb-2 flex">
                <div className="bg-[#fff1f2] rounded-full p-2">
                  <MdDeleteOutline
                    className="text-[#D64564]"
                    fontSize="large"
                  />
                </div>
                <div className="ml-2 flex items-center">
                  <p className="text-[#344054] text-[14px]">Report Deleted</p>
                </div>
              </div>
              <div>
                <p className="text-[#344054] text-[12px] ml-2">{`${name} ${report_type} ${year} has been successfully deleted.`}</p>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: false,
            }
          );

          LoaderClose();
          fetchReoprts();
          closeModal();
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
          fetchReoprts();
          closeModal();
        }
      });
  };
  const handleSort = (column) => {
    const isAsc = sort.column === column && sort.direction === "asc";
    setSort({ column, direction: isAsc ? "desc" : "asc" });
  };

  // Sorting data
  // Sorting data
  const sortedData = useMemo(() => {
    if (sort.column) {
      return [...data].sort((a, b) => {
        const columnA = a[sort.column];
        const columnB = b[sort.column];
        if (columnA < columnB) {
          return sort.direction === "asc" ? -1 : 1;
        }
        if (columnA > columnB) {
          return sort.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    } else {
      // If no column is selected for sorting, return the original data
      return data;
    }
  }, [data, sort]);

  const currentItems = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")?.replace(/"/g, "");
    }
    return "";
  };
  const token = getAuthToken();
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const handleDownloadESGpdf = async (id,name) => {
    setLoadingByIdpdf((prevState) => ({ ...prevState, [id]: true }));
    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/esg_report/esg_report_pdf/${id}/?download=true`,
        axiosConfig
      );
  
      if (!response.ok) {
        setLoadingByIdpdf((prevState) => ({ ...prevState, [id]: false }));
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
       
      }
  
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${name}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setLoadingByIdpdf((prevState) => ({ ...prevState, [id]: false }));
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  
  const handleDownloadpdf = async (id, name) => {
    // Set loading to true for the specific item
    setLoadingByIdpdf((prevState) => ({ ...prevState, [id]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_pdf/${id}/?download=true`,
        axiosConfig
      );
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${name}.pdf`); // Setting the file name dynamically
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      // Set loading to false for the specific item
      setLoadingByIdpdf((prevState) => ({ ...prevState, [id]: false }));
      setIsMenuOpen(false);
    }
  };
  const handleDownloaddocx = async (id, name) => {
    setLoadingById((prevState) => ({ ...prevState, [id]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_word_download/${id}/`,
        axiosConfig
      );

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${name}.docx`); // Setting the file name dynamically
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    } finally {
      // Set loading to false for the specific item
      setLoadingById((prevState) => ({ ...prevState, [id]: false }));
      setIsMenuOpen(false);
    }
  };

  const handleESGDownloaddocx = async () => {
    setLoadingById((prevState) => ({ ...prevState, [reportid]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_word_download/${reportid}/`,
        axiosConfig
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
      setLoadingById((prevState) => ({ ...prevState, [reportid]: false }));
      setIsOpen(null);
    }
  };

  return (
    <>
      <div>
        <table className="min-w-max w-full table-auto ">
          <thead className="py-3 px-6 text-center text-[#727272] text-[13px] font-extrabold leading-none gradient-background">
            <tr>
              <th
                className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]"
                onClick={() => handleSort("name")}
              >
                <div className="flex justify-center">
                  Name of report
                  {sort.column === "name" ? (
                    sort.direction === "asc" ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
              </th>
              <th
                className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]"
                onClick={() => handleSort("report_type")}
              >
                <div className="flex justify-center">
                  Report type{" "}
                  {sort.column === "report_type" ? (
                    sort.direction === "asc" ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
              </th>
              <th
                className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]"
                onClick={() => handleSort("start_date")}
              >
                <div className="flex justify-center">
                  Time Period{" "}
                  {sort.column === "start_date" ? (
                    sort.direction === "asc" ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
              </th>
              <th className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]">
                <div className="flex justify-center">Created by</div>
              </th>
              <th className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]">
                <div className="flex justify-center">Last Edited on </div>
              </th>
              <th className="py-3 px-6 text-center  whitespace-nowrap font-[400] text-[12px]">
                <div className="flex justify-center">Last Edited by </div>
              </th>
              <th className="py-3 px-6 text-center whitespace-nowrap font-extrabold flex justify-center text-[12px]">
                Action{" "}
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {data.length > 0 &&
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200  text-center"
                >
                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.name}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.report_type}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.start_date} to {item.end_date}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.created_by}
                  </td>

                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.last_report_date}
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap text-[12px] text-[#343A40]">
                    {item.created_by}
                  </td>
                  <td className="py-3 px-6 relative text-center flex justify-center">
                    <MdMoreVert
                      onClick={() => toggleMenu(item.id)}
                      className="cursor-pointer"
                    />
                    {isMenuOpen === item.id && <ActionMenu item={item} />}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="justify-end items-center gap-2 flex w-[100%] mt-4">
          <div>
            <label className="text-black text-opacity-60 text-xs font-normal leading-[15px] text-[15px]">
              Rows per page:
            </label>
            <select
              value={itemsPerPage}
              onChange={onItemsPerPageChange}
              className="text-black  text-xs font-normal leading-[15px]"
            >
              {[5, 10, 15, 20].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-4 flex mr-1">
            <div>
              <span className="text-black  text-xs font-normal leading-[15px] text-[15px]">{`${firstItemIndex}-${lastItemIndex} of ${data.length}`}</span>
            </div>

            <div className="ml-4 mt-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-black   font-normal leading-[15px] text-[25px]"
              >
                {"<"}
              </button>
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-black  font-normal leading-[15px] text-[25px]"
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-16">
      <table className="min-w-max w-full table-auto ">
        <thead className="py-3 px-6 text-center text-neutral-500 text-[13px] font-extrabold leading-none">
          <tr>
            {columns.map((columns) => (
              <th className="py-3 px-6 text-center whitespace-nowrap font-extrabold flex">
                {columns.Header} <KeyboardArrowDownIcon/>
              </th>
            ))}


          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">

            <tr

              className="border-b border-gray-200 hover:bg-[#e0f2fe] text-center"
            >
              <td className="py-3 px-6 text-center whitespace-nowrap">
              sustinext new
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
              GHG Accounting Report
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
              2022-01-06
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">
              2022-12-06
              </td>

              <td className="py-3 px-6 text-center whitespace-nowrap">
              2024-02-06
              </td>
              <td className="py-3 px-6 text-center whitespace-nowrap">

              <a href="https://sustainextstorage1.blob.core.windows.net/sustainext/new-report-file.pdf" target="_blank" download="filename.pdf"> <DownloadIcon/></a>
              </td>
            </tr>

        </tbody>
      </table>


    </div>  */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6  rounded-lg shadow-lg ml-40 w-[513px]">
            <div>
              <div className="mb-2 flex">
                <div className="bg-[#fff1f2] rounded-full p-2">
                  <MdDeleteOutline
                    className="text-[#D64564] "
                    fontSize="large"
                  />
                </div>
                <div className="ml-2 flex items-center">
                  <p className="text-[#344054] text-[18px]"> Delete Report</p>
                </div>
              </div>
              <div className="text-left mt-4 text-[14px] font-[400] mb-4  text-[#667085]">
                This process will delete the report and the action is
                irreversible. Are you sure you want to delete this report?
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-[50%]">
                <button
                  className="px-4 py-2 border border-[#727272]  w-full text-[#727272] font-bold rounded text-[12px]"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>

              <div className="w-[50%]">
                <button
                  className="px-4 py-2 border border-[#EF5350] w-full text-white bg-[#EF5350] font-bold rounded text-[12px]"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
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
};

export default TableWithPagination;
