import { MdOutlineFileUpload, MdAdd, MdOutlineDeleteOutline, MdFilePresent, MdArrowDropDown, MdClose } from "react-icons/md";
const CustomFileUploadWidget = ({ id, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.files[0]);
  };

  return (
    <div className="w-[120px] flex justify-center">

      <input
        type="file"
        id={id}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <label htmlFor={id} className="text-[#007EEF] text-[12px] cursor-pointer mt-5 mb-5 w-[150px] flex ">
      <MdOutlineFileUpload className='text-[18px]' style={{ marginTop: '1px' }} /> Upload File
      </label>
    </div>
  );
};

export default CustomFileUploadWidget;
