const selectWidget = (props) => {

  console.log('Select Widget props are ', props)
  return (
    <div className=" mx-2 mb-3">
      <label className="text-sm leading-5 text-gray-700 flex">
        Select
        <div className="ml-2">
          {/* Add tooltip or other elements if needed */}
        </div>
      </label>
      <select
        className="block w-[200px] py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        defaultValue=""
        onChange={(e) => {
          // Handle onChange event if necessary
        }}
        >
        <option value="">Select</option>
        {props.uiSchema.enum.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default selectWidget;
