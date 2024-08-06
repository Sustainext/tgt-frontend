import React, { useState } from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const GovernanceRowWidget = ({ value, onChange, options, id }) => {
  const handleChange = (field, newValue) => {
    onChange({ ...value, [field]: newValue });
  };

  return (
    <div className="flex max-w-[90vw] overflow-x-auto pb-3 mb-4 custom-scrollbar">
      <InputField
        label="Name"
        value={value.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <SelectField
        label="Executive Power"
        value={value.executivePower}
        onChange={(e) => handleChange('executivePower', e.target.value)}
        options={options.executivePower.options}
        handleChange={handleChange}
        fieldName="executivePower"
        otherValue={value.otherExecutivePower}
      />
      <SelectField
        label="Independence"
        value={value.independence}
        onChange={(e) => handleChange('independence', e.target.value)}
        options={options.independence.options}
      />
      <InputField
        label="Tenure On The Governance Body"
        value={value.tenure}
        onChange={(e) => handleChange('tenure', e.target.value)}
      />
      <InputField
        label="Number Of Significant Positions"
        value={value.significantPositions}
        onChange={(e) => handleChange('significantPositions', e.target.value)}
      />
      <InputField
        label="Commitments Held By Member"
        value={value.commitmentsHeld}
        onChange={(e) => handleChange('commitmentsHeld', e.target.value)}
      />
      <InputField
        label="The Nature Of Commitments"
        value={value.natureOfCommitments}
        onChange={(e) => handleChange('natureOfCommitments', e.target.value)}
      />
      <SelectField
        label="Gender"
        value={value.gender}
        onChange={(e) => handleChange('gender', e.target.value)}
        options={options.gender.options}
      />
      <InputField
        label="Under-Represented Social Groups"
        value={value.underRepresentedGroups}
        onChange={(e) => handleChange('underRepresentedGroups', e.target.value)}
      />
      <InputField
        label="Competencies Relevant To The Impacts Of The Organization"
        value={value.competencies}
        onChange={(e) => handleChange('competencies', e.target.value)}
      />
      <InputField
        label="Stakeholder Representation"
        value={value.stakeholderRepresentation}
        onChange={(e) => handleChange('stakeholderRepresentation', e.target.value)}
      />
    </div>
  );
};

const InputField = ({ label, value, onChange }) => (
  <div className="w-[175px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
    <label className="block text-black/60 text-sm font-bold mb-2 flex items-center h-14">
      {label}
      <InfoTooltip id={label} content={`Information about ${label}`} />
    </label>
    <input
      className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      value={value || ''}
      onChange={onChange}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, handleChange, fieldName, otherValue }) => (
  <div className="w-[175px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 mb-4">
    <label className="block text-black/60 text-sm font-bold mb-2 flex items-center h-14">
      {label}
      <InfoTooltip id={label} content={`Information about ${label}`} />
    </label>
    <select
      className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value || ''}
      onChange={(e) => {
        onChange(e);
        if (handleChange) handleChange(fieldName, e.target.value);
      }}
    >
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {value === 'Others (Please specify)' && (
      <input
      className="appearance-none border-b rounded w-[175px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      placeholder="Others, Please specify"
      value={otherValue || ''}
      onChange={(e) => handleChange(`other${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`, e.target.value)}
    />
    )}
  </div>
);

const InfoTooltip = ({ id, content }) => (
  <>
    <MdInfoOutline
      data-tooltip-id={`tooltip-${id}`}
      data-tooltip-content={content}
      className="ml-1 text-gray-500"
    />
    <ReactTooltip
      id={`tooltip-${id}`}
      place="top"
      effect="solid"
      className="max-w-xs bg-black text-white text-xs rounded shadow-lg"
    />
  </>
);

export default GovernanceRowWidget;
