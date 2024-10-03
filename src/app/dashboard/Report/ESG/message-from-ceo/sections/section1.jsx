"use client";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload, MdOutlinePlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, setMessageimage } from "../../../../../../lib/redux/features/ESGSlice/screen1Slice";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({ orgName }) => {
  const content = useSelector(state => state.screen1Slice.message);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const imagePreview = useSelector(state => state.screen1Slice.message_image); 
  const [imageviw, setImageview] = useState("");

  const loadContent = () => {
    dispatch(setMessage(`
      <p>At ${orgName ? orgName : "[Company Name]"}, our commitment to sustainability and responsible business practices is deeply rooted in our mission and values. As a leading manufacturing company, we recognize our role in driving positive environmental, social, and governance (ESG) impacts. This ESG report, aligned with the Global Reporting Initiative (GRI) standards, marks a significant milestone in our journey towards greater transparency and accountability. 
       <br/>
       Environmental Stewardship
       <br/>
       The industrial sector plays a critical role in addressing climate change and environmental degradation. At ${orgName ? orgName : "[Company Name]"}, we have implemented
       <br/>
       Social Responsibility<br/>
       People are at the heart of our success. We are dedicated to fostering a diverse, inclusive, and equitable workplace where all employees feel valued and empowered
       <br/>
       Governance and Ethical Conduct <br/>
       Strong governance is the foundation of our business integrity and long-term success. We have reinforced our governance structures to ensure robust oversight and accountability at all levels of the organization. Our Board of Directors is committed to<br/>
       Looking Ahead <br/>
       As we look to the future, we are committed to further integrating ESG considerations into our core business strategy. We will continue to innovate. <br/>
       Thank you for your continued trust and support. <br/>
      </p>
    `));
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
        setImageview(base64String);
        dispatch(setMessageimage(base64String)); 
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
      color: "#667085"
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
    removeButtons: ['fullsize', 'preview', 'source', 'print', 'about', 'find', 'changeMode', 'paintFormat', 'image', 'brush', 'font'],
  };

  const handleEditorChange = (value) => {
    dispatch(setMessage(value));
  };

  return (
    <>
      <div>
        <p className="text-[15px] text-[#344054] mb-2">Upload CEO’s Image:</p>
        {(imageviw || imagePreview) && (
          <div className="mb-4">
            <img 
              src={imageviw ? imageviw : `${imagePreview}`} 
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

        <div className="flex justify-between">
          <p className="text-[15px] text-[#344054] mb-2">Add message from CEO</p>
          <button
            className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-4 flex"
            onClick={loadContent}
          >
            <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]" />
            Auto Fill
          </button>
        </div>

        <div className="mb-4">
          <JoditEditor
            value={content}
            config={config}
            tabIndex={1}
            onBlur={handleEditorChange}
          />
        </div>
      </div>
    </>
  );
};

export default Section1;
