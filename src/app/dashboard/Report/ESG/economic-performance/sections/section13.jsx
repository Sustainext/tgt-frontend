"use client";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Apporchtable from "../tables/apporchtable";

const stripHTML = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const headerKeyMap = {
  "Tax Jurisdiction": "tax_jurisdiction",
  "Names of resident entities": "names_of_resident_entities",
  "Primary activities of the organization": "primary_activities_of_the_organization",
  "Number of employees and the basis of calculation of this number": "number_of_employees_and_calculation_basis",
  "Revenues from third party sales": "revenues_from_third_party_sales",
  "Revenues from intra-group transactions with other tax jurisdictions": "intra_group_revenues_by_tax_jurisdiction",
  "Profit/Loss before tax": "profit_or_loss_before_tax",
  "Tangible assets other than cash and cash equivalents": "tangible_assets_excluding_cash_equivalents",
  "Corporate income tax paid on a cash basis": "corporate_income_tax_paid_on_a_cash_basis",
  "Corporate income tax accrued on profit/loss": "corporate_income_tax_accrued_on_profit_or_loss",
  "Reasons for the difference between corporate income tax accrued on profit/loss and the tax due if the statutory tax rate is applied to profit/loss before tax.": "reasons_for_difference_in_accrued_and_statutory_tax",
};

const Section13 = ({ section11_4_2Ref,reportType,
  sectionNumber = reportType=='GRI Report: In accordance With' || reportType==='Custom ESG Report'?'11.4.2':'11.4.1',
  sectionTitle = 'Approach to Tax',
  sectionOrder = 11,
 }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);
  const col = Object.keys(headerKeyMap);
  
  // Ensure that data["207_4b"] exists and is an object
  const values = data?.["207_4b"] 
    ? Object.values(data["207_4b"]).filter((item) => typeof item === "object") 
    : [];
  
  const currency = data?.["207_4b"]?.currency || "USD"; // Default to USD if not provided

  return (
    <>
      <div id="section11_4_2" ref={section11_4_2Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
         {sectionNumber} {sectionTitle}
        </h3>

        {/* Mapping through 207_1a */}
        {data?.["207_1a"]?.map((item, index) => (
          <div key={`tax_strategy_${index}`} className="mb-4">
            <p className="text-sm mb-1">{item.Q1?item.Q1=="No"?item.Q1:'':'No data available'}</p>
            {item.Q2 && (
              <div>
                <p className="text-[15px] mb-2 font-semibold text-[#344054]">
              The tax strategy can be accessed publicly at
            </p>
            <p className="text-sm mb-4">{item.Q2?item.Q2:'No data available'}</p>
              </div>
            )
            }
            {item.Q3 &&
            (
              <div>
                  <p className="text-[15px] mb-2 font-semibold text-[#344054]">
                  The tax strategy is formally reviewed and approved by
            </p>
            <p className="text-sm mb-4">{item.Q3?stripHTML(item.Q3):'No data available'}</p>
              </div>
            )
            
           }
            {item.Q4 &&
            (
              <div>
                <p className="text-[15px] mb-2 font-semibold text-[#344054]">
                Frequency the tax strategy review
            </p>
            <p className="text-sm mb-4">{item.Q4?item.Q4:'No data available'}</p>
              </div>
            )
            
            }
            
            {item.Q5 &&
            (
              <div>
                   <p className="text-[15px] mb-2 font-semibold text-[#344054]">
             Approach taken by the organisation for tax related regulatory compliance
            </p>
            <p className="text-sm mb-2">{item.Q5?item.Q5:'No data available'}</p>
            {item.Q6 && <p className="text-sm mb-4">{stripHTML(item.Q6)}</p>}
              </div>
            )
           }
           
          </div>
        ))}

        {/* Fallback if no data is available */}
        {(!data?.["207_1a"] || data["207_1a"].length === 0) && (
          <p className="text-sm mb-4">No data available</p>
        )}
      </div>

      <p className="text-[15px] text-[#344054] mb-4 font-semibold">
      Our tax strategy is designed to support our business objectives while ensuring we meet our legal and ethical obligations.
      </p>

      {/* New div to display tax jurisdictions from 207_4a */}
      <div className="shadow-md rounded-md mb-4 p-6">
        <p className="text-sm text-[#344054] mb-2">
          All tax jurisdictions where the entities included in the organization’s audited consolidated financial statements, or in the financial information filed on public record, are resident for tax purposes:
        </p>

        {/* Mapping through 207_4a */}
        {data?.["207_4a"]?.map((jurisdiction, index) => (
          <p key={`jurisdiction_${index}`} className="text-sm py-4  border-t">
            {jurisdiction}
          </p>
        ))}

        {/* Fallback if no tax jurisdictions are available */}
        {(!data?.["207_4a"] || data["207_4a"].length === 0) && (
          <p className="text-sm mb-1">No tax jurisdictions available.</p>
        )}
      </div>

      <div className="rounded-md shadow-md mb-4">
        <Apporchtable col={col} values={values} currency={currency}  headerKeyMap={headerKeyMap}  />
      </div>
    </>
  );
};

export default Section13;
