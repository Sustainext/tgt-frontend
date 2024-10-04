'use client'
import React, { useState, useEffect, useMemo } from "react";
import { MdDownload, MdEdit, MdDelete, MdKeyboardArrowDown, MdKeyboardArrowUp, MdOutlineWarningAmber } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from 'react-loader-spinner';

import axiosInstance,{del} from "@/app/utils/axiosMiddleware";
const TableWithPagination = ({ data, defaultItemsPerPage, fetchReoprts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [datadelete, setDelete] = useState();
  const [loopen, setLoOpen] = useState(false);
  const [sort, setSort] = useState({ column: null, direction: "asc" });
  const [loadingById, setLoadingById] = useState({});
  const [isOpen, setIsOpen] = useState(null);
  const [reportid, setReportid] = useState();
  const [reporttepname, setReportTepname] = useState();
  const router = useRouter();

  const togglePopup = (itemId, itemName) => {
    setIsOpen((currentOpenPopupId) => (currentOpenPopupId === itemId ? null : itemId));
    setReportid(itemId);
    setReportTepname(itemName);
  };
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const openModal = (id) => {
    setIsModalOpen(true);
    setDelete(id);
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
    router.push('/dashboard/Report/GHG/Ghgtemplates');

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
    router.push('/dashboard/Report/ESG');

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

    const reoprtid = datadelete;
    LoaderOpen();
    await del(
        `/sustainapp/ghgreport/${reoprtid}`,

      )
      .then((response) => {
        if (response.status === 204) {
          console.log(response.status);
          toast.success("Report has been delete successfully", {
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
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token')?.replace(/"/g, "");
    }
    return '';
};
const token = getAuthToken();
let axiosConfig = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
};
  const handleDownloadpdf = async () => {
    // Set loading to true for the specific item
    setLoadingById(prevState => ({ ...prevState, [reportid]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_pdf/${reportid}/?download=true`,axiosConfig
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
      setLoadingById(prevState => ({ ...prevState, [reportid]: false }));
      setIsOpen(null);
    }
  };
  const handleDownloaddocx = async () => {

    setLoadingById(prevState => ({ ...prevState, [reportid]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_word_download/${reportid}/`,axiosConfig

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
      setLoadingById(prevState => ({ ...prevState, [reportid]: false }));
      setIsOpen(null);
    }


  };

  const handleESGDownloadpdf = async () => {
    // Set loading to true for the specific item
    setLoadingById(prevState => ({ ...prevState, [reportid]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_pdf/${reportid}/?download=true`,axiosConfig
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
      setLoadingById(prevState => ({ ...prevState, [reportid]: false }));
      setIsOpen(null);
    }
  };
  const handleESGDownloaddocx = async () => {

    setLoadingById(prevState => ({ ...prevState, [reportid]: true }));

    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/report_word_download/${reportid}/`,axiosConfig

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
      setLoadingById(prevState => ({ ...prevState, [reportid]: false }));
      setIsOpen(null);
    }


  };

  return (
    <>
      <div>
        <table className="min-w-max w-full table-auto ">
          <thead className="py-3 px-6 text-left text-neutral-500 text-[13px] font-extrabold leading-none">
            <tr>
              <th
                className="py-3 px-6 text-left whitespace-nowrap font-extrabold text-[16px]"
                onClick={() => handleSort("name")}
              >
                <div className="flex">
                  Name
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
                className="py-3 px-6 text-left whitespace-nowrap font-extrabold text-[16px]"
                onClick={() => handleSort("report_type")}
              >
                <div className="flex">
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
                className="py-3 px-6 text-left whitespace-nowrap font-extrabold text-[16px]"
                onClick={() => handleSort("start_date")}
              >
                <div className="flex">
                  Start date{" "}
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
              <th
                className="py-3 px-6 text-left whitespace-nowrap font-extrabold text-[16px]"
                onClick={() => handleSort("end_date")}
              >
                <div className="flex">
                  End date{" "}
                  {sort.column === "end_date" ? (
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
                className="py-3 px-6 text-left whitespace-nowrap font-extrabold text-[16px]"
                onClick={() => handleSort("last_report_date")}
              >
                <div className="flex">
                  Created On{" "}
                  {sort.column === "last_report_date" ? (
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
              <th className="py-3 px-6 text-left whitespace-nowrap font-extrabold flex text-[16px]">
                Action{" "}
              </th>
            </tr>
          </thead>


          <tbody className="text-gray-600 text-sm font-light">
            {data.length > 0 &&
              currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 text-left"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap text-[16px]">
                    {item.name}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap text-[16px]">
                    {item.report_type}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap text-[16px]">
                    {item.start_date}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap text-[16px]">
                    {item.end_date}
                  </td>

                  <td className="py-3 px-6 text-left whitespace-nowrap text-[16px]">
                    {item.last_report_date}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap flex">
                    <MdEdit
                      onClick={() =>{
                        if(item.report_type=='GRI Report: In accordance With' || item.report_type=='GRI Report: With Reference to'){
                          handleSetESGdata(
                            item.id,
                            item.organization_name,
                            item.start_date,
                            item.end_date,
                            item.organization_country,
                            item.name
                          )
                        }
                        else{
                          handleSetdata(
                            item.id,
                            item.organization_name,
                            item.start_date,
                            item.end_date,
                            item.organization_country,
                            item.name
                          )
                        }
                      }
                       
                      }
                      className="cursor-pointer text-[25px]"
                    />
                    <MdDelete
                      onClick={() => openModal(item.id)}
                      className="cursor-pointer text-[25px]"
                    />

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
                      <>
                        <MdDownload
                          onClick={() => togglePopup(item.id, item.name)}
                          // onClick={() => handleDownload(item.id, item.name)}

                           className="cursor-pointer text-[25px]"
                        />

                        {isOpen === item.id && (
                          <div className="absolute right-0 w-[11.3rem] bg-white shadow-xl z-10">

                            <div className="px-3 mb-1 py-2">
                              <div className="mb-2"> <h5 className="text-drak cursor-pointer" onClick={()=>{
                                if(item.report_type=='GRI Report: In accordance With' || item.report_type=='GRI Report: With Reference to'){
                                  // handleESGDownloaddocx()
                                }
                                else{
                                    handleDownloaddocx()
                                }
                              }}>Download as Docx</h5></div>
                              <div>  <h5 className="text-drak cursor-pointer" onClick={()=>{
                                 if(item.report_type=='GRI Report: In accordance With' || item.report_type=='GRI Report: With Reference to'){
                                  // handleESGDownloadpdf()
                                }
                                else{
                                    handleDownloadpdf()
                                }
                              }}>Download as PDF</h5></div>

                            </div>

                          </div>

                        )}
                      </>
                    )}

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

          <div className="ml-4 flex">
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
        <thead className="py-3 px-6 text-left text-neutral-500 text-[13px] font-extrabold leading-none">
          <tr>
            {columns.map((columns) => (
              <th className="py-3 px-6 text-left whitespace-nowrap font-extrabold flex">
                {columns.Header} <KeyboardArrowDownIcon/>
              </th>
            ))}


          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">

            <tr

              className="border-b border-gray-200 hover:bg-gray-100 text-left"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
              sustinext new
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
              GHG Accounting Report
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
              2022-01-06
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
              2022-12-06
              </td>

              <td className="py-3 px-6 text-left whitespace-nowrap">
              2024-02-06
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">

              <a href="https://sustainextstorage1.blob.core.windows.net/sustainext/new-report-file.pdf" target="_blank" download="filename.pdf"> <DownloadIcon/></a>
              </td>
            </tr>

        </tbody>
      </table>


    </div>  */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg ml-40">
            <div className="div">
              <div className="mb-2 flex justify-center items-center">
                <MdOutlineWarningAmber
                  className="text-red-500"
                  fontSize="large"
                />
              </div>
              <div className="text-center mt-4 text-sm font-semibold mb-8">
                Are you sure you want to delete this report ?
              </div>
            </div>

            <div className="flex ml-4">
              <div className="flex items-center px-4  mr-4 py-2 bg-red-500 text-white rounded-md shadow-md">
                <div className=" w-[50%] ">
                  <MdDelete />
                </div>
                <button
                  className="px-2 font-bold bg-red-500 text-white "
                  onClick={handleDelete}
                // onClick={() =>
                //     confirmDelete(
                //      datadelete,

                //     )
                //   }
                >
                  Delete
                </button>
              </div>

              <button
                className="px-4 py-2 border border-red-500 w-[40%] text-red-500 font-bold rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
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
