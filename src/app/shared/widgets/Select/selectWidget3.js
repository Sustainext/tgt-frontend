

const selectWidget3 = (props) => {
    const handleChange = (e) => {
      // Call props.onChange to ensure RJSF handles the state update
      props.onChange(e.target.value);
    };

    return (
      <div className="mb-3 mx-2 mt-1">

        <select
          className="w-[80px] text-center cursor-pointer appearance-none px-2 py-1 rounded-md leading-tight outline-none mt-1.5 font-bold text-sm bg-blue-500 text-white"
          value={props.value || ''}
          onChange={handleChange}
        >
          <option value="" disabled={!!props.value}>{`${props.label}` || "Select..."}</option>
          {props.options.enumOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  export default selectWidget3;
