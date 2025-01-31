import React, { useState } from 'react';

export const ProfileEditForm = ({ usuario, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="text-center mb-4">
          <img src={usuario.photo} alt="profile" className="rounded-full border-2 border-gray-300 w-24 h-24" />
          <div className="mt-2 flex justify-center space-x-2">
            <button className="mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Change photo</button>
            <button className="mx-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Remove photo</button>
          </div>
        </div>
        <div className="w-full">
          <form action="" className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="name" className="font-semibold text-white">Name:</label>
                <input type="text" placeholder="Name" value={usuario.name} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="last_name" className="font-semibold text-white">Last name:</label>
                <input type="text" placeholder="Last name" value={usuario.lastname} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="email" className="font-semibold text-white">Email:</label>
                <input type="email" placeholder="Email" value={usuario.email} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="phone" className="font-semibold text-white">Username:</label>
                <input type="tel" placeholder="Phone" value={usuario.username} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-semibold text-white">Bio:</label>
              <textarea name="bio" placeholder="Bio" className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
              <button type="button" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-green-700" onClick={onClose}>Discard</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};