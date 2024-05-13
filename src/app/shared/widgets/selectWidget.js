import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {MdInfoOutline} from "react-icons/md";

const selectWidget = (props) => {
  const handleChange = (e) => {
    // Call props.onChange to ensure RJSF handles the state update
    props.onChange(e.target.value);
  };

  return (
    <div className="mb-3">
       {/* <div className='flex'>
          <label   className="text-sm leading-5 text-gray-700 flex">{props.title}</label>

            <MdInfoOutline
              data-tooltip-id={`tooltip-${props.tooltiptext}`}
              data-tooltip-content={props.tooltiptext}
              className="mt-1 ml-2 text-[12px]"
            />


            <ReactTooltip
              id={`tooltip-${props.tooltiptext}`}
              place="top"
              effect="solid"
              style={{
                width: "290px",
                backgroundColor: "#000",
                color: "white",
                fontSize: "12px",
                boxShadow: 3,
                borderRadius: "8px",
                textAlign: 'center',
              }}
            />

        </div> */}
      <select
        className="block w-[230px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        value={props.value || ''}
        onChange={handleChange}
      >
        {/* Include an option for users to select a placeholder, ensuring it can't be reselected after making a choice */}
        <option value="" disabled={!!props.value}>{`Select ${props.label}` || "Select..."}</option>
        {props.options.enumOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default selectWidget;
