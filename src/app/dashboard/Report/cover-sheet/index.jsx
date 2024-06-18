'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import valentaimage from "../../../../../public/sustainext.png"; // Update the import path
import { MdOutlineCloudUpload } from "react-icons/md";

function CoverSheet({
  display,
  imageSrc,
  setSelectedImage,
  selectedImage,
  setImage,
}) {
  const [imageName, setImageName] = useState(null);
  const [errorimg, setErrorimg] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const reportname = typeof window !== 'undefined' ? localStorage.getItem("reportname") : '';

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

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
        localStorage.setItem("selectedImage", base64String);
        setSelectedImage(reader.result);
        setImage(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
    setError(errorMessages);
  };

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="box rounded-lg p-4 h-[497px]">
        <div className="flex items-center justify-between">
          <div className="flex mt-5">
            <h1 className="text-lg">
              <p className="text-gray-500">Organisation name</p>
            </h1>
            <h1 className="ml-2">-</h1>
            <h1 className="text-lg text-gray-500 ml-2">{reportname}</h1>
          </div>
          <div className="flex mt-5">
            <h1 className="text-lg">
              <p className="text-gray-500">Year</p>
            </h1>
            <h1 className="ml-2">:</h1>
            <h1 className="text-lg text-gray-500 ml-2">{display}</h1>
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <div>
            <div className="mt-4 w-[150px]">
              <Image
                src={selectedImage || imageSrc || valentaimage}
                alt="Organization"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png"
          />
          <button onClick={handleButtonClick} className="flex bg-blue-600 px-4 py-2 text-center text-white text-[15px] rounded-md">
            <p>Upload Image </p><p><MdOutlineCloudUpload className="ml-2 mt-1"/></p>
          </button>
        </div>
        <div>
          <h1 className="text-sm mt-2 text-gray-500">
            Upload image file of organization
          </h1>
          {error && <p className="text-gray-500 text-sm mt-4">{error}</p>}
        </div>
        <div className="mt-5 flex mb-12">
          <h1 className="text-sm text-left">
            <b>Provided by -</b>
          </h1>
          <h1 className="text-sm text-left ml-2">
            <b>Sustainext</b>
          </h1>
        </div>
      </div>

    </>
  );
}

export default CoverSheet;
