import React from 'react';

export const NotificationItem = ({ notification, markAsSeen }) => {
  const { id, username, comment, date, check } = notification;

  return (
    <div className="p-4 border-b border-gray-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-300">{username} - {new Date(date).toLocaleString()}</p>
          <p className="text-white">{comment}</p>
        </div>
        {!check && (
          <button
            onClick={() => markAsSeen(id)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Mark as seen
          </button>
        )}
      </div>
    </div>
  );
};