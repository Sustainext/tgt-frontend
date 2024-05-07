const selectWidget = (props) => {

  console.log('Select Widget props are ', props)
  return (
    <div className=" mx-2 mb-3">
      <select
        className="block w-[100px] py-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        defaultValue=""
        onChange={(e) => {
          // Handle onChange event if necessary
        }}
        >
        <option value="" className="text-xs" >Select</option>
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
