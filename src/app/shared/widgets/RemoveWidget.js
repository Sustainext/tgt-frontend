import { MdAdd,MdOutlineDeleteOutline } from "react-icons/md";
const RemoveWidget = ({ formData, setFormData }) => {
    const handleRemove = (indexToRemove) => {
        const updatedFormData = formData.filter((_, index) => index !== indexToRemove);
        setFormData(updatedFormData);
      }; // Assuming index is passed as part of options
    return (
      <div className="mt-2">
        {formData.map((_, index) => (
          <button
            key={index}
            className="text-[#007EEF] text-[12px] flex justify-center cursor-pointer ml-3"
            onClick={() => handleRemove(index)}
            style={{ visibility: 'visible' }}  // Ensure visibility is explicitly set
          >
            <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
          </button>
        ))}
      </div>
    );
  };

  export default RemoveWidget;

