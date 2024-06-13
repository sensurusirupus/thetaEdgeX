import React from "react";
import { createPortal } from "react-dom";

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-[#131722] p-6 rounded-lg text-white w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-2 mr-2 text-white"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CustomModal;
