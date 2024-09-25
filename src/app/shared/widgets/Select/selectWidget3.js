

const selectWidget3 = (props) => {
    const handleChange = (e) => {
      // Call props.onChange to ensure RJSF handles the state update
      props.onChange(e.target.value);
    };

    return (
      <div className="flex justify-center items-center mt-2 mx-2">

        <select
          className={`text-center py-1 text-sm w-[100px] rounded focus:outline-none focus:shadow-outline  ${
            props.value ? 'bg-white text-blue-500 shadow-md' : 'bg-blue-500 text-white'
          }`}
          value={props.value || ''}
          onChange={handleChange}
        >
          <option value="" disabled={!!props.value}>{`Unit` || "Select..."}</option>
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
