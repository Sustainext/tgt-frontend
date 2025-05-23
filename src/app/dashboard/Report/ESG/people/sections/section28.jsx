"use client";
import { useState, useRef, useEffect } from "react";
import LeaveTable from "../tables/leaveTable";

const Section28 = ({ section13_7Ref, data }) => {
  const [content, setContent] = useState(
    `We ensure that all workers, including contractors and temporary workers, are covered by our OHS management system. `
  );
  const col1 = [
    "Collective bargaining agreements ",
    "Notice Period Specified ",
    "Consultation Provisions ",
    "Negotiation Provisions ",
  ];

  const col2 = [
    "Organisation/Corporation",
    "Percentage of total employees covered by collective bargaining agreements",
  ];

  const Tabledata2 = data["2_30_a_analyse"]
    ? data["2_30_a_analyse"]["collective_bargaining"].length > 0
      ? data["2_30_a_analyse"]["collective_bargaining"].map((val, index) => {
          return {
            "Organisation/Corporation": val.org_or_corp,
            "Percentage of total employees covered by collective bargaining agreements":
              val.percentage + "%",
          };
        })
      : [
          {
            "Organisation/Corporation": "No data available",
            "Percentage of total employees covered by collective bargaining agreements":
              "No data available",
          },
        ]
    : [
        {
          "Organisation/Corporation": "No data available",
          "Percentage of total employees covered by collective bargaining agreements":
            "No data available",
        },
      ];

  const Tabledata1 = data["402-1a_collective_bargainging_agreements"]
    ? data["402-1a_collective_bargainging_agreements"]["data"].length > 0
      ? data["402-1a_collective_bargainging_agreements"]["data"].map(
          (val, index) => {
            return {
              "Collective bargaining agreements ": val.Q1,
              "Notice Period Specified ": val.Q2,
              "Consultation Provisions ": val.Q3,
              "Negotiation Provisions ": val.Q4,
            };
          }
        )
      : [
          {
            "Collective bargaining agreements ": "No data available",
            "Notice Period Specified ": "No data available",
            "Consultation Provisions ": "No data available",
            "Negotiation Provisions ": "No data available",
          },
        ]
    : [
        {
          "Collective bargaining agreements ": "No data available",
          "Notice Period Specified ": "No data available",
          "Consultation Provisions ": "No data available",
          "Negotiation Provisions ": "No data available",
        },
      ];

  return (
    <>
      <div id="section13_7" ref={section13_7Ref}>
        <h3 className="text-[17px] text-[#344054] mb-4 text-left font-semibold">
          13.7 Collective Bargaining
        </h3>

        <p className="text-[15px]  mb-2 font-semibold">
          For workers who are not employees but whose work and workplace is
          controlled by the organization 
        </p>
        <p className="text-sm mb-4">
          {data["2_30_b"]
            ? data["2_30_b"].length > 0
              ? data["2_30_b"][0].Q1
                ? data["2_30_b"][0].Q1
                : "No data available"
              : "No data available"
            : "No data available"}
        </p>
        <p className="text-[15px]  mb-2 font-semibold">
        Percentage of total employees covered by collective bargaining agreements
        </p>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col2} data={Tabledata2} />
        </div>
        <div className="rounded-md mb-4 shadow-md">
          <LeaveTable columns={col1} data={Tabledata1} />
        </div>
      </div>
    </>
  );
};

export default Section28;
