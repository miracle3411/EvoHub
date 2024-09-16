import React from 'react';
import ReactDOM from 'react-dom';
import './PopUp.css'
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
