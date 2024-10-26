'use client';
import { useState, useEffect } from "react";

const OmissionTable = ({ setIsModalOpen, isOmissionSubmitted, setIsOmissionSubmitted, data, onSave }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(3);
    const [tableData, setTableData] = useState(data);
    const [isFormComplete, setIsFormComplete] = useState(false);
  
    // Helper function to calculate the displayed rows
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);
  
    // Check if the form is fully completed
    const checkFormCompletion = () => {
    //   const allRowsFilled = tableData.every(row => row.omission[0].reason && row.omission[0].explanation);
    //   setIsFormComplete(allRowsFilled);
    const updatedData = tableData.map(row => {
        const isFilled = row.omission[0].reason && row.omission[0].explanation?true:false;
        return {
          ...row,
          is_filled: isFilled // Update the is_filled property based on reason and explanation
        };
      });
      setTableData(updatedData);
  
      // Check if all rows are filled to enable the Save button
      const allRowsFilled = updatedData.every(row => row.is_filled);
      setIsFormComplete(allRowsFilled);
    };
  
    const handleInputChange = (index, field, value) => {
      const updatedData = [...tableData];
      updatedData[index].omission[0][field] = value; // Update omission data
      setTableData(updatedData);
      checkFormCompletion();
    };
  
    const handleSubmit = () => {
      console.log(tableData,"look")  
      onSave(tableData); // Pass updated data to parent
      setIsModalOpen(false);
      setIsOmissionSubmitted(true);
    };
  
    const columns = [
      { header: "GRI Standards and Other resources", subHeaders: [] },
      { header: "Disclosure", subHeaders: [] },
      { header: "Requirement omitted", subHeaders: [] },
      { header: "Reason", subHeaders: [] },
      { header: "Explanation", subHeaders: [] }
    ];
  
    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                {columns.map((col, index) => (
                  <th 
                    key={index}
                    colSpan={col.subHeaders.length || 1}
                    rowSpan={col.subHeaders.length ? 1 : 2}
                    className={`text-[12px] border-r px-4 py-4 border-b ${col.subHeaders.length > 0 ? 'text-center' : 'text-left'}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
              <tr>
                {columns.map((col, index) =>
                  col.subHeaders.length > 0 &&
                  col.subHeaders.map((subHeader, subIndex) => (
                    <th key={subIndex} className="text-[12px] border-r px-4 py-4">
                      {subHeader}
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.map((row, index) => (
                <tr key={index} className="text-[13px] text-[#667085]">
                  <td className="px-4 py-4 w-[20%]">{row.title}</td>
                  <td className="px-4 py-4 w-[10%]">{row.page_number || ""}</td>
                  <td className="px-4 py-4 w-[10%]">{row.omission[0].req_omitted || ""}</td>
                  <td className="px-4 py-4 w-[25%]">
                    <select
                      value={row.omission[0].reason || ''}
                      onChange={(e) => handleInputChange(indexOfFirstRow + index, 'reason', e.target.value)}
                      className="bg-white border border-gray-300 rounded-md px-2 py-1 w-full"
                    >
                      <option value="">Select reason</option>
                      <option value="Information unavailable/incomplete">Information unavailable/incomplete</option>
                      <option value="Not applicable">Not applicable</option>
                      <option value="Legal prohibitions">Legal prohibitions</option>
                      <option value="Confidentiality constraints">Confidentiality constraints</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 w-[35%]">
                    <textarea
                      value={row.omission[0].explanation || ''}
                      onChange={(e) => handleInputChange(indexOfFirstRow + index, 'explanation', e.target.value)}
                      className="bg-white border border-gray-300 rounded-md w-full h-20 p-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={`text-gray-600 px-4 py-2 rounded-lg ${currentPage === 1 ? 'disabled text-[#727272]' : ''}`}
                disabled={currentPage === 1}
              >
               {"<"}
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 ${currentPage === page ? 'bg-white border rounded-lg shadow-sm text-blue-400' : ''}`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={`text-gray-600 px-4 py-2 rounded-lg ${currentPage === totalPages ? 'disabled' : ''}`}
                disabled={currentPage === totalPages}
              >
                {">"}
              </button>
            </div>
          )}
  
          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className={`bg-blue-500 text-white px-3 py-2 rounded-lg ${!isFormComplete ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormComplete}
            >
              Save & Proceed to Preview Content Index {">"}
            </button>
          </div>
        </div>
      </>
    );
  };
  
  

export default OmissionTable;
