"use client";
import React, { useState } from "react";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { Oval } from "react-loader-spinner";
import axiosInstance from "../../../../utils/axiosMiddleware";
import {  toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const DeleteStakeholder = ({ setRefresh,refresh,isModalOpen,setDeleteDisabled, setIsModalOpen,deleteData,selectedRows,bulkDelete}) => {

    const [loopen, setLoOpen] = useState(false);

    const LoaderOpen = () => {
      setLoOpen(true);
    };
  
    const LoaderClose = () => {
      setLoOpen(false);
    };

  const handleDelete= async(id,name)=>{
    LoaderOpen()
    const url = `${process.env.BACKEND_API_URL}/supplier_assessment/stakeholder/${id}/`;
    try {
      const response = await axiosInstance.delete(url);
      if(response.status===204){
        LoaderClose()
        toast.success(
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <RiDeleteBin6Line style={{ marginRight: '6px', color: '#EB9042',fontSize:'25px' }} />
            <div>
            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '16px' }}> {/* Main heading */}
            Stakeholder Deleted
         </strong>
         <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}> {/* Paragraph aligned below heading */}
         {`Stakeholder ${name?name:''}  has been successfully deleted.`}
         </p>
          </div>
          </div>, {
            position: "top-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light", 
            style: {
              borderRadius: '8px', 
              border: '1px solid #E5E5E5', 
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              width:'371px',
            },
            icon: false, 
        });

        setRefresh((prevRefresh) => !prevRefresh);
        setDeleteDisabled(true)
        setIsModalOpen(false);
        
      }
      else{
        LoaderClose()
        toast.error("Oops, something went wrong", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      
    }
    catch (error) {
        LoaderClose()
      toast.error("Oops, something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const handleBulkDelete = async (ids) => {
    
    if (!Array.isArray(ids) || ids.length === 0) {
      toast.error("No valid IDs provided for deletion", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
  
    // Convert BigInt IDs to strings if needed
    const processedIds = ids.map((id) => (typeof id === "bigint" ? id.toString() : id));
  
    LoaderOpen();
  
    const url = `${process.env.BACKEND_API_URL}/supplier_assessment/stakeholder/delete-many/`;
  
    try {
        // const token = getAuthToken();
  
      const response = await axiosInstance.delete(url, {
        data: { ids:processedIds },
      },
      );
  
      if (response.status === 200) {
        LoaderClose();
        toast.success(
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <RiDeleteBin6Line
              style={{ marginRight: "6px", color: "#EB9042", fontSize: "25px" }}
            />
            <div>
              <strong style={{ display: "block", marginBottom: "4px", fontSize: "16px" }}>
                Stakeholders Deleted
              </strong>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>
                Multiple stakeholders have been successfully deleted.
              </p>
            </div>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
            style: {
              borderRadius: "8px",
              border: "1px solid #E5E5E5",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "371px",
            },
            icon: false,
          }
        );
        
        setRefresh((prevRefresh) => !prevRefresh);
        setDeleteDisabled(true)
        setIsModalOpen(false);
      } else {
        LoaderClose();
        toast.error("Oops, something went wrong while deleting stakeholders", {
          position: "top-right",
          autoClose: 1000,
          theme: "colored",
        });
      }
    } catch (error) {
      LoaderClose();
      console.error("Bulk delete failed:", error);
      toast.error("Oops, something went wrong while deleting stakeholders", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  
  
  
   
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay z-50">
        <div className="modal-center">
          <div className="modal-content-custom">
            <div className="flex justify-between items-center drop-shadow-lg pt-3 w-full px-3">
              <div className="flex">
                  <MdOutlineDeleteOutline className="w-7 h-7 mr-2 text-red-400" />
                  <h2 className="self-stretch text-black text-[18px] font-bold">
                    <span>Delete Stakeholder?</span>
                  </h2>
                </div>

              </div>

              <div className="p-4 pb-0">
                <p className="text-[14px] text-[#667085] font-[400]">
                  <span className="text-[14px] text-[#C62828] mr-1">Warning!</span>
                  {`This process will delete the stakeholder ${selectedRows.name?selectedRows.name:selectedRows}`}
                </p>
               
              </div>

              <div className="p-4">
                  <p className="text-[14px] text-[#667085] font-[400]">
                 { `Are you sure you want to delete ${selectedRows > 1 ? 'these' : 'this'} entr${selectedRows > 1 ? 'ies' : 'y'}?`}
                  </p>
                  <div className="flex justify-between mt-5">
                  <button
                  className="w-full h-full mr-2 py-2 px-3 border border-gray-200 text-gray-500 rounded-[8px] shadow cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="w-full h-full mr-2 py-2 px-3 bg-[#EF5350] text-white rounded-[8px] shadow cursor-pointer"
                  onClick={()=>{
                    if(bulkDelete?.length>0){
                        handleBulkDelete(bulkDelete)
                    }
                    else{
                        handleDelete(deleteData.id,deleteData.name)
                    }
                    }}
                >
                  Yes, Delete
                </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
       {loopen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <Oval
                  height={50}
                  width={50}
                  color="#00BFFF"
                  secondaryColor="#f3f3f3"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            )}
    </>
  );
};

export default DeleteStakeholder;
