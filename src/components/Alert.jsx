import React, { useEffect } from 'react';
import './Alert.css';

function Alert({ type = 'info', message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`custom-alert custom-alert-${type}`} role="alert">
      <span>{message}</span>
      <button className="custom-alert-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default Alert;
