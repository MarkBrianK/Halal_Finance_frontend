import React from "react";

export default function LoadingSpinner() {
  const loadingSpinnerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const spinnerStyle = {
    border: '4px solid #555',
    borderTop: '4px solid #999',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={loadingSpinnerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
