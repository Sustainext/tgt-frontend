import React, { useState } from "react";
import { MdCheckCircle, MdWarning, MdCheck, MdClose } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const ResultModal = ({ result, modleClose, onConfirm, errorFileBase64 }) => {
  if (!result) return null;

  const { status, total, success, failed } = result;
  const isSuccess = status === 200;
  const totalEntries = total || success + failed;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    if (!errorFileBase64) return;

    setIsDownloading(true);
    try {
      const byteCharacters = atob(errorFileBase64);
      const byteNumbers = Array.from(byteCharacters).map((char) =>
        char.charCodeAt(0)
      );
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "import-errors.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading base64 file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[460px] max-w-full px-6 py-6 relative">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          {isSuccess ? (
            <MdCheckCircle size={24} className="text-green-600" />
          ) : (
            <MdWarning size={24} className="text-yellow-500" />
          )}
          {isSuccess ? "Upload Successful" : "Import Incomplete"}
        </h2>

        <p
          className={`text-sm text-gray-600 mb-6 ${
            !isSuccess ? "border-b border-gray-200 pb-4" : ""
          }`}
        >
          {isSuccess
            ? "All rows have been successfully validated and are ready to be imported."
            : "Some rows could not be imported due to errors. Please review the log for details."}
        </p>

        <div className="text-sm mb-4 space-y-2">
          {!isSuccess && (
            <p className="text-gray-700 mb-4">
              Total Entries: <span className=" text-gray-500">{total}</span>
            </p>
          )}
          <p className="flex items-center text-gray-700">
            <MdCheck className="text-green-600 text-[19px] mr-2" />
            Successfully Imported:{" "}
            <span className="text-gray-500">{success} entries</span>
          </p>
          {!isSuccess && (
            <p className=" text-gray-700 flex mb-2 ">
              <MdClose className="text-[#D91F11] text-[19px] mr-2" />
              Failed to Import:{" "}
              <span className=" text-gray-500">{failed} entries</span>
            </p>
          )}
        </div>

        {!isSuccess && errorFileBase64 && (
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center  py-2 rounded-md text-[#007EEF] text-sm ${
              isDownloading
                ? "cursor-not-allowed opacity-60"
                : "hover:underline"
            }`}
          >
            {isDownloading ? (
              <>
                <ImSpinner2 className="animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FiDownload className="mr-1" />
                Download the log
                <span className="text-[#727272] ml-0.5">
                  to view full details
                </span>
              </>
            )}
          </button>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={modleClose}
            className="px-4 py-2 rounded-md border text-gray-600 text-sm"
          >
            Cancel
          </button>
          {success > 0 && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md bg-[#007EEF] text-white text-sm"
            >
              Import Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
