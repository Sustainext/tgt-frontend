import React, { useState, useEffect } from "react";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import Select from "react-select";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DateRangePickerEmission from "@/app/utils/DatePickerComponentemission";
import axiosInstance from "../../../utils/axiosMiddleware";
import _ from "lodash"; // Import Lodash
import { Oval } from "react-loader-spinner";
const view_path = "gri-environment-emissions-base_year";
const client_id = 1;
const user_id = 1;
const EmissionReductionInitiativesWidget = ({
  value = {},
  onChange,
  schema,
}) => {
  const initialQ1Answer = value.q1Answer || "";
  const initialFormData = Array.isArray(value.formData) ? value.formData : [];
  const [q1Answer, setQ1Answer] = useState(initialQ1Answer);
  const [formData, setFormData] = useState([...initialFormData]);

  useEffect(() => {
    if (q1Answer === "Yes" && formData.length === 0) {
      setFormData([{}]);
      onChange({ q1Answer, formData: [{}] });
    }
  }, [q1Answer]);

  // Handle field changes dynamically
  const handleChange = (index, field, val) => {
    setFormData((prevData) => {
      const updatedData = [...prevData]; // Clone existing state
      updatedData[index] = { ...updatedData[index], [field]: val };
  
      // Prevent unnecessary updates
      if (_.isEqual(prevData, updatedData)) return prevData;
  
  
      if (field === "Q3" && val !== "Other (please specify)") {
        updatedData[index].customUnit = ""; // Clear custom input if needed
      }

  
      onChange({ q1Answer, formData: updatedData }); // Update parent
      return updatedData;
    });
  };
  

  // Handle Q1 change
  const handleQ1Change = (e) => {
    const newQ1Answer = e.target.value;
    setQ1Answer(newQ1Answer);
    const newFormData = newQ1Answer === "Yes" ? [{}] : [];
    setFormData(newFormData);
    onChange({ q1Answer: newQ1Answer, formData: newFormData });
  };

  // Add a new row
  const addRow = () => {
    setFormData((prevData) => {
      const newFormData = [...prevData, {}];
      onChange({ q1Answer, formData: newFormData });
      return newFormData;
    });
  };

  // Remove row
  const removeRow = (index) => {
    setFormData((prevData) => {
      const updatedData = prevData.filter((_, i) => i !== index);
      onChange({ q1Answer, formData: updatedData });
      return updatedData;
    });
  };

  const CustomOption = ({ children, ...props }) => {
    const { isSelected, isFocused, innerProps } = props;

    return (
      <div
        {...innerProps}
        style={{
          backgroundColor: isSelected
            ? "#e0e0e0"
            : isFocused
            ? "#f0f0f0"
            : "white",

          padding: "8px",

          display: "flex",

          alignItems: "center",

          textAlign: "left",
        }}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: "8px" }}
        />

        {children}
      </div>
    );
  };

  const newcustomStyles = {
    control: (provided) => ({
      ...provided,

      border: "none",
      borderBottom:"2px solid #d1d5db",
      boxShadow: "none",
      borderRadius:"0px",
      padding: 0,

      margin: 0,

      minHeight: "auto",
    }),

    placeholder: (provided) => ({ ...provided, textAlign: "left" }),

    input: (provided) => ({ ...provided, margin: 0, padding: 0 }),

    menu: (provided) => ({
      ...provided,

      position: "relative",

      bottom: "100%",

      top: 0,

      zIndex: 1000,
    }),

    menuList: (provided) => ({ ...provided, maxHeight: "200px" }),
  };

  return (
    <div className="overflow-auto custom-scrollbar">
      {/* Q1 is displayed only once */}
      <div className="mb-4 relative">
        <label className=" font-medium text-gray-700 flex text-[13px] mb-2">
          {schema.items.properties.Q1.title}
          <MdInfoOutline
            data-tooltip-id="tooltip-Q1"
            data-tooltip-content={schema.items.properties.Q1.tooltiptext}
            className="ml-2 mt-1 text-gray-600"
          />
        </label>
        <ReactTooltip
          id="tooltip-Q1"
          place="top"
          effect="solid"
          style={{
            width: "290px",
            backgroundColor: "#000",
            color: "white",
            fontSize: "12px",
            boxShadow: 3,
            borderRadius: "8px",
            textAlign: "left",
            zIndex: "100",
          }}
        />
        <div className="flex gap-4">
          {schema.items.properties.Q1.enum.map((option) => (
            <label key={option} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="Q1"
                value={option}
                checked={q1Answer === option}
                onChange={handleQ1Change}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Show Form Fields only if Q1 is "Yes" */}
      {q1Answer === "Yes" && (
        <>
          {formData.map((entry, index) => (
            <div key={index} className="flex mb-4">
              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] flex mb-1">
                    {schema.items.properties.Q2.title}{" "}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q2"
                      data-tooltip-content={
                        schema.items.properties.Q2.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q2"
                      place="top"
                      effect="solid"
                      style={{
                        width: "290px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <input
                  type="text"
                  placeholder="Enter Data"
                  className={`block w-[20vw] ${index === 0 ? "py-2" : "py-1.5"} text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  value={entry.Q2 || ""}
                  onChange={(e) => handleChange(index, "Q2", e.target.value)}
                />
              </div>

              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] flex mb-2">
                    {schema.items.properties.Q3.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q3"
                      data-tooltip-content={
                        schema.items.properties.Q3.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q3"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <select
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  value={entry.Q3 || ""}
                  onChange={(e) => handleChange(index, "Q3", e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {schema.items.properties.Q3.enum.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {entry.Q3 === "Other (please specify)" && (
                  <input
                    type="text"
                    className="block w-[20vw] py-2 text-[12px] border-b-2 border-gray-300 focus:outline-none mt-2"
                    placeholder="Specify unit"
                    value={entry.customUnit || ""}
                    onChange={(e) =>
                      handleChange(index, "customUnit", e.target.value)
                    }
                  />
                )}
              </div>
              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] flex mb-2">
                    {schema.items.properties.Q4.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q4"
                      data-tooltip-content={
                        schema.items.properties.Q4.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q4"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <select
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  value={entry.Q4 || ""}
                  onChange={(e) => handleChange(index, "Q4", e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {schema.items.properties.Q4.enum.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] mb-2">
                    {schema.items.properties.Q5.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q5"
                      data-tooltip-content={
                        schema.items.properties.Q5.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q5"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <DateRangePickerEmission
                  startDate={entry.Q5?.start}
                  endDate={entry.Q5?.end}
                  onDateChange={(newRange) =>
                    handleChange(index, "Q5", newRange)
                  }
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                />
             
              </div>

              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] mb-2">
                    {schema.items.properties.Q6.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q6"
                      data-tooltip-content={
                        schema.items.properties.Q6.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q6"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <textarea
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  rows="1"
                  placeholder="Enter Data"
                  value={entry.Q6 || ""}
                  onChange={(e) => handleChange(index, "Q6", e.target.value)}
                />
             
              </div>

              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] mb-2">
                    {schema.items.properties.Q7.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q7"
                      data-tooltip-content={
                        schema.items.properties.Q7.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q7"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <input
                  type="text"
                  placeholder="Enter Data"
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  value={entry.Q7 || ""}
                  onChange={(e) => handleChange(index, "Q7", e.target.value)}
                />
              </div>
              <div className="mx-2 relative mb-4">
                {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw]  h-[35px] mb-2">
                    {schema.items.properties.Q8.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q8"
                      data-tooltip-content={
                        schema.items.properties.Q8.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q8"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
                )}
                <Select
                  isMulti
                  styles={newcustomStyles}
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  components={{ Option: CustomOption }}
                  options={schema.items.properties.Q8.enum.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  value={(entry.Q8 || []).map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  onChange={(selectedOptions) =>
                    handleChange(
                      index,
                      "Q8",
                      selectedOptions.map((opt) => opt.value)
                    )
                  }
                  className={` w-[20vw] text-[12px] `}
                />
              </div>

              <div className="mx-2 relative mb-4">
              {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] mb-2">
                    {schema.items.properties.Q9.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q9"
                      data-tooltip-content={
                        schema.items.properties.Q9.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q9"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
              )}
                <Select
                  isMulti
                  styles={newcustomStyles}
                  closeMenuOnSelect={false} // **Prevents closing after selection**
                  hideSelectedOptions={false}
                  components={{ Option: CustomOption }}
                  options={schema.items.properties.Q9.enum.map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  value={(entry.Q9 || []).map((opt) => ({
                    value: opt,
                    label: opt,
                  }))}
                  onChange={(selectedOptions) =>
                    handleChange(
                      index,
                      "Q9",
                      selectedOptions.map((opt) => opt.value)
                    )
                  }
                  className={` w-[20vw]  text-[12px] `}
                />
              </div>

              <div className="mx-2 relative mb-4">
  {index === 0 && (
                  <label className="flex font-medium text-gray-700 text-[13px] w-[20vw] h-[35px] mb-2">
                    {schema.items.properties.Q10.title}
                    <MdInfoOutline
                      data-tooltip-id="tooltip-Q10"
                      data-tooltip-content={
                        schema.items.properties.Q10.tooltiptext
                      }
                      className="ml-1 mt-1 text-gray-600 w-[2vw]"
                    />
                    <ReactTooltip
                      id="tooltip-Q10"
                      place="top"
                      effect="solid"
                      style={{
                        width: "340px",
                        backgroundColor: "#000",
                        color: "white",
                        fontSize: "12px",
                        boxShadow: 3,
                        borderRadius: "8px",
                        textAlign: "left",
                        zIndex: "100",
                      }}
                    />
                  </label>
  )}
                <input
                  type="text"
                  placeholder="Enter Data"
                  className={`block w-[20vw] py-2 text-[12px] leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:leading-5 border-b-2 border-gray-300`}
                  value={entry.Q10 || ""}
                  onChange={(e) => handleChange(index, "Q10", e.target.value)}
                />
              </div>

              <button
                type="button"
                className=" text-red-500 ml-4"
                onClick={() => removeRow(index)}
              >
                <MdOutlineDeleteOutline size={24} />
              </button>
            </div>
          ))}

          {/* Add Row Button */}
          <button
            type="button"
            className="text-[#007EEF] text-[13px] flex cursor-pointer mt-4 mb-2"
            onClick={addRow}
          >
            <MdAdd size={20} className="mr-1" /> Add Row
          </button>
        </>
      )}

    </div>
  );
};

export default EmissionReductionInitiativesWidget;
