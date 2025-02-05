import React from 'react';
import NotificationBar from "./ANotification"

export const Notifications = ({ onClose, usuario  }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <NotificationBar></NotificationBar> 
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};