

const selectWidget = (props) => {
  const handleChange = (e) => {
    // Call props.onChange to ensure RJSF handles the state update
    props.onChange(e.target.value);
  };

  return (
    <div className="mb-3">

      <select
        className="block w-[230px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 capitalize"
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
