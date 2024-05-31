'use client'
import React, { useState, useEffect, useRef } from 'react';
import { FiPlus, FiCheckCircle, FiTrash2, FiCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import axios from 'axios';
import { useAuth } from '../../../Context/auth';
import { del, patch, post } from '../../utils/axiosMiddleware';

const MyGoals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMounted = useRef(true);
  const [goals, setGoals] = useState({});
  const [loopen, setLoOpen] = useState(false);
  const [addgoles, setaddgoles] = useState({
    title: '',
    deadline: '',
  });

  const { title, deadline } = addgoles;
  const { userDetails, token } = useAuth();
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log('user details and token', userDetails, token);
    if (userDetails) {
      setUserId(userDetails?.user_detail[0]?.id);
    }
    if (token) {
      setAccessToken(token?.replace(/"/g, ""));
    }
  }, [userDetails, token]);

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();
    const year = today.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  const LoaderOpen = () => {
    setLoOpen(true);
  };

  const LoaderClose = () => {
    setLoOpen(false);
  };

  const handleCompleted = async (id) => {
    LoaderOpen();
    const sandData = {
      completed: true,
    };
    await patch(`/mygoal/${id}/`, sandData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Goal has been completed successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchMygoleDetails();
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
        }
      }).finally(() => LoaderClose());
  };

  const handleDelete = async (id) => {
    LoaderOpen();
    await del(`/mygoal/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Goal has been deleted successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          fetchMygoleDetails();
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
        }
      }).finally(() => LoaderClose());
  };

  const datahandleChange = (e) => {
    setaddgoles({ ...addgoles, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = {
      ...addgoles,
      assigned_to: userId,
      completed: false,
    };
    await post(`/mygoal/`, sandData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Goal has been added successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          handleCloseModal();
          fetchMygoleDetails();
          setaddgoles({ title: '', deadline: '' });
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
        }
      }).finally(() => LoaderClose());
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [activeTab, setActiveTab] = useState('upcoming');

  const fetchMygoleDetails = async () => {
    LoaderOpen();
    const response = await axios.get(
      `${process.env.BACKEND_API_URL}/mygoal/?assigned_to=${userId}`, options
    );
    setGoals(response.data);
    LoaderClose();
  };

  useEffect(() => {
    if (userId && accessToken) {
      fetchMygoleDetails();
    }
  }, [userId, accessToken]);

  return (
    <>
      <div className='rounded-lg shadow border border-gray-200 p-4 h-[320px] '>
        <div className='flex justify-between mb-4'>
          <div className='text-neutral-800 text-[15px] font-bold leading-tight'>
            My Goals
          </div>

          <div
            className='text-sky-600 text-[10px] cursor-pointer font-normal leading-[13px] flex items-center me-2 space-x-2'
            onClick={handleOpenModal}
          >
            <FiPlus style={{ fontSize: '18px' }} />
            <span>Add goal</span>
          </div>
        </div>
        <div>
          <div className={`flex my-6 border-b text-sm text-start`}>
            <button
              className={`pr-2 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-[#1aaef4] text-[#1aaef4]'
                  : 'border-transparent text-neutral-500'
              }`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === 'overdue'
                  ? 'border-b-2 border-[#1aaef4] text-[#1aaef4]'
                  : 'border-transparent text-neutral-500'
              }`}
              onClick={() => setActiveTab('overdue')}
            >
              Overdue
            </button>
            <button
              className={`px-4 py-1 rounded-b-none text-xs font-bold leading-[15px] ${
                activeTab === 'completed'
                  ? 'border-b-2 border-[#1aaef4] text-[#1aaef4]'
                  : 'border-transparent text-neutral-500'
              }`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </button>
          </div>

          <div className='p-4 h-[188px]'>
            {activeTab === 'upcoming' && (
              <div>
                {goals.upcoming == '' ? (
                  <div className='justify-center items-center '>
                    <div className='flex justify-center items-center pb-5'>
                      <FiCheckCircle style={{ color: '#ACACAC', fontSize: '36px' }} />
                    </div>
                    <div>
                      <p className='text-[14px] text-[#101828] font-bold text-center'>
                        Start by creating a goal
                      </p>
                    </div>
                    <div className='mb-2'>
                      <p className='text-[12px] text-[#667085] text-center'>
                        All task created or assigned to you will be here
                      </p>
                    </div>
                    <div className='flex justify-center items-center'>
                      <button
                        className='bg-[#007EEF] text-white w-[150px] p-1 rounded-md shadow-md'
                        onClick={handleOpenModal}
                      >
                        Add a goal
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className='space-y-3 mb-6 mt-2 '>
                      {goals.upcoming &&
                        goals.upcoming.map((ugoals) => (
                          <div className='flex justify-between' key={ugoals.id}>
                            <div className='flex cursor-pointer'>
                              <div>
                                <FiCircle
                                  style={{ fontSize: '21px', mt: -1.3 }}
                                  onClick={() => handleCompleted(ugoals.id)}
                                />
                              </div>
                              <div className='w-auto text-neutral-800 text-[13px] font-normal leading-none ml-3 '>
                                {ugoals.title}
                              </div>
                            </div>
                            <div className='flex'>
                              <div className='w-[68px] text-neutral-500 text-xs font-normal leading-[15px]'>
                                <Moment format='DD/MM/YYYY'>{ugoals.deadline}</Moment>
                              </div>
                              <div className='w-[18px] cursor-pointer '>
                                <FiTrash2
                                  style={{ color: '#0000008F', fontSize: '18px', mt: -1 }}
                                  onClick={() => handleDelete(ugoals.id)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'overdue' && (
              <div>
                {goals.overdue == '' ? (
                  <div className='h-screen justify-center items-center '>
                    <h4 className='text-center'>No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className='space-y-3 mb-6 nt-2'>
                      {goals.overdue &&
                        goals.overdue.map((ugoals) => (
                          <>
                            {ugoals.completed == false ? (
                              <div className='flex justify-between' key={ugoals.id}>
                                <div className='flex cursor-pointer'>
                                  <div>
                                    <FiCircle
                                      style={{
                                        fontSize: '21px',
                                        mt: -1.1,
                                        color: '#cc0000',
                                        cursor: 'pointer',
                                      }}
                                      onClick={() => handleCompleted(ugoals.id)}
                                    />
                                  </div>
                                  <div className='w-auto text-red-600 text-[13px] font-normal leading-none ml-3 '>
                                    {ugoals.title}
                                  </div>
                                </div>
                                <div className='flex'>
                                  <div className='w-[68px] text-red-600 text-xs font-normal leading-[15px]'>
                                    <Moment format='DD/MM/YYYY'>{ugoals.deadline}</Moment>
                                  </div>
                                  <div className='w-[18px] cursor-pointer '>
                                    <FiTrash2
                                      style={{ color: '#cc0000', fontSize: '18px', mt: -1 }}
                                      onClick={() => handleDelete(ugoals.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'completed' && (
              <div>
                {goals.completed == '' ? (
                  <div className='h-screen justify-center items-center '>
                    <h4 className='text-center'>No data found</h4>
                  </div>
                ) : (
                  <div>
                    <div className='space-y-3 mb-6 mt-2'>
                      {goals.completed &&
                        goals.completed.map((ugoals) => (
                          <div className='flex justify-between' key={ugoals.id}>
                            <div className='flex'>
                              <div>
                                <FiCheckCircle
                                  style={{ fontSize: '21px', mt: -1.3, color: '#3DCA7C' }}
                                />
                              </div>
                              <div className='w-auto text-neutral-800 text-[13px] font-normal leading-none ml-3 '>
                                {ugoals.title}
                              </div>
                            </div>
                            <div className='flex'>
                              <div className='w-[68px] text-neutral-500 text-xs font-normal leading-[15px]'>
                                <Moment format='DD/MM/YYYY'>{ugoals.deadline}</Moment>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='px-[5px] py-1 rounded flex-col justify-center items-center inline-flex'>
          <div className='justify-center items-center gap-2 inline-flex'>
            <div className='h-[18px] flex-col justify-center items-center inline-flex'>
              <div className='w-[18px] h-[18px] relative flex-col justify-start items-start flex' />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className='modal-overlay z-50'>
          <div className='modal-center'>
            <div className='modal-content'>
              <div className='flex justify-between items-center drop-shadow-lg border-b-2 py-6 w-full'>
                <h2 className='self-stretch text-black text-opacity-90 text-[22px] font-normal leading-relaxed flex space-x-8 items-center ms-6'>
                  <span>Add Goal</span>
                </h2>
                <button
                  className='absolute top-2 right-2 mt-4 text-gray-500 hover:text-gray-700 focus:outline-none'
                  onClick={handleCloseModal}
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
              <div className='my-6 mx-8 '>
                <div className='mb-2 py-4 px-3'>
                  <div>
                    <form className='w-full text-left' onSubmit={submitForm}>
                      <div className='mr-2 mb-4 w-[101%]'>
                        <label
                          htmlFor='cname'
                          className='block text-neutral-800 text-[13px] font-normal'
                        >
                          Goal Title
                        </label>

                        <div className='mt-2 mr-2'>
                          <input
                            id='title'
                            title='title'
                            type='text'
                            name='title'
                            autoComplete='off'
                            required
                            placeholder='Enter Goal Title'
                            onChange={datahandleChange}
                            value={title}
                            className='block  w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>
                      <div className='flex '>
                        <div className='col-span-2 mb-4 flex-1'>
                          <div>
                            <label
                              htmlFor='dateField'
                              className='block text-neutral-800 text-[13px] font-normal'
                            >
                              Deadline
                            </label>
                            <div className='mt-2 '>
                              <input
                                id='deadline'
                                title='deadline' // Use name instead of title
                                type='date'
                                name='deadline'
                                autoComplete='off'
                                onChange={datahandleChange}
                                value={deadline}
                                min={getTodayDate()}
                                required
                                className='block w-full px-1 rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex justify-center mt-5'>
                        <input
                          type='submit'
                          value='Save'
                          className='w-[30%] h-[31px]  px-[22px] py-2 bg-blue-500 text-white rounded shadow flex-col justify-center items-center inline-flex cursor-pointer'
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loopen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center space-x-2 text-sm text-white">
            <svg
              className="w-6 h-6 animate-spin"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.75V7.25M12 12V14.75M12 19V21.25M4.75 12H7.25M16.75 12H19.25M7.29 7.29L8.7 8.7M15.29 15.29L16.7 16.7M7.29 16.7L8.7 15.29M15.29 8.7L16.7 7.29"
              />
            </svg>
            <span>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default MyGoals;
