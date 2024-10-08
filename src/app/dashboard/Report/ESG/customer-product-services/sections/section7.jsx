"use client";
import { useState, useRef, useEffect } from "react";

const Section7 = ({ section15_2_2Ref }) => {
  const [content, setContent] = useState(
    `Our commitment to providing high-quality products and services is central to our business strategy. We adhere to the Global Reporting Initiative (GRI) standards to ensure that our offerings meet the highest levels of safety, sustainability, and customer satisfaction. This section outlines our approach to managing the health and safety impacts of our products, addressing incidents of non-compliance, and ensuring accurate product information and labelling. `
  );
  const [content2, setContent2] = useState(
    `This report covers the period from [Start Date] to [End Date] and is part of our annual sustainability reporting cycle. 
We are committed to providing regular updates on our ESG performance to ensure transparency and keep our 
stakeholders informed of our progress.`
  );
  return (
    <>
      <div id="setion15_2_2" ref={section15_2_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          15.2 2.Marketing
        </h3>
        <p className="text-[15px] text-[#344054] mb-2">
          Our marketing practices reflect our commitment to ethical standards,
          transparency, and customer satisfaction. We strive to promote our
          products and services in a manner that is honest, accurate, and
          respectful of our customers' needs and preferences. We have robust
          systems in place to monitor, report, and address any incidents of
          non-compliance. 
        </p>
        <div className="text-sm mb-4">
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with regulations resulting
              in a fine or penalty: 
              <p className="mb-4 font-normal">100</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with regulations resulting
              in a warning: 
              <p className="mb-4 font-normal">100</p>
            </li>
            <li className="text-[15px] text-[#344054] mb-2 font-semibold">
              Number of Incidents of non-compliance with voluntary codes: 
              <p className="mb-4 font-normal">100</p>
            </li>
          </ul>
        </div>
        <div className="text-sm mb-4">
          <p className="text-[15px] text-[#344054] mb-2">
            Ethical Marketing Practices 
          </p>
          <ul className="list-disc ml-4">
            <li className="text-[15px] text-[#344054] mb-2 ">
              Truthful Advertising: We ensure that all marketing communications
              are truthful, not misleading, and substantiated by evidence. We
              adhere to industry standards and regulatory requirements for
              advertising. 
            </li>
            <li className="text-[15px] text-[#344054] mb-2 ">
              Respect for Privacy: We respect customer privacy and ensure that
              all marketing activities comply with data protection regulations.
              Personal information collected for marketing purposes is handled
              with the utmost care and confidentiality. 
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Section7;
