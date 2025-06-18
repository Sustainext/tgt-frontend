"use client";
import React, { useState } from "react";
import BulkfileUpload from "../../../shared/components/bulkfileUpload";
import { MdClose } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import ResultModal from "./ResultModal";
import axiosInstance from "@/app/utils/axiosMiddleware";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkImportModal = ({ isOpen, onClose, setIsModalOpen, showToast }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [tempId, setTempId] = useState(null);
  const [errorFileBase64, setErrorFileBase64] = useState(null);
  const [loopen, setLoOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };
  const modleClose = () => {
    setIsResultModalOpen(false);
    setUploadResult(null);
    setTempId(null);
    setErrorFileBase64(null);
    setSelectedFile(null);
    setIsFileUploaded(false);
    setIsModalOpen(false);
    showToast(
      "Import cancelled",
      "Import action has been cancelled.",
      "linear-gradient(to right, #F98845, #00AEEF)"
    );
  };
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(
        `${process.env.BACKEND_API_URL}/sustainapp/download-emission-excel-template/?download=true`,
        {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("token")?.replace(/"/g, ""),
          },
        }
      );
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `emission-excel-template.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setIsFileUploaded(true);
  };

  const handleUpload = async () => {
    LoaderOpen();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post(
        "/sustainapp/bulk-upload-emission-data/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const {
        row_status,
        total,
        valid_count,
        invalid_count,
        temp_id,
        error_file_base64,
      } = response.data;

      setUploadResult({
        status: row_status,
        total: total || valid_count + invalid_count,
        success: valid_count,
        failed: invalid_count,
        logUrl: null,
      });

      setTempId(temp_id || null);
      setErrorFileBase64(error_file_base64 || null);
      LoaderClose();
      setIsResultModalOpen(true);
    } catch (error) {
      const massge = error.response?.data?.message
        toast.error(massge, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      console.error("Unexpected error:", error);
      LoaderClose();
    }
  };

  const handleConfirmImport = async () => {
    if (!tempId) return;
    LoaderOpen();

    try {
      const response = await axiosInstance.post(
        "/sustainapp/bulk-upload-confirm/",
        { temp_id: tempId }
      );

      if (response.status === 200) {
        console.log("test reposr");
        const msg = response.data?.message;

        showToast(
          msg?.header || "Import Successful",
          msg?.body || "Data has been imported successfully.",
          msg?.gradient || "linear-gradient(to right, #F98845, #6ADF23)"
        );

        setUploadResult(null);
        setTempId(null);
        setErrorFileBase64(null);
        setIsModalOpen(false);
        setIsResultModalOpen(false);
      } else {
        toast.error("Import failed. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        setIsModalOpen(false);
        setIsResultModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to confirm import:", err);
      toast.error("An error occurred while confirming import.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } finally {
      LoaderClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isResultModalOpen ? (
        <ResultModal
          result={uploadResult}
          errorFileBase64={errorFileBase64}
          modleClose={modleClose}
          onConfirm={handleConfirmImport}
        />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ">
          <div className="bg-white rounded-lg shadow-lg w-[400px] max-w-full px-6 py-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-lg font-semibold mb-2">
              Import Data - GHG Emissions
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Import data to the table from the template.
            </p>

            <div className="mb-2">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex items-center gap-2 py-2 rounded-md text-[#007EEF] text-sm ${
                  isDownloading ? "cursor-not-allowed" : ""
                }`}
              >
                {isDownloading ? (
                  <>
                    <ImSpinner2 className="animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FiDownload />
                    Download Template
                  </>
                )}
              </button>
            </div>

            <p className="text-[14px] mb-1">Upload file</p>
            <BulkfileUpload
              onFileSelect={handleFileSelect}
              format="Excel (.xlsx)"
              setIsFileUploaded={setIsFileUploaded}
              accept={true}
            />

            <button
              className={`mt-4 py-2 rounded-md text-white text-sm float-end px-8 text-center ${
                isFileUploaded
                  ? "bg-[#007EEF] hover:bg-[#006acc]"
                  : "bg-[#007EEF] opacity-35 cursor-not-allowed"
              }`}
              disabled={!isFileUploaded}
              onClick={handleUpload}
            >
              Upload
            </button>
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

export default BulkImportModal;
