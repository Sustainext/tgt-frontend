import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '415px',
          height: '178px',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className='self-stretch justify-start items-start gap-5 inline-flex'>
          <div className='grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex'>
            <div className="self-stretch text-gray-900 text-[15px] font-bold font-['Manrope'] leading-tight">
              Delete row
            </div>
            <div className="self-stretch text-neutral-500 text-[13px] font-normal font-['Manrope'] leading-none">
              {message} This action cannot be undone.
            </div>
          </div>
        </div>
        <div className='self-stretch justify-start items-start gap-3 inline-flex mt-6'>
          <div className='w-[178px] h-[38px] px-[22px] py-2 rounded border border-red-600 flex-col justify-center items-center inline-flex'>
            <div className='justify-center items-center gap-2 inline-flex'>
              <button
                className="text-red-500 text-xs font-bold font-['Manrope'] leading-[15px]"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className='w-[178px] px-[22px] py-2 bg-red-500 rounded shadow flex-col justify-center items-center inline-flex'>
            <div className='justify-center items-center gap-2 inline-flex'>
              <button
                className="h-[22px] text-white text-xs font-bold font-['Manrope'] leading-[15px]"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
