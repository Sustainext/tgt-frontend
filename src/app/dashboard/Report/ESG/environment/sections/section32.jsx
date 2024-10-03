'use client'
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Section32=({section12_6_2Ref})=>{
    const [content,setContent] = useState(
    `<p>We work to protect and restore habitats affected by our operations. This includes creating conservation areas, rehabilitating disturbed lands, and supporting biodiversity projects.</p> `
    )
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
       
        <div id="section12_6_2" ref={section12_6_2Ref}>

<h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
12.6.2 Habitat Protected and Restored 
</h3>

<p className="text-sm mb-4">We work to protect and restore habitats affected by our operations. This includes creating conservation areas, rehabilitating disturbed lands, and supporting biodiversity projects</p>
<p className="text-[15px] text-[#344054] mb-2">
            Edit data
            </p>

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
    )
}

export default Section32