"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MdOutlineFileUpload,MdFilePresent,MdOutlinePlaylistAdd } from "react-icons/md";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section1 = ({orgName}) => {
  const [content, setContent] = useState(``);
    const loadContent=()=>{
      setContent(`
         <p>
       At ${orgName?orgName:"[Company Name]"}, our commitment to sustainability and responsible business practices is deeply rooted in our mission and values. As a leading manufacturing company, we recognize our role in driving positive environmental, social, and governance (ESG) impacts. This ESG report, aligned with the Global Reporting Initiative (GRI) standards, marks a significant milestone in our journey towards greater transparency and accountability. 

<br/>
        Environmental Stewardship 
<br/>
      The industrial sector plays a critical role in addressing climate change and environmental degradation. At ${orgName?orgName:"[Company Name]"}, we have implemented
<br/>
        Social Responsibility<br/>
       People are at the heart of our success. We are dedicated to fostering a diverse, inclusive, and equitable workplace where all employees feel valued and empowered
<br/>
Governance and Ethical Conduct <br/>
Strong governance is the foundation of our business integrity and long-term success. We have reinforced our governance structures to ensure robust oversight and accountability at all levels of the organization. Our Board of Directors is committed to<br/>
Looking Ahead <br/>
As we look to the future, we are committed to further integrating ESG considerations into our core business strategy. We will continue to innovate. <br/>
Thank you for your continued trust and support. <br/>
 </p>   
        `)
    }
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
        <p className="text-[15px] text-[#344054] mb-2">Upload CEO’s Image:</p>
        <div className="flex gap-4 mt-2 mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png"
          />
          {/* {imageSrc.name?(
            
          ):(
             
          )} */}
          <button
             onClick={handleButtonClick}
             className="flex bg-transparent py-2 text-center text-[#007EEF] text-[15px] rounded-md"
           >
             <p>
               <MdOutlineFileUpload className="mt-1" style={{fontSize:"16px"}}  />
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
        <div className="flex justify-between">
        <p className="text-[15px] text-[#344054] mb-2 mt-3">Add message from CEO</p>
        <button className="px-2 py-2 text-[#007EEF] border border-[#007EEF] text-[12px] rounded-md mb-2 flex"
        onClick={loadContent}
        >
          <MdOutlinePlaylistAdd className="mr-1 w-[20px] h-[20px]"/>
          Auto Fill
        </button>
        </div>
       
        <div className="mb-4">
          <JoditEditor
            // ref={editor}
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
