import Modal from "react-modal";
import React from "react";

Modal.setAppElement("#root");

function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative w-full sm:max-w-md bg-white p-5 rounded-lg shadow-md mx-auto my-8"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold text-center">{message}</h2>
      <div className="mt-4 flex justify-between">
        <button
          className="btn text-white bg-red-500 hover:bg-red-700"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className="btn text-white bg-gray-500 hover:bg-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
