import React from 'react';

export const ChatContainer = ({ usuario }) => {
  return (
    <section className="flex flex-col h-screen bg-white border-l border-gray-200 flex-1">

      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src={usuario.avatarUrl} 
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

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-start">
          <img
            src={usuario.photo}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="ml-3 bg-gray-100 p-3 rounded-lg max-w-[70%]">
            <p className="text-sm">Hola</p>
          </div>
        </div>

        <div className="flex items-start justify-end">
          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[70%]">
            <p className="text-sm">hola</p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};