import { useEffect } from 'react';

function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;
