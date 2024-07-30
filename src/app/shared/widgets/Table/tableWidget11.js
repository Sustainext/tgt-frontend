import React from 'react';
import { debounce } from 'lodash';
import { MdInfoOutline, MdOutlineDeleteOutline, MdAdd } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const CustomTableWidget11 = ({ id, schema, uiSchema, value, required, onChange, formContext }) => {
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
        onChange([...value, newRow]);
    };
    return (
        <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <table id={id} className="rounded-md border border-gray-300 w-full">
                <thead className="gradient-background">
                    <tr>
                        {uiSchema['ui:options'].titles.map((item, idx) => (
                            <th key={idx} style={{ minWidth: '120px', textAlign: 'left' }} className="text-[12px] border border-gray-300 px-2 py-2">
                                <div className='flex'>
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
                                        className="max-w-xs bg-black text-white text-xs rounded-lg shadow-md"
                                    />
                                </div>
                            </th>
                        ))}
                        <th className="text-[12px] border border-gray-300 px-2 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(item).map((key, cellIndex) => {
                                const propertySchema = schema.items.properties[key];
                                const isEnum = propertySchema && propertySchema.hasOwnProperty('enum');
                                const inputType = uiSchema['ui:options'].titles.find(t => t.title2 === key)?.type || 'text';

                                return (
                                    <td key={cellIndex} className="border border-gray-300 p-3 text-center">
                                        {isEnum ? (
                                            <>
                                                <select
                                                    value={item[key]}
                                                    onChange={(e) => updateField(rowIndex, key, e.target.value, isEnum)}
                                                    className="text-sm pl-2 py-2 w-full"
                                                    required={required}>
                                                    <option value="">Select Type of Incident</option>
                                                    {schema.items.properties[key].enum.map((option) => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                                {key === 'typeofincident' && item[key] === 'Others' && (
                                                    <div className="flex items-center mt-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Please specify"
                                                            value={item['otherDetails'] || ''}
                                                            onChange={(e) => updateField(rowIndex, 'otherDetails', e.target.value, false)}
                                                            className="text-sm pl-2 py-2 w-full border"
                                                        />
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>

                                                {(key === 'totalnumberofincidentsofdiscrimination' || key === 'describetheincident') ? (
                                                    <input
                                                        type={inputType}
                                                        required={required}
                                                        value={item[key]}
                                                        onChange={(e) => updateField(rowIndex, key, e.target.value, false)}
                                                        className="text-sm pl-2 py-2 w-full border"
                                                    />
                                                ) : (
                                                    <button onClick={() => formContext.onRemove(rowIndex)} title="Remove row" className='text-center mx-auto'>
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
