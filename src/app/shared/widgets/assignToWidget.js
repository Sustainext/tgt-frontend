import React, { useState } from "react";

// Static data definition
const staticData = {
  users: [
    { id: 1, name: "Alice Smith" },
    { id: 2, name: "Bob Johnson" },
    { id: 3, name: "Charlie Lee" },
  ],
  defaultUser: 2, // Default user ID
  defaultDate: "2024-06-01", // Default date
  locations: ["New York", "San Francisco", "Chicago"],
  years: [2022, 2023, 2024],
  months: ["January", "February", "March"],
  scopes: ["Local", "Regional", "National"],
  subCategories: ["Category A", "Category B", "Category C"],
  activities: ["Activity X", "Activity Y", "Activity Z"]
};

const AssignToWidget = () => {
  const [isModalOpen, setModalOpen] = useState(false);


  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex justify-center items-center mt-2">
        <button
          className="text-center py-1 text-sm w-[100px] bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={openModal}
        >
          Assign To
        </button>
      </div>
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="modal-content relative  bg-white rounded-md px-5 pt-5 overflow-auto  h-[580px] important-width">
              <div>
                <div className="mb-5">
                  <h5 className="text-left text-sm">Assign user</h5>
                  <p className="text-left text-sm text-gray-500">
                    Assign a user and select a due date.
                  </p>
                </div>
              </div>
              <div className="px-4 pt-4">
                <div className="flex justify-between">
                  <div className="mb-5">
                    <div className="w-[13rem]">
                      <h5 className="text-left text-sm">Location</h5>
                      <p className="text-left text-sm text-gray-500">
                      Location
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="w-[5rem]">
                      <h5 className="text-left text-sm">Year</h5>
                      <p className="text-left text-sm text-gray-500">
                        {" "}
                        2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mb-5">
                    <div className="w-[13rem]">
                      <h5 className="text-left text-sm">Month</h5>
                      <p className="text-left text-sm text-gray-500">
                       Jun
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="w-[5rem]">
                      <h5 className="text-left text-sm">Scope</h5>
                      <p className="text-left text-sm text-gray-500">
                        Scope
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <h5 className="text-left text-sm">Subcategory</h5>
                  <p className="text-left text-sm text-gray-500 w-full">
                  Subcategory
                  </p>

                </div>
                <div className="mb-5">
                  <h5 className="text-left text-sm">Activity</h5>
                  <p className="text-left text-sm text-gray-500 w-full">
                  Activity
                  </p>


                </div>
                <div className="mb-5">
                  <div className="mr-2">
                    <label
                      htmlFor="sdate"
                      className="block text-neutral-800 text-[13px] font-normal text-left"
                    >
                      Assign User
                    </label>
                    <div className="mt-2">
                      <select
                        className="block w-full rounded-md border-0 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="user"

                      >
                        <option>--- Select user ---</option>

                      </select>

                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="mr-2">
                    <label
                      htmlFor="sdate"
                      className="block text-neutral-800 text-[13px] font-normal text-left"
                    >
                      Due date
                    </label>
                    <div className="mt-2">
                      <input
                        id="edate"
                        name="enddate"
                        type="date"
                        autoComplete="edate"


                        placeholder="End date"
                        className="block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <button
                      className="bg-white border border-gray-300 text-black py-1 rounded-md shadow-sm w-full text-center text-md"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-[#007EEF] border border-[#007EEF] text-white py-1 rounded-md shadow-sm w-full text-center text-md"
                      // onClick={handleSubmit}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default AssignToWidget;
