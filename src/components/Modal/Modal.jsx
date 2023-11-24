import React from 'react';

const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <div
      style={{ display: isOpen ? 'flex' : 'none' }}
      className="absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-40
       justify-center items-center"
    >
      <div className="max-w-sm border w-full p-4 bg-slate-50 rounded-lg">
        <h1 className="text-3xl font-bold ">Modal</h1>
        <button
          className="bg-gray-200 rounded-sm py-2 px-4 text-md font-semibold"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
