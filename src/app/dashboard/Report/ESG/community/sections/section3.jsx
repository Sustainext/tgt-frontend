"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Section3 = ({ section14_2Ref }) => {
  const [content, setContent] = useState(`
    <p>
        Corporate Social Responsibility (CSR) is a cornerstone of our community engagement strategy. Our CSR efforts are guided by the principles of ethical business practices, sustainability, and social equity. We are committed to making a positive impact through strategic investments and partnerships that address critical social and environmental challenges. 
<br/>
        CSR Framework 
<br/>
       Our CSR framework is built on three pillars: People, Planet, and Prosperity. This holistic approach ensures that our initiatives are inclusive, environmentally sustainable, and economically beneficial. <br/>
        Partnerships and Collaborations  
<br/>
        Climate Change<br/>
       Collaboration with stakeholders is key to the success of our CSR initiatives. We partner with local governments, NGOs, and other organizations to leverage resources, expertise, and networks. These partnerships enable us to scale our impact and ensure that our CSR activities are aligned with community needs and priorities. 
<br/>
 </p>     
    `);

  // const [content, setContent] = useState(`Mission
  // At [Company Name], our mission is to innovate and manufacture high-quality products that meet the evolving needs of our customers while promoting sustainability and ethical practices. We are dedicated to creating value for our stakeholders through responsible operations, minimizing our environmental footprint, and fostering a positive social impact.
  // Vision
  // Our vision is to be a global leader in the manufacturing industry, recognized for our commitment to sustainability, innovation, and excellence. We aspire to set new benchmarks in environmental stewardship, social responsibility, and governance, driving progress towards a more sustainable and equitable future for all.
  // Value
  // 3.1 Position Statement
  // Climate Change
  // [Company Name] recognizes the urgent need to address climate change and is committed to
  // Nature
  // Protecting biodiversity and natural resources is a priority for us.`);
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
      <div ref={section14_2Ref} id="section14_2">
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          14.2 CSR
        </h3>

        <p className="text-[15px] text-[#344054] mb-2">Edit data</p>
        <div>
          <JoditEditor
            // ref={editor}
            // className="whitespace-pre-wrap"
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

export default Section3;
