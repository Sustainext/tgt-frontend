'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Section1 =()=>{

    const [content, setContent] = useState(`
        <p  >
        Mission<br/>
        At [Company Name], our mission is to innovate and manufacture high-quality products that meet the evolving needs of our customers while promoting sustainability and ethical practices. We are dedicated to creating value for our stakeholders through responsible operations, minimizing our environmental footprint, and fostering a positive social impact.<br/>
        Vision<br/>
        Our vision is to be a global leader in the manufacturing industry, recognized for our commitment to sustainability, innovation, and excellence. We aspire to set new benchmarks in environmental stewardship, social responsibility, and governance, driving progress towards a more sustainable and equitable future for all.<br/>
        Value<br/>
        3.1 Position Statement<br/>
        Climate Change<br/>
        [Company Name] recognizes the urgent need to address climate change and is committed to--<br/>
        Nature<br/>
        Protecting biodiversity and natural resources is a priority for us.
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
      height:500,
      style: {
        fontSize: '14px',
      },
      allowResizeY: false,
    };
    return (
        <>
        <div>
        {/* <p className="text-[15px] text-[#344054] mb-4">
            Enter data and images related to company awards and recognitions
            </p> */}
            <div>
              <JoditEditor
                // ref={editor}
                // className="whitespace-pre-wrap"
                value={content}
                config={config}
                // tabIndex={1} 
                // onBlur={handleEditorChange}
              />
            </div>
        </div>
        </>
    )
}

export default Section1