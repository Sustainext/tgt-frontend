"use client";
import React, { useState, useEffect } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {GlobalState}  from '../../../../Context/page';
const GovernanceRowWidget = ({ value, onChange, options }) => {
  const [hydrated, setHydrated] = useState(false);
  const { open } = GlobalState();
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const handleChange = (index, field, newValue) => {
    const updatedValue = [...value];
    updatedValue[index] = { ...updatedValue[index], [field]: newValue };
    onChange(updatedValue);
  };

  return (
    <div className={`flex overflow-x-auto pb-3 mb-4 custom-scrollbar ${open ? 'max-w-[83vw] ' : 'max-w-[92vw] '}`}> 
      {value.map((item, index) => (
        <div key={index} className="flex">
          <InputField
            label="Name"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            options={options}
            divclass="flex text-center justify-left h-[47px]"
          />
          <SelectField2
            label="Executive Power"
            value={item.executivePower}
            onChange={(e) =>
              handleChange(index, "executivePower", e.target.value)
            }
            options={options}
            otherValue={item.otherExecutivePower}
            handleChange={(newField, newValue) =>
              handleChange(index, newField, newValue)
            }
               divclass="flex justify-left h-[47px]"
          />
          <SelectField
            label="Independence"
            value={item.independence}
            onChange={(e) =>
              handleChange(index, "independence", e.target.value)
            }
            options={options}
               divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="Tenure On The Governance Body"
            value={item.tenure}
            onChange={(e) => handleChange(index, "tenure", e.target.value)}
            options={options}
            divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="Number Of Significant Positions"
            value={item.significantPositions}
            onChange={(e) =>
              handleChange(index, "significantPositions", e.target.value)
            }
            options={options}
            divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="Commitments Held By Member"
            value={item.commitmentsHeld}
            onChange={(e) =>
              handleChange(index, "commitmentsHeld", e.target.value)
            }
            options={options}
            divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="The Nature Of Commitments"
            value={item.natureOfCommitments}
            onChange={(e) =>
              handleChange(index, "natureOfCommitments", e.target.value)
            }
            options={options}
            divclass="flex justify-left h-[47px]"
          />
          <SelectField
            label="Gender"
            value={item.gender}
            onChange={(e) => handleChange(index, "gender", e.target.value)}
            options={options}
               divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="Under-Represented Social Groups"
            value={item.underRepresentedGroups}
            onChange={(e) =>
              handleChange(index, "underRepresentedGroups", e.target.value)
            }
            options={options}
            divclass="flex justify-left h-[47px]"
          />
          <InputField
            label="Competencies Relevant To The Impacts Of The Organization"
            value={item.competencies}
            onChange={(e) =>
              handleChange(index, "competencies", e.target.value)
            }
            options={options}
            divclass="flex justify-left w-[275px] h-[47px]"
          />
          <InputField
            label="Stakeholder Representation"
            value={item.stakeholderRepresentation}
            onChange={(e) =>
              handleChange(index, "stakeholderRepresentation", e.target.value)
            }
            options={options}
            divclass="flex justify-left h-[47px]"
          />
        </div>
      ))}
    </div>
  );
};

const InputField = ({ label, value, onChange, options, divclass }) => {
  const tooltipContent =
    options.titles.find((item) => item.title === label)?.tooltip || "";

  return (
    <div className="relative ml-2">
      <div className={divclass}>
        <div>
          <label className="text-gray-700 font-[500] text-[12px]  mb-2  ">
            {label}
          </label>
        </div>

        <div>
          <InfoTooltip id={label} content={tooltipContent} />
        </div>
      </div>
      <input
        className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[12px]"
        type="text"
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );
};

const SelectField = ({ label, value, onChange, options,divclass }) => {
  const tooltipContent =
    options.titles.find((item) => item.title === label)?.tooltip || "";
  const selectOptions = options[label.toLowerCase()]?.options || [];

  return (
    <div className=" relative">
      <div className={divclass}>
        <div className="ml-4">
          <label className=" text-gray-700 font-[500] text-[12px]  mb-2  ">
            {label}
          </label>
        </div>

        <div>
          <InfoTooltip id={label} content={tooltipContent} />
        </div>
      </div>
      <select
        className="appearance-none text-[12px] border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value || ""}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectField2 = ({
  label,
  value,
  onChange,
  options,
  handleChange,
  otherValue,
  divclass
}) => {
  const tooltipContent =
    options.titles.find((item) => item.title === label)?.tooltip || "";

  return (
    <div className=" relative">
     <div className={divclass}>
        <div className="ml-4">
          <label className=" text-gray-700 font-[500] text-[12px]  mb-2   ">
            {label}
          </label>
        </div>

        <div>
          <InfoTooltip id={label} content={tooltipContent} />
        </div>
      </div>
      <select
        className="appearance-none text-[12px] border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value || ""}
        onChange={(e) => {
          onChange(e);
          if (handleChange) handleChange("executivePower", e.target.value);
        }}
      >
        <option value="">Select {label}</option>
        {options.executivePower.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {value === "Others (Please specify)" && (
        <input
          className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[12px]"
          type="text"
          value={otherValue}
          onChange={(e) => handleChange("otherExecutivePower", e.target.value)}
          options={options}
        />
      )}
    </div>
  );
};

const InfoTooltip = ({ id, content }) => {
  if (!content) return null; // Don't render anything if there's no content

  return (
    <>
      <MdInfoOutline
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={content}
        className="ml-1 text-gray-500 mt-1.5 text-[14px]"
      />
      <ReactTooltip
        id={`tooltip-${id}`}
        place="top"
        effect="solid"
        className="max-w-xs bg-black text-white text-xs rounded shadow-lg z-50"
        style={{
          width: "290px",
          backgroundColor: "#000",
          color: "white",
          fontSize: "12px",
          boxShadow: 3,
          borderRadius: "8px",
          textAlign: "left",
        }}
      />
    </>
  );
};

export default GovernanceRowWidget;
