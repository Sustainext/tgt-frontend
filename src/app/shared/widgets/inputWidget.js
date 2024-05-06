
const inputWidget = (props) => {
    return (
      <input
        className="block w-[200px] py-2 text-sm leading-6  focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 border-b-2 border-gray-300"
        placeholder={props.placeholder}
        type="text"
        width={props.width}
        />
    );
  };

export default inputWidget;