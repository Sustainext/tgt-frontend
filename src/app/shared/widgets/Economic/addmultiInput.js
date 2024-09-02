import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { MdInfoOutline, MdOutlineDeleteOutline,MdAdd } from "react-icons/md";

const AddmultiInput = (props) => {
  const { onChange, label, uiSchema = {} } = props;
  const [inputGroups, setInputGroups] = useState([{ id: 1, value1: "", value2: "" }]);

  const handleChange = (id, event, inputType) => {
    const newInputGroups = inputGroups.map((group) => {
      if (group.id === id) {
        return { ...group, [inputType]: event.target.value };
      }
      return group;
    });
    setInputGroups(newInputGroups);
    onChange(newInputGroups.reduce((acc, group) => {
      acc[`group${group.id}`] = { value1: group.value1, value2: group.value2 };
      return acc;
    }, {}));
  };

  const addInputGroup = () => {
    setInputGroups([...inputGroups, { id: inputGroups.length + 1, value1: "", value2: "" }]);
  };

  const removeInputGroup = (id) => {
    const newInputGroups = inputGroups.filter((group) => group.id !== id);
    setInputGroups(newInputGroups);
    onChange(newInputGroups.reduce((acc, group) => {
      acc[`group${group.id}`] = { value1: group.value1, value2: group.value2 };
      return acc;
    }, {}));
  };

  return (
    <div className="mb-3 relative">
      <p className="text-sm text-gray-700 flex mb-2" style={{ display: uiSchema["ui:titledisplay"] }}>
        {label}
        <MdInfoOutline
          data-tooltip-id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
          data-tooltip-content={uiSchema["ui:tooltip"]}
          className="mt-1 ml-2 w-[30px] text-[14px]"
          style={{ display: uiSchema["ui:tooltipdisplay"] }}
        />
        <ReactTooltip
          id={`tooltip-${uiSchema["ui:title"].replace(/\s+/g, "-")}`}
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

      {inputGroups.map((group) => (
        <div key={group.id} className="mb-2">
            <div className="flex ">
            <div className="w-[98%]">
            <input
              className={uiSchema["ui:widgtclass"]}
              placeholder={uiSchema["ui:widgetplaceholder"]}
              type={uiSchema["ui:inputtype1"]}
              value={group.value1}
              onChange={(event) => handleChange(group.id, event, "value1")}
            />
            <input
              className={uiSchema["ui:widgtclass2"]}
              placeholder={uiSchema["ui:widgetplaceholder2"]}
              type={uiSchema["ui:inputtype2"]}
              value={group.value2}
              onChange={(event) => handleChange(group.id, event, "value2")}
            />

          </div>
          <div className="flex items-center">
          <button
              type="button"
              className="ml-2 text-red-500 mt-8"
              onClick={() => removeInputGroup(group.id)}
              style={{ display: inputGroups.length > 1 ? 'inline' : 'none' }}
            >
               <MdOutlineDeleteOutline size={25} />
            </button>
          </div>
            </div>


        </div>
      ))}
   <div className="flex right-1 mx-2">
   <button
    type="button"
    className="text-blue-500 font-semibold text-[15px] flex items-center cursor-pointer"
    onClick={addInputGroup}
  >
    Add country <MdAdd className="text-lg ml-1" />
  </button>
      </div>

    </div>
  );
};

export default AddmultiInput;
