import React,{useState,useEffect} from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const CustomTableWidget11 = ({ id, schema, uiSchema, value, required, onChange,  formContext = {}, }) => {

    const [localErrors, setLocalErrors] = useState(formContext.validationErrors || []);
    useEffect(() => {
      setLocalErrors(formContext.validationErrors || []);
    }, [formContext.validationErrors]);

    // Using debounce to manage frequent updates for text inputs
    const debouncedUpdate = debounce((newData) => {
        onChange(newData);
    }, 100);

    const updateField = (index, key, newValue, isEnum) => {
        const newData = value.map((item, idx) => {
            if (idx === index) {
                return { ...item, [key]: newValue };
            }
            return item;
        });

       const updatedErrors = [...localErrors];
       if (!newValue.trim()) {
        if (!updatedErrors[index]) updatedErrors[index] = {};
        updatedErrors[index][key] = 'This field is required';
    } else {
        if (updatedErrors[index]) {
            delete updatedErrors[index][key];
        }
    }
        if (key === "typeofincident" && newValue === "Others") {
            if (!newData[index].otherDetails?.trim()) {
                if (!updatedErrors[index]) updatedErrors[index] = {};
                updatedErrors[index].otherDetails = 'Please specify details';
            }
        } else if (key === "typeofincident" && newValue !== "Others") {
            if (updatedErrors[index]) {
                delete updatedErrors[index].otherDetails; // Remove error if not "Others"
            }
        }

        setLocalErrors(updatedErrors);

        if (isEnum) {
            onChange(newData);  // Immediate update for enums
        } else {
            debouncedUpdate(newData);  // Debounced update for text inputs
        }
    };

    

    const addNewRow = () => {
        const newRow = Object.keys(schema.items.properties).reduce((acc, key) => {
            // Set the default value for enum fields to an empty string
            acc[key] = schema.items.properties[key].enum ? '' : '';
            return acc;
        }, {});
        setLocalErrors([...localErrors, {}]);
        onChange([...value, newRow]);
    };

    const removeRow = (indexToRemove) => {
        const newData = value.filter((_, idx) => idx !== indexToRemove);
        const updatedErrors = [...localErrors];
        updatedErrors.splice(indexToRemove, 1);
        setLocalErrors(updatedErrors);
        onChange(newData);
    };

    return (
        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <table id={id} className="border border-gray-300 w-full rounded-md" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead className="gradient-background h-[54px]">
                    <tr>
                        {uiSchema['ui:options'].titles.map((item, idx) => (
                            <th key={idx} style={{ minWidth: '120px'}} 
                            className={`text-[12px] w-[30%] px-2 py-2 ${
                                idx === 0 ? "" : " border-l border-gray-300"
                              }`}
                           >
                                <div className='flex justify-center relative'>
                                    <p>{item.title}</p>
                                    <MdInfoOutline
                                        data-tooltip-id={`tooltip-${item.title2}`}
                                        data-tooltip-content={item.tooltip}
                                        style={{ display: `${item.display}` }}
                                        className="ml-2 cursor-pointer mt-0.5" />
                                    <ReactTooltip
                                        id={`tooltip-${item.title2}`}
                                        place="top"
                                        effect="solid"
                                        style={{
                                            width:"400px",
                                            backgroundColor: "#000",
                                            color: "white",
                                            fontSize: "12px",
                                            boxShadow: 3,
                                            borderRadius: "8px",
                                            zIndex:"1000",
                                          }}
                                    />
                                </div>
                            </th>
                        ))}
                        <th className="text-[12px]  px-2 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(item).map((key, cellIndex) => {
                                const propertySchema = schema.items.properties[key];
                                const isEnum = propertySchema && propertySchema.hasOwnProperty('enum');
                                const inputType = uiSchema['ui:options'].titles.find(t => t.title2 === key)?.type || 'text';
                                const error = localErrors[rowIndex]?.[key];
                                return (
                                    <td key={cellIndex} 
                                    className={`p-3 text-center ${
                                        cellIndex === 0 
                                          ? "border-t border-gray-300"  
                                          : cellIndex === 3 
                                          ? "border-t border-gray-300"  
                                          : "border-t border-l border-gray-300"  
                                      }`}>
                                        {isEnum ? (
                                            <>
                                                <select
                                                    value={item[key]}
                                                    onChange={(e) => updateField(rowIndex, key, e.target.value, isEnum)}
                                                    className={`text-[12px] py-2 w-full border-b ${
                                                        error ? 'border-red-500' : 'border-gray-700'
                                                    }`}
                                                    required={required}>
                                                    <option value="">Select Type of Incident</option>
                                                    {schema.items.properties[key].enum.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                {error && <div className="text-red-500 text-[12px] mt-1 text-left">{error}</div>}
                                                {key === 'typeofincident' && item[key] === 'Others' && (
                                                    <div className="mt-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Please specify"
                                                            value={item['otherDetails'] || ''}
                                                            onChange={(e) => updateField(rowIndex, 'otherDetails', e.target.value, false)}
                                                            className={`text-[12px] pl-2 py-2 w-full ${
                                                                localErrors[rowIndex]?.otherDetails=="This field is required" ? 'border-red-500' : 'border-gray-700'
                                                            } border-b`}
                                                        />
                                                           {localErrors[rowIndex]?.otherDetails=="This field is required" && (
            <div className="text-red-500 text-[12px] mt-1 text-left">
                {localErrors[rowIndex]?.otherDetails}
            </div>
        )}
                                                    </div>
                                                    
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {(key === 'totalnumberofincidentsofdiscrimination' || key === 'describetheincident') ? (
                                                    <>
                                                    <input
                                                        type={inputType}
                                                        required={required}
                                                        value={item[key]}
                                                        onChange={(e) => updateField(rowIndex, key, e.target.value, false)}
                                                        className={`text-[12px] pl-2 py-2 w-full ${
                                                            error ? 'border-red-500' : 'border-gray-700'
                                                        } border-b`}
                                                           placeholder="Enter data"
                                                    />
                                                    {error && <div className="text-red-500 text-[12px] mt-1 text-left">{error}</div>}
                                                    </>
                                                ) : (
                                                    <button onClick={() => removeRow(rowIndex)} title="Remove row" className='text-center mx-auto'>
                                                        <MdOutlineDeleteOutline className='text-[23px] text-red-600' />
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                );
                            })}

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex right-1 mx-2">
                <button
                    type="button"
                    className="text-[#007EEF] text-[13px] flex cursor-pointer mt-5 mb-5"
                    onClick={addNewRow}
                >
                    Add incident <MdAdd className='text-lg' />
                </button>
            </div>
        </div>
    );
};

export default CustomTableWidget11;
