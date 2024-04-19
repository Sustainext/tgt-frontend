'use client'
import { useState} from 'react';
import { MdOutlineArrowDropDown, MdOutlineFileUpload, MdOutlineDeleteOutline,MdAdd, MdInfoOutline } from "react-icons/md";

// const NewTooltip = ({ tooltiptext }) => {
//   return (
//     <Tooltip title={tooltiptext} arrow placement="top" componentsProps={{
//       tooltip: {
//           sx: {
//               backgroundColor: '#000',
//               color: 'white',
//               fontSize: '12px',
//               boxShadow: 3,
//               borderRadius:"8px"
//           },
//       },
//       arrow: {
//           sx: {
//               color: '#000',
//           },
//       },
//   }}>
//   <MdInfoOutline/>
// </Tooltip>
//   );
// };
const Consumedfuel = ({open}) => {
    const [rows, setRows] = useState([{ fieldName: '' }]);
    const handleInputChange = (index, event) => {
      const newRows = [...rows];
      newRows[index][event.target.name] = event.target.value;
      setRows(newRows);
    };

    const addRow = () => {
      setRows([...rows, { fieldName: '' }]);
    };

    const removeRow = (index) => {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    };
  const Energy = [
  {
    value: "Electricity",
    label: "Electricity",
  },
  {
    value: "Heating",
    label: "Heating",
  },
  {
    value: "Cooling",
    label: "Cooling",
  },
  {
    value: "Steam",
    label: "Steam",
  },

];
const Source = [
  {
    value: "Coal",
    label: "Coal",
  },
  {
    value: "Solar",
    label: "Solar",
  },
  {
    value: "LPG",
    label: "LPG",
  },
  {
    value: "Diesel",
    label: "Diesel",
  },
  {
    value: "Wind",
    label: "Wind",
  },
  {
    value: "Hydro",
    label: "Hydro",
  },
  {
    value: "Natural Gas",
    label: "Natural Gas",
  },
  {
    value: "Electricity",
    label: "Electricity",
  },
  {
    value: "Cooling",
    label: "Cooling",
  },
  {
    value: "Steam",
    label: "Steam",
  },
  {
    value: "Heating",
    label: "Heating",
  },
  {
    value: "Wood Chips",
    label: "Wood Chips",
  },
  {
    value: "Crude Oil",
    label: "Crude Oil",
  },
  {
    value: "Other",
    label: "Other",
  },

];
const Unit = [
  {
    value: "Joules",
    label: "Joules",
  },
  {
    value: "KJ",
    label: "KJ",
  },
  {
    value: "Wh",
    label: "Wh",
  },
  {
    value: "KWh",
    label: "KWh",
  },
  {
    value: "GJ",
    label: "GJ",
  },
  {
    value: "MMBtu",
    label: "MMBtu",
  },

];
    return (
      <>
      <div className="mt-3">
        <form>
          {rows.map((row, index) => (
            <div key={index} className="mb-4">
              <div className="flex mb-3">
              <div className={`overflow-x-scroll custom-scrollbar ${open ? 'sm:w-[720px] md:w-[720px] lg:w-[720px] xl:w-[700px] 2xl:w-[720px]' : 'sm:w-[420px] md:w-[420px] lg:w-[749px] xl:w-[525px] 2xl:w-[750px]'}`}>
                  <div className="flex">
                    <div className="w-full max-w-xs mb-3">
                    {index === 0 && (
                      <label className="text-sm leading-5 text-gray-700 flex">
                        Energy Type
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="indicate type of energy from the drop down" /> */}
                        </div>
                      </label>
                    )}
                      <select
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                        Select energy type
                        </option>
                        {Energy.map((eng) => (
                          <>
                            <option value={eng.value}>{eng.label}</option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div className="w-full max-w-xs mx-2 mb-3">
                    {index === 0 && (
                      <label className="text-sm  leading-5 text-gray-700 flex">
                        Source
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Indicate where the energy comes from" /> */}
                        </div>
                      </label>
                    )}
                      <select
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                        Select source
                        </option>
                        {Source.map((source) => (
                          <>
                            <option value={source.value}>{source.label}</option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div className="w-full max-w-xs mx-2 mb-3">
                    {index === 0 && (
                      <label className="text-sm  leading-5 text-gray-700 flex">
                      Purpose
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Indicate the purpose it's being used for.E.g. Manufacturing, packaging, combustion " /> */}
                        </div>
                      </label>
                    )}
                      <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter purpose"
                      />
                    </div>
                    <div className="w-full max-w-xs mx-2 mb-3">
                    {index === 0 && (
                      <label className="text-sm  leading-5 text-gray-700 flex">
                        Renewable/ Non-renewable
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Select from the dropdown to indicate whether it's Renewable or Non-Renewable Energy" /> */}
                        </div>
                      </label>
                    )}
                      <select
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                        Select type
                        </option>
                        <option>Renewable</option>
                        <option>Non-renewable</option>
                      </select>
                    </div>
                    <div className="w-full max-w-xs mx-2 mb-3">
                    {index === 0 && (
                      <label className="text-sm  leading-5 text-gray-700 flex">
                        Quantity
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Indicate the purchased quantity" /> */}
                        </div>
                      </label>
                    )}
                      <input
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div className="w-full max-w-xs mx-2 mb-3">
                    {index === 0 && (
                      <label className="text-sm  leading-5 text-gray-700 flex">
                        Unit{" "}
                        <div className="ml-2">
                          {/* <NewTooltip tooltiptext="Select the correct unit corresponding to the quantity purchased." /> */}
                        </div>
                      </label>
                    )}
                      <select
                        className="block w-[270px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
                        defaultValue=""
                      >
                        <option value="" disabled>
                        Select unit
                        </option>
                        {Unit.map((unit) => (
                          <>
                            <option value={unit.value}>{unit.label}</option>
                          </>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className={`flex pt-4 absolute  bg-white  h-[73px] ${open ? 'sm:right-[3rem] md:right-[3rem] lg:right-[4rem] xl:right-[4rem] 2xl:right-[4rem]' : 'sm:right-[3rem] md:right-[3rem] lg:right-[3rem] xl:right-[3rem] 2xl:right-[3rem]'}`}>
                  <div className="flex ml-3 h-[10px]">
                    <div className="w-[85px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-l flex-col justify-center items-center inline-flex">
                      <div className="justify-center items-center gap-2 inline-flex">
                        <div className="relative text-white text-[13px] font-medium leading-snug tracking-wide">
                          Assign to
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-[25px] h-[30px] px-2.5 py-1 bg-[#007EEF] rounded-r">
                      <div className="relative inline-flex">
                        <div className="absolute -mr-2 inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <MdOutlineArrowDropDown className="text-white bg-[#007EEF]" />
                        </div>
                        <select className="flex justify-center items-center w-[25px] h-[30px] px-2.5 py-1 bg-sky-600 rounded-r cursor-pointer appearance-none focus:outline-none text-white bg-blue hover:bg-light-blue-300">
                          <option value="" className="text-white pe-1"></option>

                          <option>sk</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex ml-4 h-[10px]">
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*" // Hide the file input
                    />
                    <button className="text-[#007EEF] text-[14px] flex">
                      <MdOutlineFileUpload className='text-[18px]' style={{marginTop:'1px'}}

                      />{" "}
                      Upload
                    </button>
                  </div>

                  <div className="h-[10px] ml-4">
                    {" "}
                    <MdOutlineDeleteOutline
                      className="text-red-600 cursor-pointer text-2xl"
                      onClick={() => removeRow(index)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </form>
      </div>
      <button
        className="font-bold py-2 px-4 rounded text-xs opacity-70 text-sky-600 flex"
        onClick={addRow}
      >
        <MdAdd className='text-lg' />{" "}
        <p  className='text-sm'>Add new</p>
      </button>
    </>
    );
  };

  export default Consumedfuel;
