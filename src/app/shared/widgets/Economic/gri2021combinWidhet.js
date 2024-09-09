import React, { useState, useEffect } from "react";
import { MdAdd, MdOutlineDeleteOutline, MdInfoOutline } from "react-icons/md";
import Select from "react-select";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Currency } from "../../data/currency";

const options = { enumOptions: ["Yes", "No", "Variable"] };

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    padding: 0,
    margin: 0,
    minHeight: "auto",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#000",
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: 0,
  }),
};

const currencyOptions = Currency.map(({ currency, country, currency_name }) => ({
  value: currency,
  label: `${currency} - ${currency_name}`,
}));

const GRI2021combinWidhet = ({ locationdata, onChange, value = [] }) => {
  const [locations, setLocations] = useState(
    Array.isArray(value.locations) ? value.locations : [{ id: 1, value: "" }]
  );
  const [radioValue, setRadioValue] = useState(value.radioValue || "");
  const [currencyValue, setCurrencyValue] = useState(value.currencyValue || "");
  const [wages, setWages] = useState(value.wages || {});

  useEffect(() => {
    const formData = {
      locations,
      radioValue,
      currencyValue,
      wages,
    };
    onChange(formData); // Call onChange to pass data up
  }, [locations, radioValue, currencyValue, wages, onChange]);

  const handleLocationChange = (id, selectedOption) => {
    const updatedLocations = locations.map((location) =>
      location.id === id
        ? { ...location, value: selectedOption ? selectedOption.value : "" }
        : location
    );
    setLocations(updatedLocations);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleCurrencyChange = (selectedOption) => {
    setCurrencyValue(selectedOption ? selectedOption.value : "");
  };

  const handleWageChange = (locationId, gender, wageValue) => {
    setWages((prevWages) => ({
      ...prevWages,
      [locationId]: {
        ...prevWages[locationId],
        [gender]: wageValue,
      },
    }));
  };

  const addRow = () => {
    setLocations([...locations, { id: Date.now(), value: "" }]);
  };

  const removeRow = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
    setWages((prevWages) => {
      const updatedWages = { ...prevWages };
      delete updatedWages[id];
      return updatedWages;
    });
  };

  const genders = ["Male", "Female", "Non-binary"];

  return (
    <>
      {/* Location Selection */}
      <div className="mb-4">
        {Array.isArray(locations) && locations.length > 0 ? (
          locations.map((location, index) => (
            <div key={location.id} className="mb-2 flex items-center">
              <select
                className="block p-2 text-[#727272] text-[14px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize w-[95%]"
                value={location.value}
                onChange={(e) =>
                  handleLocationChange(location.id, { value: e.target.value })
                }
              >
                <option value="">{`Select from location`}</option>
                {locationdata && locationdata.length > 0 ? (
                  locationdata.map((loc) => (
                    <option key={loc.location_name} value={loc.location_name}>
                      {loc.location_name}
                    </option>
                  ))
                ) : (
                  <option disabled>No locations available</option>
                )}
              </select>
              {/* Show Remove button only if locationdata count is more than 1 and locations.length is more than 1 */}
              {locationdata.length > 1 && locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(location.id)}
                  className="text-red-500 ml-2"
                >
                  <MdOutlineDeleteOutline className="text-lg" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No locations added</p>
        )}
        <div className="mt-2">
          {/* Show Add button only if there are locations left to add */}
          {locationdata.length > 1 && locations.length < locationdata.length && (
            <button
              type="button"
              onClick={addRow}
              className="text-blue-500 flex items-center ml-1"
            >
              Add Row <MdAdd className="ml-2" />
            </button>
          )}
        </div>
      </div>

      {/* Radio Button Section */}
      <div className="mb-4">
        <div className="flex mb-4 items-center relative">
          <p className="text-[15px] text-gray-500 font-semibold flex">
            Does a minimum local wage exist for the selected location?
            <MdInfoOutline
              data-tooltip-id={`tooltip-es231`}
              data-tooltip-content="Indicate whether a local minimum wage is absent or variable at significant locations of operation, by gender."
              className="ml-2 text-[14px] align-middle mt-1"
            />
            <ReactTooltip
              id={`tooltip-es231`}
              place="top"
              effect="solid"
              className="!max-w-xs !bg-black !text-white !text-xs !rounded-lg !shadow-md"
            />
          </p>
        </div>
        <div className="flex gap-2">
          {options.enumOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2 text-sm mb-2">
              <input
                type="radio"
                name="wageRadio"
                value={option}
                onChange={handleRadioChange}
                className="form-radio h-3 w-3"
                checked={radioValue === option}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Currency Selection */}
      <div className="flex mb-4 items-center relative">
        <p className="text-[15px] text-gray-500 font-semibold flex mb-2">
          If a local minimum wage exists or variable at significant locations of
          operation, please mention a minimum local wage by gender:
          <MdInfoOutline
            data-tooltip-id={`tooltip-es245`}
            data-tooltip-content="If minimum wages vary across locations, then specify the minimum wage."
            className="ml-2 text-[14px] align-middle mt-1"
          />
          <ReactTooltip
            id={`tooltip-es245`}
            place="top"
            effect="solid"
            className="!max-w-xs !bg-black !text-white !text-xs !rounded-lg !shadow-md"
          />
        </p>
      </div>
      <div>
        <p className="text-[14px] text-gray-500  flex mb-4">Select Currency</p>
        <Select
          styles={customStyles}
          className="block w-[20vw] text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-4"
          onChange={handleCurrencyChange}
          value={
            currencyOptions.find((option) => option.value === currencyValue) ||
            null
          }
          options={currencyOptions}
          isClearable
          placeholder="Select Currency"
        />
      </div>

      {/* Dynamic Table */}
      <div className="mb-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="gradient-background h-[80px]">
            <tr className="text-center">
              <th className="text-sm font-medium p-2 border border-gray-300">
                Significant location of operations
              </th>
              <th className=" text-sm font-medium p-2 border border-gray-300">
                Gender
              </th>
              <th className=" text-sm font-medium p-2 border border-gray-300">
                Minimum wage
              </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) =>
              location.value
                ? genders.map((gender, index) => (
                    <tr key={`${location.id}-${gender}`}>
                      {index === 0 && (
                        <td
                          rowSpan={genders.length}
                          className="p-2 border border-gray-300 text-center"
                        >
                          {location.value}
                        </td>
                      )}
                      <td className="p-2 border border-gray-300 text-center">
                        {gender}
                      </td>
                      <td className="p-2 border border-gray-300">
                        <input
                          type="number"
                          className="w-full p-2 border-b border-gray-300 rounded"
                          placeholder="Enter Value"
                          value={wages[location.id]?.[gender] || ""}
                          onChange={(e) =>
                            handleWageChange(
                              location.id,
                              gender,
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))
                : null
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GRI2021combinWidhet;
