import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MdSearch,
  MdAdd,
  MdClose,
  MdCheck,
  MdExpandMore,
} from "react-icons/md";
import {
  setdepartment,
  addNewDepartment,
} from "../../../../lib/redux/features/roles-permissionsSlice";

const SearchableDepartmentDropdown = ({ error }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingAdd, setPendingAdd] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const dropdownRef = useRef(null);

  const { department, departmentsList, departmentsLoading } = useSelector(
    (state) => state.roleprmission
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setPendingAdd(null);
        setIsFocused(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = departmentsList.filter((dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);

      const exactMatch = departmentsList.some(
        (dept) => dept.name.toLowerCase() === searchTerm.toLowerCase()
      );

      if (!exactMatch) {
        setPendingAdd(searchTerm);
      } else {
        setPendingAdd(null);
      }
    } else {
      setFilteredDepartments(departmentsList);
      setPendingAdd(null);
    }
  }, [searchTerm, departmentsList]);

  const handleDepartmentSelect = (departmentName) => {
    dispatch(setdepartment(departmentName));
    setSearchTerm("");
    setIsOpen(false);
    setIsFocused(false);
    setPendingAdd(null);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
  };

  const handleAddDepartment = async (e) => {
    e?.preventDefault();
    if (pendingAdd) {
      try {
        setIsAddingDepartment(true);
        const newDepartment = await dispatch(
          addNewDepartment(pendingAdd)
        ).unwrap();
        dispatch(setdepartment(newDepartment.name));
        setSearchTerm("");
        setIsOpen(false);
        setIsFocused(false);
        setPendingAdd(null);
      } catch (error) {
        console.error("Error adding department:", error);
      } finally {
        setIsAddingDepartment(false);
      }
    }
  };

  const handleCancelAdd = (e) => {
    e?.preventDefault();
    setPendingAdd(null);
    setSearchTerm("");
    setIsOpen(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-[#007eef]" />
    </div>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={isFocused ? searchTerm : department || ""}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          placeholder={isFocused ? "" : ""}
          className="form-input mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-[12px] pr-10"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {departmentsLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* <MdSearch className="text-gray-400" size={18} /> */}
              <MdExpandMore className="text-gray-400" size={18} />
            </>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {departmentsLoading ? (
            <div className="p-4 text-center text-gray-500 text-sm flex justify-center items-center gap-2">
              <LoadingSpinner />
              <span>Loading departments...</span>
            </div>
          ) : (
            <>
              {filteredDepartments.length > 0
                ? filteredDepartments.map((dept, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm flex items-center justify-between"
                      onClick={() => handleDepartmentSelect(dept.name)}
                    >
                      <span>{dept.name}</span>
                      {dept.name.toLowerCase() ===
                        department?.toLowerCase() && (
                        <MdCheck className="text-gray-400" size={18} />
                      )}
                    </div>
                  ))
                : !departmentsLoading &&
                  !pendingAdd && (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      No departments found
                    </div>
                  )}

              {pendingAdd && (
                <div className="px-4 py-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-[#007eef]">
                      <MdAdd size={18} />
                      <span>Add "{pendingAdd}"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAddingDepartment ? (
                        <LoadingSpinner />
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={handleAddDepartment}
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={isAddingDepartment}
                          >
                            <MdCheck className="text-green-600" size={18} />
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelAdd}
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={isAddingDepartment}
                          >
                            <MdClose className="text-red-600" size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
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
