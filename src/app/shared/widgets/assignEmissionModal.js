import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignEmissionTasks } from '@/lib/redux/features/emissionSlice';
import axiosInstance from "@/app/utils/axiosMiddleware";

const AssignEmissionModal = ({ isOpen, onClose, taskData }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();
  const assignTaskStatus = useSelector(state => state.emissions.assignTaskStatus);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/sustainapp/user_client/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleAssign = () => {
    if (!selectedUser || !dueDate) {
      alert('Please select a user and due date');
      return;
    }

    dispatch(assignEmissionTasks({
      tasks: [taskData],
      commonData: {
        location: taskData.location,
        year: taskData.year,
        month: taskData.month,
        scope: taskData.scope,
        category: taskData.category,
        subcategory: taskData.subcategory,
        activity: taskData.activity,
        deadline: dueDate,
        assignedTo: parseInt(selectedUser),
        countryCode: taskData.countryCode
      }
    }));
  };

  useEffect(() => {
    if (assignTaskStatus === 'succeeded') {
      onClose();
    }
  }, [assignTaskStatus, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Assign user</h2>
        <p className="text-sm text-gray-600 mb-4">Assign a user and select a due date.</p>
        
        <div className='flex justify-between items-center'>
        <div className="mb-4">
          <p className="text-sm font-semibold">Location</p>
          <p className="text-sm text-gray-600">{taskData.location}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-semibold">Year</p>
          <p className="text-sm text-gray-600">{taskData.year}</p>
        </div>
        </div>
        
        <div className='flex justify-between items-center'>
        <div className="mb-4">
          <p className="text-sm font-semibold">Month</p>
          <p className="text-sm text-gray-600">{taskData.month}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-semibold">Scope</p>
          <p className="text-sm text-gray-600">{taskData.scope}</p>
        </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-semibold">Subcategory</p>
          <p className="text-sm text-gray-600">{taskData.subcategory}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-semibold">Activity</p>
          <p className="text-sm text-gray-600">{taskData.activity || 'N/A'}</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Assign User</label>
          <select 
            className="w-full p-2 border rounded"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Due date</label>
          <input 
            type="date" 
            className="w-full p-2 border rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        
        <div className="flex justify-end">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmissionModal;