import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, selector = 'body' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && typeof document !== 'undefined'
    ? ReactDOM.createPortal(children, document.querySelector(selector))
    : null;
};

export default Portal;