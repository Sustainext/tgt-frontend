import React, { useEffect, useState,useMemo } from "react";
import Select, { components } from "react-select";
import { MdInfoOutline } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { GlobalState } from "../../../../Context/page";

const CustomOption = ({ children, ...props }) => {
  const { isSelected, isFocused, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused ? "#f0f0f0" : "white",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        className="green-checkbox"
        checked={isSelected}
        readOnly
        style={{ marginRight: "8px" }}
      />
      {children}
    </div>
  );
};

const CustomMultiValueContainer = ({ children, ...props }) => {
  const { data, selectProps } = props;
  const index = selectProps.value.findIndex((val) => val.value === data.value);

  if (index < 2) {
    return (
      <components.MultiValueContainer {...props}>
        {children}
      </components.MultiValueContainer>
    );
  }

  if (index === 2 && selectProps.value.length > 2) {
    return (
      <components.MultiValueContainer {...props}>
        <div
          style={{
            backgroundColor: "#dbeafe",
            borderRadius: "0.375rem",
            padding: "2px 5px",
            color: "#1e40af",
            fontWeight: "600",
          }}
        >
          +{selectProps.value.length - 2} more
        </div>
      </components.MultiValueContainer>
    );
  }

  return null;
};

const MultiselectWidget = ({
    schema = {},
    options = [],
    value = [],
    onChange,
    required,
    uiSchema = {},
    formContext,
    name
  }) => {
    const { open } = GlobalState();
    const { validationErrors } = formContext || {};
    const rowErrors = validationErrors || {};
    const hasError = !value && rowErrors && rowErrors[name];
  
    const [selected, setSelected] = useState([]);
    const [showOther, setShowOther] = useState(false);
    const [otherValue, setOtherValue] = useState("");
  
    // Memoize the selectOptions to prevent unnecessary recalculations
    const selectOptions = useMemo(() => {
      return schema.enum 
        ? schema.enum.map(opt => ({ value: opt, label: opt }))
        : Array.isArray(options) 
          ? options.map(opt => ({ value: opt, label: opt }))
          : [];
    }, [schema.enum, options]); // Only recalculate when these change
  
    useEffect(() => {
        const val = Array.isArray(value) ? value : [];
      
        const selectedOptions = selectOptions
          .filter(opt => val.includes(opt.value))
          .map(opt => ({ value: opt.value, label: opt.label }));
      
        const othersOptionSelected = val.includes("Others (please specify)");
        const othersText = val.find(v => v && v.startsWith("Other: ")) || "";
        const extractedOtherValue = othersText.replace("Other: ", "");
      
        const selectedChanged = JSON.stringify(selectedOptions) !== JSON.stringify(selected);
        const showOtherChanged = showOther !== (othersOptionSelected || !!othersText);
        const otherValueChanged = otherValue !== extractedOtherValue;
      
        if (selectedChanged) setSelected(selectedOptions);
        if (showOtherChanged) setShowOther(othersOptionSelected || !!othersText);
        if (otherValueChanged) setOtherValue(extractedOtherValue);
      }, [value, selectOptions]);
      
  

  const handleSelectChange = (selectedOptions) => {
    const values = selectedOptions.map((opt) => opt.value);
    setSelected(selectedOptions);

    if (values.includes("Others (please specify)")) {
      setShowOther(true);
    } else {
      setShowOther(false);
      setOtherValue("");
    }

    const finalValue = values.filter((v) => v !== "Others (please specify)");
    if (showOther && otherValue) {
      finalValue.push(`Other: ${otherValue}`);
    }

    onChange(finalValue);
  };

  const handleOtherChange = (e) => {
    const val = e.target.value;
    setOtherValue(val);

    const baseValues = selected.map((s) => s.value).filter((v) => v !== "Others (please specify)");
    if (val) baseValues.push(`Other: ${val}`);

    onChange(baseValues);
  };

  const multiselectStyle = {
    control: (base) => ({
      ...base,
      minHeight: "35px",
      minWidth: "250px", // or use w-full in wrapping div if needed
      border: hasError ? "1px solid #ef4444" : "1px solid #ccc",
      fontSize: "13px",
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "13px",
      color: "#6b7280",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
      // No custom width — inherits from control
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px",
      fontSize: "13px",
      // DO NOT set width here — it will mismatch control
    }),
    option: (base, state) => ({
      ...base,
      fontSize: "13px",
      backgroundColor: state.isSelected
        ? "#e0e7ff"
        : state.isFocused
        ? "#f3f4f6"
        : "white",
      color: "#111827",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#dbeafe",
      fontSize: "13px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#1e40af",
      fontWeight: "600",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#1e40af",
      ':hover': {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
      },
    }),
  };
  
  

  return (
    <div className="px-1">
      <div className="flex mb-2">
        <div className="relative">
          {uiSchema['ui:heading'] && (
            <p className="text-[15px] 4k:text-[16px] mb-2 text-gray-700 font-[500] flex">
              {uiSchema['ui:heading']}
              <MdInfoOutline
                data-tooltip-id={`tooltip-${uiSchema["ui:heading"]?.replace(/\s+/g, "-")}`}
                data-tooltip-html={uiSchema["ui:headingTooltip"]}
                className="mt-1 ml-2 w-[30px] text-[14px] 4k:text-[16px]"
                style={{ display: uiSchema["ui:headingTooltipDisplay"] ? uiSchema["ui:headingTooltipDisplay"] : 'none' }}
              />
              <ReactTooltip
                id={`tooltip-${uiSchema["ui:heading"]?.replace(/\s+/g, "-")}`}
                place="top"
                effect="solid"
                style={{
                  width: "300px",
                  backgroundColor: "#000",
                  color: "white",
                  fontSize: "12px",
                  boxShadow: 3,
                  borderRadius: "8px",
                }}
              />
            </p>
          )}
          <p className="text-[14px] 4k:text-[16px] text-gray-700 font-[500] flex">
            {uiSchema["ui:title"]}
            <MdInfoOutline
              data-tooltip-id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
              data-tooltip-html={uiSchema["ui:tooltipstitle"]}
              className="mt-1 ml-2 w-[30px] text-[14px] 4k:text-[16px]"
              style={{ display: uiSchema["ui:titletooltipdisplay"] }}
            />
            <ReactTooltip
              id={`tooltip-${uiSchema["ui:title"]?.replace(/\s+/g, "-")}`}
              place="top"
              effect="solid"
              style={{
                width: "300px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
              }}
            />
          </p>
        </div>
      </div>
      <div className="mb-4 w-[690px]">
        <Select
          isMulti
          options={selectOptions}
          value={selected}
          onChange={handleSelectChange}
          styles={multiselectStyle}
          components={{
            Option: CustomOption,
            MultiValueContainer: CustomMultiValueContainer,
          }}
          placeholder={uiSchema["ui:placeholder"] || "Select"}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}

        />
      </div>

      {showOther && (
        <input
          type="text"
          value={otherValue}
          onChange={handleOtherChange}
          placeholder="Please specify"
          required={required}
          className={`w-[690px] border-b border-gray-400 mb-4 ${hasError ? "border-red-500" : "border-gray-400"} px-2 py-1 text-sm`}
        />
      )}
      
      {hasError && (
        <div className="text-red-500 text-[12px] mt-1">
          {hasError}
        </div>
      )}
    </div>
  );
};

export default MultiselectWidget;