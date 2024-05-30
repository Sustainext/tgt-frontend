

const selectWidget2 = (props) => {
    const handleChange = (e) => {
      // Call props.onChange to ensure RJSF handles the state update
      props.onChange(e.target.value);
    };

    return (
      <div className="mb-3">

        <select
          className="block  p-2 text-[#727272] text-[14px] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 capitalize w-[89%]"
          value={props.value || ''}
          onChange={handleChange}
        >
          <option value="" disabled={!!props.value}>{`Select`}</option>
          {props.options.enumOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default selectWidget2;
