
const inputWidget = (props) => {
  const { onChange, value = ""} = props;
  const handleChange = (event) => {
    onChange(event.target.value);
};
    return (
      <input
      className="block w-[230px] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-3"
            placeholder={props.placeholder || `Enter ${props.label || props.title}`}
            type="text"
            value={value}
            onChange={handleChange}
        />
    );
  };

export default inputWidget;