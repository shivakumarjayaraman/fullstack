import { useState } from 'react';

function useToast() {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
  };
  
  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };
  
  return { toasts, showToast, removeToast };
}

export default useToast;
