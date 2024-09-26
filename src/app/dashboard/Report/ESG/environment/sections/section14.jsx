"use client";
import { useState, useRef, useEffect } from "react";

const Section14 = ({ section12_3Ref }) => {
  const [content, setContent] = useState(
    `Our materials management strategy focuses on responsible sourcing, reducing material consumption, and increasing the use of recycled materials. We aim to minimize our environmental footprint by adopting sustainable practices throughout our supply chain. `
  );

  return (
    <>
      <div id="section12_3" ref={section12_3Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          12.3 Water
        </h3>
        <p className="text-[15px]  mb-2 font-semibold">
          Interaction with water as shared resource:
        </p>
        <p className="text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nam
          debitis eaque fugiat laboriosam laborum beatae suscipit obcaecati
          error voluptas id autem, nesciunt consequatur aut necessitatibus
          explicabo pariatur commodi quae.
        </p>

        <p className="text-[15px]  mb-2 font-semibold">Water related impacts</p>
        <p className="text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nam
          debitis eaque fugiat laboriosam laborum beatae suscipit obcaecati
          error voluptas id autem, nesciunt consequatur aut necessitatibus
          explicabo pariatur commodi quae.
        </p>

        <p className="text-[15px]  mb-2 font-semibold">
          Water related goals and targets
        </p>
        <p className="text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero nam
          debitis eaque fugiat laboriosam laborum beatae suscipit obcaecati
          error voluptas id autem, nesciunt consequatur aut necessitatibus
          explicabo pariatur commodi quae.
        </p>
      </div>
    </>
  );
};

export default Section14;
