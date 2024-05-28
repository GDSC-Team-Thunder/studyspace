import React, { useState } from 'react';

interface ModalProps {
    show: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}
  
const Modal: React.FC<ModalProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-offWhite rounded-3xl py-10 px-12 shadow-lg z-20">
            <div>{children}</div>
        </div>

        <div className="fixed inset-0 bg-black opacity-50 z-0"></div>
    </div>
  );
};

export default Modal;