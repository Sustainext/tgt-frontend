import { useSelector } from "react-redux";

const Section15 = ({ section11_4_4Ref }) => {
  const data = useSelector((state) => state.screen11Slice.getdata);

  // Accessing the data assuming it is an object with Q1, Q2, Q3 keys
  const sectionData = data["207_3a"];

  return (
    <div id="section11_4_4" ref={section11_4_4Ref}>
      <h3 className="text-[15px] text-[#344054] mb-4 text-left font-semibold">
        11.4.4. Stakeholder Engagement and Management of Concerns Related to Tax
      </h3>
      {sectionData ? (
        <div className="mb-4">
          <p className="text-sm mb-2">{sectionData[0]?.Q1 || "No data available"}</p>
          <p className="text-sm mb-2">{sectionData[0]?.Q2 || "No data available"}</p>
          <p className="text-sm mb-2">{sectionData[0]?.Q3 || "No data available"}</p>
        </div>
      ) : (
        <p className="text-sm mb-2">No data available</p>
      )}
    </div>
  );
};

export default Section15;
