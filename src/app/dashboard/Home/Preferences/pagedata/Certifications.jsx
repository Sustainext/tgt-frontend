import React, { useEffect, useState, useRef } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance, { put } from '../../../../utils/axiosMiddleware';
import { useRouter } from 'next/navigation';
import { Oval } from 'react-loader-spinner';
import { FaCheck } from 'react-icons/fa';
const Certifications = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const isMounted = useRef(true);
  const [loopen, setLoOpen] = useState(false);

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
        `/select_preference/?preference=certification`
      );
      LoaderClose();
      setData(response.data.data);
      const selectedIds = response.data.selected_ids || [];
      setSelectedItems(selectedIds);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Oops, something went wrong';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
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
      ? selectedItems.filter((item) => item !== id)
      : [...selectedItems, id];
    setSelectedItems(newSelectedItems);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();
    try {
      const sandData = {
        preference: 'certification',
        preference_ids: selectedItems,
      };
      const response = await put(`/update_organization_preference/`, sandData);
      if (response.status === 200) {
        toast.success('Certifications added successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        LoaderClose();
        fetchPreference();
        router.push('/dashboard');
      } else {
        toast.error('Error', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        LoaderClose();
      }
    } catch (error) {
      const errorMessage = 'Oops, something went wrong';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      LoaderClose();
    }
  };

  return (
    <>
      <ToastContainer style={{ fontSize: '12px' }} />
      <div className='px-6 mt-6'>
        <h2 className='text-2xl font-bold mb-8 text-gray-700'>
          Select Certifications
        </h2>
        <div className='grid grid-cols-2 xl:grid-cols-6  lg:grid-cols-6  md:grid-cols-6  2k:grid-cols-6  4k:grid-cols-6 gap-6 m-6'>
          {data &&
            data.map((item) => (
              <div key={item.id} onClick={() => toggleSelect(item.id)}>
                <div className='relative shadow-sm h-40 border border-gray-200'>
                  <div className='flex justify-center h-20 mb-2'>
                    <img
                      src={`${item.Image}`}
                      alt='cover'
                      className='transition-all w-[70%] aspect-[3/2] object-contain mt-2'
                    />
                  </div>
                  <div className='h-10'>
                    <p className='text-sm text-center'>{item.name}</p>
                  </div>
                  <div
                    className={`absolute right-3 rounded-full border ${
                      selectedItems.includes(item.id)
                        ? 'bg-green-500 border-green-500 '
                        : 'bg-white border-zinc-500'
                    } transition-all w-5 h-5 flex items-center justify-center`}
                  >
                    {selectedItems.includes(item.id) ? (
                      <FaCheck
                        style={{
                          color: '#fff',
                          fontSize: '12px',
                        }}
                      />
                    ) : (
                      <FaCheck
                        style={{
                          color: '#999999',
                          fontSize: '12px',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {data && data.length > 0 ? (
        <button
          className='xl:px-4 py-2 font-bold text-white xl:w-[10%] lg:w-[10%] md:w-[10%] 2xl:w-[10%] 2k:w-[10%] 4k:w-[10%] w-[20%] mb-2 text-center rounded-md mr-6 bg-blue-500 bg-opacity-100 shadow-md hover:shadow-lg active:shadow-none float-right'
          onClick={submitForm}
        >
          Save
        </button>
      ) : (
        <button
          className='xl:px-4 py-2  text-gray-400 xl:w-[10%] lg:w-[10%] md:w-[10%] 2xl:w-[10%] 2k:w-[10%] 4k:w-[10%]  w-[20%] mb-2  text-center rounded-md mr-6 bg-gray-300 bg-opacity-100 shadow-md hover:shadow-lg active:shadow-none float-right'
          disabled
        >
          Save
        </button>
      )}

      {loopen && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <Oval
            height={80}
            width={80}
            color='#00BFFF'
            secondaryColor='#f3f3f3'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
    </>
  );
};

export default Certifications;
