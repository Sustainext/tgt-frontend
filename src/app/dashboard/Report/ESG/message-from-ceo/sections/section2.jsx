"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload } from "react-icons/md";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = () => {
  const [content, setContent] = useState(`
    <p>
Sincerely, <br/>
[Your Name] <br/>
Chief Executive Officer <br/>
[Company Name] 
 </p>     
    `);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageSrc, setImage] = useState("");
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

  const config = {
    style: {
      fontSize: "14px",
    },
    allowResizeY: false,
  };

  return (
    <>
      <div>
       
        <p className="text-[15px] text-[#344054] mb-2">Edit Signature Statement</p>
        <div className="mb-4">
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
            value={content}
            config={config}
            // tabIndex={1}
            // onBlur={handleEditorChange}
          />
        </div>
        <p className="text-[15px] text-[#344054] mb-2">Upload Signature Image:</p>
        <div className="flex mt-2 mb-4">
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
              <MdOutlineFileUpload className="mt-1" style={{fontSize:"16px"}} />
            </p>
            <p className="ml-2">Upload Image </p>
            
          </button>
        </div>
      </div>
    </>
  );
};

export default Section2;
