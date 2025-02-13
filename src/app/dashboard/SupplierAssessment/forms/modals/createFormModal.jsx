'use client';
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const CreateFormModal = ({ isModalOpen, setIsModalOpen }) => {
 
    const router=useRouter();
    const [formName,setFormName]=useState('')

 

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#00000080] z-50 mt-12">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[30%] max-w-3xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
            <h2 className="text-black text-[18px] font-bold">
            Create a new form
                </h2>

              <button
                className="absolute top-6 right-4 text-gray-500 hover:text-gray-700"
                onClick={()=>{setIsModalOpen(false)}}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-[#667085] text-[14px] mb-4">Enter forms name and proceed to add questions under it.</p>
            <form>
                  <div className="mb-4">
                    <label
                      htmlFor="formName"
                      className="block text-[14px] font-medium text-[#344054]"
                    >
                      Form Name
                    </label>
                    <input
                      type="text"
                      id="formName"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Enter name"
                      className="mt-1 block px-3 py-3 w-full rounded-md border border-gray-300 text-sm"
                      required
                    />
                  </div>

            

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={()=>{ 
                        if(formName){
                            router.push('/dashboard/SupplierAssessment/formCreation');
                        }

                      }}
                    //   onClick={handleNext}
                      className="bg-blue-500 text-white px-10 py-2 rounded-md hover:bg-blue-600"
                    >
                      Proceed
                    </button>
                  </div>
                </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFormModal;
