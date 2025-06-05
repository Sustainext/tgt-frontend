// components/SuccessModal.jsx
import { FaCheckCircle } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im"; // spinner icon

const SuccessModal = ({ isOpen, onClose, onDownload, isDownloading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <div className="flex mb-4">
          <div>
            <FaCheckCircle className="text-green-500 text-2xl mt-0.5" />
          </div>
          <div className="ml-2">
            <h2 className="text-[16px] font-semibold text-gray-900">
              Report has been created.
            </h2>
            <p className="text-gray-500 mb-4 text-[14px]">
              To proceed, select an option from below.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 border text-[#667085] border-gray-300 rounded text-sm"
          >
            <IoMdExit />
            Exit to Report Module
          </button>

          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white text-sm ${
              isDownloading
                ? "bg-[#007EEF] opacity-60 cursor-not-allowed"
                : "bg-[#007EEF]"
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
                Download Report
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
