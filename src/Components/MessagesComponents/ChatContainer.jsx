// src/components/ChatContainer.js
import React from 'react';
import ChatComponent from '../Chat/ChatComponent';

export const ChatContainer = ({ usuario }) => {
  return (
    <section className="flex flex-col h-screen bg-white border-l border-gray-200 flex-1">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={usuario.photo}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3 font-semibold text-sm">{usuario.name}</span>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <ChatComponent currentUser={usuario} recipientId={2} /> {/* Ajusta recipientId según sea necesario */}

    </section>
  );
};

export default ChatContainer;
