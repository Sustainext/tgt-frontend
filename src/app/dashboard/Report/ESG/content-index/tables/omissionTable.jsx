"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axiosInstance from "../../../../../utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";

const OmissionTable = ({
  setIsModalOpen,
  reportid,
  isOmissionSubmitted,
  setIsOmissionSubmitted,
  data,
  onSave,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loopen, setLoOpen] = useState(false);
  const [rowsPerPage] = useState(3);
  // const [tableData, setTableData] = useState(data?data.filter(item => !item.is_filled || (item.is_filled && item.omission[0].reason)):[]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const flattenESGData = (data) => {
    const flat = [];

    data.forEach((group) => {
      // General Disclosures (flat)
      if (group.items) {
        group.items.forEach((item) => {
          if (!item.is_filled || item.omission?.[0]?.reason) {
            flat.push({
              ...item,
              gri_standard: item.title, // Set as GRI column
            });
          }
        });
      }

      // Material Topics (nested sections)
      if (group.sections) {
        group.sections.forEach((section) => {
          section.sections?.forEach((subsection) => {
            subsection.items?.forEach((item) => {
              if (!item.is_filled || item.omission?.[0]?.reason) {
                flat.push({
                  ...item,
                  gri_standard: item.title, // Set as GRI column
                });
              }
            });
          });
        });
      }
    });

    return flat;
  };

  const [tableData, setTableData] = useState(data ? flattenESGData(data) : []);
  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const checkFormCompletion = () => {
    // const updatedData = tableData.map(row => ({
    //     ...row,
    //     is_filled: row.omission[0].reason && row.omission[0].explanation ? true : false
    // }));
    const updatedData = tableData.map((row) => ({
      ...row,
      is_filled:
        row.omission[0].reason && row.omission[0].explanation ? true : false,
    }));

    setTableData(updatedData);
    const allRowsFilled = updatedData.every((row) => row.is_filled);
    setIsFormComplete(allRowsFilled);
  };

  const handleInputChange = (index, field, value) => {
    // const updatedData = [...tableData];
    // updatedData[index].omission[0][field] = value;
    // setTableData(updatedData);
    const updatedData = [...tableData];
    updatedData[index].omission[0][field] = value;
    setTableData(updatedData);

    checkFormCompletion();
  };

  const getUpdatedOmissionData = (originalData, updatedFlatData) => {
    const updatedMap = new Map(updatedFlatData.map((item) => [item.key, item]));

    return originalData.map((group) => {
      if (group.items) {
        return {
          ...group,
          items: group.items.map((item) => {
            const updated = updatedMap.get(item.key);
            return updated ? { ...item, ...updated } : item;
          }),
        };
      }

      if (group.sections) {
        return {
          ...group,
          sections: group.sections.map((section) => ({
            ...section,
            sections: section.sections.map((subsection) => ({
              ...subsection,
              items: subsection.items.map((item) => {
                const updated = updatedMap.get(item.key);
                return updated ? { ...item, ...updated } : item;
              }),
            })),
          })),
        };
      }

      return group;
    });
  };

  const handleSubmit = async () => {
    // const updatedData = tableData;
    // const mergedData = data.map(item => updatedData.find(row => row.key === item.key) || item);
    // onSave(mergedData);

    // const dataToSubmit = { "items": mergedData };
    LoaderOpen();
    const updatedData = [...tableData];

    const fullUpdatedData = getUpdatedOmissionData(data, updatedData);
    onSave(updatedData); // optional: may not be needed if you're saving below

    const dataToSubmit = fullUpdatedData;
    const url = `${process.env.BACKEND_API_URL}/esg_report/content_index/${reportid}/`;

    try {
      const response = await axiosInstance.put(url, dataToSubmit);
      if (response.status === 200) {
        toast.success("Data saved successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsModalOpen(false);
        setIsOmissionSubmitted(true);
        LoaderClose();
      } else {
        LoaderClose();
        toast.error("Oops, something went wrong", {
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
    } catch (error) {
      LoaderClose();
      console.error("API call failed:", error);
      toast.error("Oops, something went wrong", {
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

  const columns = [
    { header: "GRI Standards and Other resources", subHeaders: [] },
    { header: "Disclosure", subHeaders: [] },
    { header: "Requirement omitted", subHeaders: [] },
    { header: "Reason", subHeaders: [] },
    { header: "Explanation", subHeaders: [] },
  ];

  return (
    <>
      <div className="overflow-x-auto table-scrollbar">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  colSpan={col.subHeaders.length || 1}
                  rowSpan={col.subHeaders.length ? 1 : 2}
                  className={`text-[12px] border-r px-4 py-4 border-b ${
                    col.subHeaders.length > 0 ? "text-center" : "text-left"
                  } min-w-[170px] xl:min-w-0`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
            <tr>
              {columns.map(
                (col, index) =>
                  col.subHeaders.length > 0 &&
                  col.subHeaders.map((subHeader, subIndex) => (
                    <th
                      key={subIndex}
                      className="text-[12px] border-r px-4 py-4"
                    >
                      {subHeader}
                    </th>
                  ))
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((row, index) => (
              <tr key={index} className="text-[13px] text-[#667085]">
                <td className="px-4 py-4 w-[300px] ">{row.title}</td>
                <td className="px-4 py-4 w-[100px] ">
                  {"GRI " + row.key || ""}
                </td>
                <td className="px-4 py-4 w-[100px] ">
                  {row.omission[0].req_omitted || ""}
                </td>
                <td className="px-4 py-4 w-[250px]">
                  <select
                    value={row.omission[0].reason || ""}
                    onChange={(e) =>
                      handleInputChange(
                        indexOfFirstRow + index,
                        "reason",
                        e.target.value
                      )
                    }
                    className="bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                  >
                    <option value="">Select reason</option>
                    <option value="Information unavailable/incomplete">
                      Information unavailable/incomplete
                    </option>
                    <option value="Not applicable">Not applicable</option>
                    <option value="Legal prohibitions">
                      Legal prohibitions
                    </option>
                    <option value="Confidentiality constraints">
                      Confidentiality constraints
                    </option>
                  </select>
                </td>
                <td className="px-4 py-4 w-[350px]">
                  <textarea
                    value={row.omission[0].explanation || ""}
                    onChange={(e) =>
                      handleInputChange(
                        indexOfFirstRow + index,
                        "explanation",
                        e.target.value
                      )
                    }
                    className="bg-white border border-gray-300 rounded-md w-full h-20 p-2"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`text-gray-600 px-4 py-2 rounded-lg ${
                currentPage === 1 ? "disabled text-[#727272]" : ""
              }`}
              disabled={currentPage === 1}
            >
              {"<"}
            </button>
            <div className="flex space-x-2">
              {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 ${currentPage === page ? 'bg-white border rounded-lg shadow-sm text-blue-400' : 'text-gray-700 hover:bg-gray-200 rounded-lg'}`}
                  >
                    {page}
                  </button>
                ))} */}
              {(() => {
                const pages = [];
                const pageBuffer = 1;

                for (let i = 1; i <= totalPages; i++) {
                  if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - pageBuffer &&
                      i <= currentPage + pageBuffer)
                  ) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-3 py-1.5 ${
                          currentPage === i
                            ? "bg-white border rounded-lg shadow-sm text-blue-400"
                            : "text-gray-700 hover:bg-gray-200 rounded-lg"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  } else if (
                    i === currentPage - pageBuffer - 1 ||
                    i === currentPage + pageBuffer + 1
                  ) {
                    pages.push(
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-gray-400"
                      >
                        ...
                      </span>
                    );
                  }
                }

                return pages;
              })()}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`text-gray-600 px-4 py-2 rounded-lg ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              disabled={currentPage === totalPages}
            >
              {">"}
            </button>
          </div>
        )}

        <div className="xl:flex xl:justify-end  mt-4 w-[860px] xl:w-full">
          <button
            data-tooltip-id={`tooltip-env`}
            data-tooltip-html={
              isFormComplete
                ? ""
                : "Provide reason for omission for all the disclosures to proceed further"
            }
            onClick={handleSubmit}
            className={`bg-blue-500 text-white px-3 py-2 rounded-lg float-end ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete}
          >
            Save & Proceed to Preview Content Index {">"}
          </button>
        </div>
      </div>
      <ReactTooltip
        id={`tooltip-env`}
        place="top"
        effect="solid"
        style={{
          width: "300px",
          backgroundColor: "#000",
          color: "white",
          fontSize: "12px",
          boxShadow: 3,
          borderRadius: "8px",
        }}
      ></ReactTooltip>
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

export default OmissionTable;
