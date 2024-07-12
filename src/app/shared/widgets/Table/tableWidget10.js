import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { MdOutlineDeleteOutline, MdAdd } from "react-icons/md";

const CustomTableWidget10 = ({
  id,
  options,
  value,
  required,
  onChange,
  formContext,
}) => {
  const [rowSpan, setRowSpan] = useState(4);

  const handleInputChange = useCallback(
    debounce((newData) => {
      onChange(newData);
    }, 200),
    []
  );

  const updateField = (index, key, newValue) => {
    const newData = [...value];
    newData[index][key] = newValue;
    handleInputChange(newData);
  };

  const getInputType = (key) => {
    const field = options.subTitles.find((item) => item.title.toLowerCase().replace(/ /g, "") === key.toLowerCase());
    return field ? field.type : "text";
  };

  const handleAddRow = () => {
    const newRow = {
      category: "",
      numberperformancereview: "",
      numberdevelopmentreview: "",
    };
    const newData = [...value, newRow];
    onChange(newData);
    setRowSpan(rowSpan + 1); // Update rowSpan when a row is added
  };

  const handleRemoveRow = (rowIndex) => {
    const newData = value.filter((_, index) => index !== rowIndex);
    onChange(newData);
    setRowSpan(rowSpan - 1); // Update rowSpan when a row is removed
  };

  useEffect(() => {
    console.log("CustomTableWidget value:", value);
  }, [value]);

  const calculateTotal = (key) => {
    return value.reduce((acc, item) => acc + (parseFloat(item[key]) || 0), 0);
  };

  const totalTrainingHours = calculateTotal("numberperformancereview") + calculateTotal("male") + calculateTotal("female") + calculateTotal("nonBinary");
  const totalTrainingHours2 = calculateTotal("numberdevelopmentreview") + calculateTotal("male2") + calculateTotal("female2") + calculateTotal("nonBinary2");

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-r border-b border-gray-300"></th>
            <th className="py-2 px-4 border-r border-b border-gray-300"></th>
            <th className="py-2 px-4 border-r border-b border-gray-300">Number of employees who received regular performance review</th>
            <th className="py-2 px-4 border-b border-gray-300">Number of employees who received regular career development review</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr>
                <td className="py-2 px-4 border-r border-b border-gray-300" rowSpan={1}>{rowIndex === 0 ? "Employee Category" : ""}</td>
                <td className="py-2 px-4 border-r border-b border-gray-300">
                  <InputField
                    type={getInputType("category")}
                    required={required}
                    value={item.category}
                    onChange={(newValue) => updateField(rowIndex, "category", newValue)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <InputField
                    type={getInputType("numberperformancereview")}
                    required={required}
                    value={item.numberperformancereview}
                    onChange={(newValue) => updateField(rowIndex, "numberperformancereview", newValue)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <InputField
                    type={getInputType("numberdevelopmentreview")}
                    required={required}
                    value={item.numberdevelopmentreview}
                    onChange={(newValue) => updateField(rowIndex, "numberdevelopmentreview", newValue)}
                  />
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button onClick={() => handleRemoveRow(rowIndex)}>
                    <MdOutlineDeleteOutline className="text-[23px] text-red-600" />
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
          <tr>
            <td className="py-2 px-4 border-r border-b border-gray-300" rowSpan="4">Gender</td>
            <td className="py-2 px-4 border-r border-b border-gray-300 text-center">Male</td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("male")}
                required={required}
                value={value[0]?.male || ""}
                onChange={(newValue) => updateField(0, "male", newValue)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("male2")}
                required={required}
                value={value[0]?.male2 || ""}
                onChange={(newValue) => updateField(0, "male2", newValue)}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-r border-b border-gray-300 text-center">Female</td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("female")}
                required={required}
                value={value[0]?.female || ""}
                onChange={(newValue) => updateField(0, "female", newValue)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("female2")}
                required={required}
                value={value[0]?.female2 || ""}
                onChange={(newValue) => updateField(0, "female2", newValue)}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-r border-b border-gray-300 text-center">Non Binary</td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("nonBinary")}
                required={required}
                value={value[0]?.nonBinary || ""}
                onChange={(newValue) => updateField(0, "nonBinary", newValue)}
              />
            </td>
            <td className="py-2 px-4 border-b border-gray-300">
              <InputField
                type={getInputType("nonBinary2")}
                required={required}
                value={value[0]?.nonBinary2 || ""}
                onChange={(newValue) => updateField(0, "nonBinary2", newValue)}
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-r border-b border-gray-300 text-center">Total employee</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{totalTrainingHours}</td>
            <td className="py-2 px-4 border-b border-gray-300 text-center">{totalTrainingHours2}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex right-1 mx-2">
        <button
          type="button"
          className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
          onClick={handleAddRow}
        >
          Add category <MdAdd className="text-lg" />
        </button>
      </div>
    </div>
  );
};

const InputField = ({ type, required, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      type={type}
      required={required}
      value={inputValue}
      onChange={handleInputChange}
      style={{ width: "100%" }}
      placeholder="Enter data"
      className="text-sm pl-2 py-2 text-center"
    />
  );
};

export default CustomTableWidget10;
