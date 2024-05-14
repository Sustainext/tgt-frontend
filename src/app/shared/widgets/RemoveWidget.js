import { MdOutlineDeleteOutline } from "react-icons/md";

const RemoveWidget = ({ formData, setFormData }) => {
  const handleRemove = (indexToRemove) => {
    const updatedFormData = formData.filter((_, index) => index !== indexToRemove);
    setFormData(updatedFormData);
  };

  return (
    <div className="mt-2">
      {formData.length > 1 && ( // Only render delete button if there's more than one row
        <button
          className="text-[#007EEF] text-[12px] flex justify-center cursor-pointer"
          onClick={() => handleRemove(formData.length - 1)} // Remove the last row
        >
          <MdOutlineDeleteOutline className="text-red-600 cursor-pointer text-2xl" />
        </button>
      )}
    </div>
  );
};

export default RemoveWidget;
