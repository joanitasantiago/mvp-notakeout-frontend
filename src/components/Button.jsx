import React from 'react';
import './Button.css';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  size = 'medium',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
