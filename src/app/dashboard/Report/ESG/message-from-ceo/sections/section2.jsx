"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload, MdFilePresent } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setCompanyname,
  setCeoname,
  setSignatureimage,
} from "../../../../../../lib/redux/features/ESGSlice/screen1Slice";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({ orgName }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const companyName = useSelector((state) =>state.screen1Slice.company_name );
  const ceoname = useSelector((state) => state.screen1Slice.ceo_name);
  const imagePreview = useSelector(
    (state) => state.screen1Slice.signature_image
  );

  const [imageviw2, setImageview2] = useState("");
  const handleCompanyname = (e) => {
    dispatch(setCompanyname(e.target.value));
    // setCompanyName(e.target.value)
  };
  const handleCeoname = (e) => {
    dispatch(setCeoname(e.target.value));
    // setCompanyName(e.target.value)
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    let errorMessages = "";

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "image/png") {
      errorMessages = "Only PNG images are allowed.";
    } else if (selectedFile.size > 1048576) {
      errorMessages = "Maximum file size allowed is 1MB";
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setImageview2(base64String);
    
        dispatch(setSignatureimage(base64String)); // Set the image preview
      };
      reader.readAsDataURL(selectedFile);
    }
    setError(errorMessages);

  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const config = {
    style: {
      fontSize: "14px",
      color: "#667085",
    },
    allowResizeY: false,
    defaultActionOnPaste: "insert_clear_html",
    toolbarSticky: false,
    toolbar: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "align",
      "outdent",
      "indent",
      "ul",
      "ol",
      "paragraph",
      "link",
      "table",
      "undo",
      "redo",
      "hr",
      "fontsize",
      "selectall",
    ],
    // Remove buttons from the extra buttons list
    removeButtons: [
      "fullsize",
      "preview",
      "source",
      "print",
      "about",
      "find",
      "changeMode",
      "paintFormat",
      "image",
      "brush",
      "font",
    ],
  };



  return (
    <>
      <div>
        <p className="text-[15px] text-[#344054] mb-2">
          Upload Signature Image:
        </p>
        {(imageviw2 || imagePreview) && (
          <div className="mb-4">
            <img 
              src={imageviw2 ? imageviw2 : `${imagePreview}`} 
              alt="CEO" 
              className="w-[150px] h-[150px] object-cover rounded-md" 
            />
          </div>
        )}
        <div className="flex gap-4 mt-2 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png"
          />
          <button
            onClick={handleButtonClick}
            className="flex bg-transparent py-2 text-center text-[#007EEF] text-[15px] rounded-md"
          >
            <p>
              <MdOutlineFileUpload className="mt-1" style={{ fontSize: "16px" }} />
            </p>
            <p className="ml-2">Upload Image</p>
          </button>
        </div>

      

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <p className="text-[15px] text-[#344054] mb-4">Sincerely,</p>
 
        <p className="text-[15px] text-[#344054] mb-2">CEO’s Name</p>
        <input
          type="text"
          placeholder="Enter CEO’s Name"
          className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm mb-4"
          value={ceoname}
          onChange={handleCeoname}
        />
        <p className="text-[15px] text-[#344054] mb-2">Company Name</p>
        <input
          onChange={handleCompanyname}
          type="text"
          placeholder="Enter Company Name"
          className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm"
          value={companyName}
        />
      </div>
    </>
  );
};

export default Section2;
