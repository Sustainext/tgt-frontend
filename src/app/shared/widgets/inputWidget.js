
const inputWidget = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
};
    return (
      <input
      className="block w-[230px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
            placeholder={props.placeholder || `Enter ${props.label || props.title}`}
            type="text"
            value={props.value || ''} // Ensuring the input displays the current form data value
            onChange={handleChange} // Handling changes
        />
    );
  };

export default inputWidget;