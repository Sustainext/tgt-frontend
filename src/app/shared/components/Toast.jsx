// ToastContent.jsx
import { MdCheckCircle, MdClose } from "react-icons/md";

const ToastMessage = ({ message, gradient, onClose }) => {
  return (
    <div
      className={`relative bg-white shadow-md rounded-md p-4 pt-5  w-[420px] animate-slide-in`}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 w-full h-0.5 rounded-t-md"
        style={{ background: gradient }}
      ></div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <MdClose size={24} />
      </button>

      {/* Content */}
      <div className="flex items-start pr-5">
        <MdCheckCircle className="text-green-600 mr-3 " size={26} />
        <div>
          <p className="font-semibold text-[#0D024D] text-[14px] mb-2">{message.header}</p>
          <p className="text-[#0D024D] text-[12px]">{message.body}</p>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
