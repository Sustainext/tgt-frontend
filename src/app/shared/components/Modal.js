// import { useEffect, useState, useRef } from 'react';
// import { createPortal } from 'react-dom';

// const Modal = ({ children, onClose }) => {
//   const [mounted, setMounted] = useState(false);
//   const modalRef = useRef(null); 

//   const handleClickOutside = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) {
//       onClose(); 
//     }
//   };

//   useEffect(() => {
//     setMounted(true);

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       setMounted(false);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [onClose]);

//   return mounted ? createPortal(
//     <div className="modal-backdrop" onClick={handleClickOutside}>
//       <div className="modal-content" ref={modalRef} onClick={e => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>,
//     document.body
//   ) : null;
// };

// export default Modal;

import { useEffect, useRef } from 'react';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-10 z-40 flex justify-center items-center" onClick={handleClickOutside}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full m-4" ref={modalRef} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

