import React, { useEffect, useState, useRef } from 'react';
import { CiCircleCheck } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance, { put } from '../../../../utils/axiosMiddleware';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import { GlobalState } from '../../../../../Context/page';
const SDGCards = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const isMounted = useRef(true);
  const [loopen, setLoOpen] = useState(false);
  const { open } = GlobalState();
  const LoaderOpen = () => {
    setLoOpen(true);
  };
  const LoaderClose = () => {
    setLoOpen(false);
  };

  const fetchPreference = async () => {
    LoaderOpen();
    try {
      const response = await axiosInstance.get(
        `/select_preference/?preference=sdg`
      );
      LoaderClose();
      setData(response.data.data);
      const selectedIds = response.data.selected_ids || [];
      setSelectedItems(selectedIds);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Oops, something went wrong";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchPreference();
      isMounted.current = false;
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  const toggleSelect = (id) => {
    const newSelectedItems = selectedItems.includes(id)
      ? selectedItems.filter(item => item !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelectedItems);

    // Directly logging the selected items here
    console.log("Selected items:", newSelectedItems);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();
    try {
      const sandData = {
        preference: "sdg",
        preference_ids: selectedItems,
      };
      const response = await put(
        `/update_organization_preference/`,
        sandData
      );
      if (response.status === 200) {
        toast.success("SDG added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        LoaderClose();
        fetchPreference();
        router.push('/dashboard');
      } else {
        toast.error("Error", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        LoaderClose();
      }
    } catch (error) {
      const errorMessage = "Oops, something went wrong";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      LoaderClose();
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: "12px" }} />
      <div className='px-6 mt-6'>
        <h2 className='text-2xl font-bold mb-8 text-gray-700'>Select UN SDGs</h2>
        <div className="grid grid-cols-6 gap-6 m-6">
          {data && data.map((item) => (
            <div key={item.id} onClick={() => toggleSelect(item.id)}>
              <div className={`relative`}>
                <img
                  src={`${item.Image}`}
                  alt='cover'
                  className="h-36 w-36 transition-all"
                />
                <div
                  className={`absolute top-0 left-0 w-36 h-36 text-[#2AE4FF] opacity-0 transition duration-500 hover:opacity-100 cursor-pointer p-4
                ${selectedItems.includes(item.id) ? '' : ''}
                ${item.id === 1 ? 'bg-[#e5243b]' : ''}
                ${item.id === 2 ? 'bg-[#dda63a]' : ''}
                ${item.id === 3 ? 'bg-[#4C9F38]' : ''}
                ${item.id === 4 ? 'bg-[#C5192D]' : ''}
                ${item.id === 5 ? 'bg-[#FF3A21]' : ''}
                ${item.id === 6 ? 'bg-[#26BDE2]' : ''}
                ${item.id === 7 ? 'bg-[#FCC30B]' : ''}
                ${item.id === 8 ? 'bg-[#A21942]' : ''}
                ${item.id === 9 ? 'bg-[#FD6925]' : ''}
                ${item.id === 10 ? 'bg-[#DD1367]' : ''}
                ${item.id === 11 ? 'bg-[#FD9D24]' : ''}
                ${item.id === 12 ? 'bg-[#BF8B2E]' : ''}
                ${item.id === 13 ? 'bg-[#3F7E44]' : ''}
                ${item.id === 14 ? 'bg-[#0A97D9]' : ''}
                ${item.id === 15 ? 'bg-[#56C02B]' : ''}
                ${item.id === 16 ? 'bg-[#00689D]' : ''}
                ${item.id === 17 ? 'bg-[#19486A]' : ''}
                `}>
                  <p className='text-left font-bold text-gray-300 text-xl'>
                    Goal {item.id}
                  </p>
                  <p className='text-left font-normal text-[11px] text-white border-b-2 pb-4'>
                    {item.name}
                  </p>
                  <div className='pt-2 text-white'>
                    <p className='font-bold text-sm'>Target : {item.id}</p>
                  </div>
            
                </div>
                <div
                  className={`absolute  ${open ? 'right-24' : 'right-[7.7rem]'} rounded-full border border-gray-500 ${selectedItems.includes(item.id) ? 'bg-white border-[#53ff1a]' : 'bg-white'} transition-all w-5 h-5 -mt-5 mr-1`}
                >
                  <CiCircleCheck
                    style={{
                      color: selectedItems.includes(item.id) ? '#00cc44' : '#999999',
                      marginTop: "-3px",
                      marginLeft: "-2px",
                      fontSize: "24px"
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {data && data.length > 0 ? (
        <button className="px-4 py-2 font-bold text-white w-[10%] text-center rounded-md mr-6 bg-blue-500 bg-opacity-100 shadow-md hover:shadow-lg active:shadow-none float-right" onClick={submitForm}>Save</button>
      ) : (
        <button className="px-4 py-2 text-gray-400 w-[10%] text-center rounded-md mr-6 bg-gray-300 bg-opacity-100 shadow-md hover:shadow-lg active:shadow-none float-right" disabled>Save</button>
      )}

      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Oval
            height={80}
            width={80}
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

export default SDGCards;
