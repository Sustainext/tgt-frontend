"use client";
import { useSelector } from "react-redux";

const Section20 = ({ section11_6Ref, section11_6_1Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  return (
    <>
      <div id="section11_6" ref={section11_6Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          11.6. Political Contributions
        </h3>

        {data["415_1a"]?.map((entry, index) => (
          entry.Q1 === "Yes" && (
            <div key={index} className="mb-4">
              <p className="text-[12px] mb-2">{entry.Q1}</p>
              <p className="text-[12px] mb-2">
                {entry.Q2 || "No data available"}
              </p>
          
            </div>
          )
        ))}
      </div>

      <div id="section11_6_1" ref={section11_6_1Ref}>
        <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
          11.6.1 Management of Material Topic
        </h3>

        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Description of organisation's policies or commitments for the material
          topic, along with actions taken to address, prevent or mitigate
          potential negative impacts and mention the actions taken by the
          organisation to manage actual and potential positive impacts.
        </p>
        <p className="text-sm mb-4">No data available</p>
        <p className="text-[15px] text-[#344054] mb-2 font-semibold">
          Process used to track the effectiveness of the actions and mention
          goals, targets, and indicators used to evaluate the process along with
          specific lessons learned and how these have been incoporated to
          organisation's operational policies and procedures.
        </p>
        <p className="text-sm mb-4">No data available</p>
      </div>
    </>
  );
};

export default Section20;
