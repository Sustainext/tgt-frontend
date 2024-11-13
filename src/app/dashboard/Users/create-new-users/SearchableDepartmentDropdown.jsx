import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdSearch, MdAdd } from "react-icons/md";
import {
  fetchDepartments,
  addNewDepartment,
  setdepartment,
} from "../../../../lib/redux/features/roles-permissionsSlice";

const SearchableDepartmentDropdown = ({ error }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Get values from Redux store
  const { department, departmentsList, departmentsLoading, departmentsError } =
    useSelector((state) => state.roleprmission);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch departments on search term change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== "") {
        dispatch(fetchDepartments(searchTerm));
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  // Handle selecting a department
  const handleDepartmentSelect = (departmentName) => {
    dispatch(setdepartment(departmentName));
    setSearchTerm(departmentName);
    setIsOpen(false);
  };

  // Handle adding a new department
  const handleAddNewDepartment = async (departmentName) => {
    try {
      await dispatch(addNewDepartment(departmentName)).unwrap();
      setIsOpen(false);
      setSearchTerm(departmentName);
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm || department}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          //   onFocus={() => setIsOpen(true)}
          placeholder="Search department..."
          className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] pr-10"
        />
        <MdSearch
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {departmentsError && (
        <p className="text-red-500 text-xs mt-1">{departmentsError}</p>
      )}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {departmentsLoading ? (
            <div className="p-2 text-center text-gray-500 text-sm">
              Loading...
            </div>
          ) : (
            <>
              {departmentsList.length > 0
                ? departmentsList.map((dept, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center"
                      onClick={() => handleDepartmentSelect(dept.name)}
                    >
                      {dept.name}
                    </div>
                  ))
                : searchTerm && (
                    <div
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center gap-2 text-[#007eef]"
                      onClick={() => handleAddNewDepartment(searchTerm)}
                    >
                      <MdAdd size={18} className="text-current" />
                      <span>Add "{searchTerm}" as new department</span>
                    </div>
                  )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDepartmentDropdown;
