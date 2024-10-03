"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload,MdFilePresent } from "react-icons/md";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section2 = ({orgName}) => {
  const [content, setContent] = useState(`
    <p>
Sincerely, <br/>
[Your Name] <br/>
Chief Executive Officer <br/>
${orgName?orgName:"[Company Name]"}
 </p>     
    `);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [imageSrc, setImage] = useState("");
  const [companyName,setCompanyName] = useState(orgName)

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  const handleCompanyname=(e)=>{
    setCompanyName(e.target.value)
  }

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
      color:"#667085"
    },
    allowResizeY: false,
    defaultActionOnPaste: 'insert_clear_html',
    toolbarSticky: false,
    toolbar: true,
    buttons: [
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'align',
        'outdent',
        'indent',
        'ul',
        'ol',
        'paragraph',
        'link',
        'table',
        'undo',
        'redo',
        'hr',
        'fontsize',
        'selectall'
    ],
    // Remove buttons from the extra buttons list
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode','paintFormat','image','brush','font'],
  };


  const handleEditorChange=(value)=>{
    setContent(value)
  }

  return (
    <>
      <div>
      <p className="text-[15px] text-[#344054] mb-2">Upload Signature Image:</p>
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
              <MdOutlineFileUpload className="mt-1" style={{fontSize:"16px"}} />
            </p>
            <p className="ml-2">Upload Image </p>
            
          </button>
          {imageSrc.name?(
            <label className="flex">
            <div className="flex items-center text-center mt-2">
              <div className="truncate text-sky-600 text-[12px] flex text-center">
                <MdFilePresent className="w-6 h-6 mr-1 text-green-500" /> {imageSrc.name}
              </div>
            </div>
          </label>
          ):(<div></div>)}
          
        </div>
        <p className="text-[15px] text-[#344054] mb-4">Sincerely,</p>
        {/* <p className="text-[15px] text-[#344054] mb-2">Edit Signature Statement</p>
        <div className="mb-4">
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
            value={content}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div> */}
  <p className="text-[15px] text-[#344054] mb-2">CEO’s Name</p>
  <input type="text" placeholder="Enter CEO’s Name" className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm mb-4"/>
  <p className="text-[15px] text-[#344054] mb-2">Company Name</p>
  <input onChange={handleCompanyname} type="text" placeholder="Enter Company Name" className="border border-gray-300 height-[44px] px-2 py-3 rounded-md text-[13px] w-full bg-white shadow-sm" value={companyName}/>
      
      </div>
    </>
  );
};

export default Section2;
