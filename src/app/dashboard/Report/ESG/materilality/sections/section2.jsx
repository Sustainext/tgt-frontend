'use client';
import { useEffect, useState } from "react";
import MaterialityTable from "../tables/table";

const Section2 = ({ section8_1_1Ref, data }) => {
  const col = [
    "ESG Pillar",
    "Material Topic",
    "GRI disclosure number",
    "Linked UN SDG",
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data?.["8_1_1"]) {
      const parseData = (response) => {
        const categories = ["environment","social","governance"]; // Extend with other ESG pillars if needed.
        let rows = [];

        categories.forEach((category) => {
          if (response[category]) {
            response[category].forEach((topic) => {
              const { name: materialTopic, disclosure } = topic;

              disclosure.forEach((disc) => {
                if (disc.show_on_table) {
                  const { name: disclosureName, relevent_sdg } = disc;
                  rows.push({
                    "ESG Pillar":
                      category.charAt(0).toUpperCase() + category.slice(1),
                    "Material Topic": materialTopic,
                    "GRI disclosure number": disclosureName,
                    "Linked UN SDG": relevent_sdg || [],
                  });
                }
              });
            });
          }
        });

        return rows;
      };

      setTableData(parseData(data["8_1_1"]));
    }
  }, [data]);

  return (
    <div id="section8_1_1" ref={section8_1_1Ref}>
      <p className="text-[17px] text-[#344054] mb-4 font-semibold">
        8.1.1 List of material topics
      </p>
      <div className="shadow-md rounded-md mb-6">
      <MaterialityTable col={col} value={tableData} />
      </div>
    </div>
  );
};

export default Section2;
