// src/components/ConfirmTransaction.js
import React from "react";

function ConfirmTransaction({ transaction, onConfirm, onCancel }) {
  return (
    <div>
      <h2>Confirm Transaction</h2>
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
      <button
        onClick={onConfirm}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Confirm
      </button>
      <button
        onClick={onCancel}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cancel
      </button>
    </div>
  );
}

export default ConfirmTransaction;
