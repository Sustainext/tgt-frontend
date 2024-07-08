
const inputnumberWidget = (props) => {
    const { onChange, value = ""} = props;
    const handleChange = (event) => {
      onChange(event.target.value);
  };
  const handleKeyDown = (event) => {
    // Prevent 'e', '+', '-', and '.' from being entered
    if (["e", "E", "+", "-", "."].includes(event.key)) {
      event.preventDefault();
    }
  };
      return (
        <input
        className="block w-[20vw] py-2 mx-2 text-sm leading-6 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300 mb-3 text-right placeholder-left pr-2"
              placeholder={props.placeholder || `Enter ${props.label || props.title}`}
              type="number"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
          />
      );
    };

  export default inputnumberWidget;