"use client";
import { useSelector } from "react-redux";
import EconomicTable3 from "../tables/table3";

const Section17 = ({ section11_5_2Ref,reportType,
    sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.5.2':'11.5.1',
    sectionTitle = 'Operations Assessed for Risks Related to Anti-Corruption',
    sectionOrder = 11,
 }) => {
    const data = useSelector((state) => state.screen11Slice.getdata);

    // Safely access operations_assesed from the updated data structure
    const operationsAssessed = data?.economic_analyse?.operations_assessed_analyze?.operations_assesed || [];

    return (
        <>
            <div id="section11_5_2" ref={section11_5_2Ref}>
                <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
                  {sectionNumber} {sectionTitle}
                </h3>

                <div className="rounded-md shadow-md mb-4">
                    <EconomicTable3 operationsAssessed={operationsAssessed} />
                </div>
            </div>
        </>
    );
};

export default Section17;
