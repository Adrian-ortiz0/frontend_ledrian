import React, { useState } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

export const ProfileEditForm = ({ usuario, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: usuario.name,
    lastname: usuario.lastname,
    email: usuario.email,
    username: usuario.username,
    photo: usuario.photo,
    bio: usuario.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userProfileDTO = {
      name: formData.name,
      lastname: formData.lastname,
      username: formData.username,
      photo: formData.photo,
      bio: formData.bio,
      publications: usuario.publications,
      followersIds: usuario.followersIds,
      followingIds: usuario.followingIds,
    };

    AxiosConfiguration
      .put(`edit/${usuario.id}`, userProfileDTO)
      .then((response) => {
        toast.success("Perfil actualizado con éxito!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/home');
      })
      .catch((error) => {
        toast.error(`Error al actualizar el perfil: ${error.response?.data?.message || error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="text-center mb-4">
          <img src={formData.photo} alt="profile" className="rounded-full border-2 border-gray-300 w-24 h-24" />
          <div className="mt-2 flex justify-center space-x-2">
            <button className="mx-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Change photo</button>
            <button className="mx-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">Remove photo</button>
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="name" className="font-semibold text-white">Name:</label>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="lastname" className="font-semibold text-white">Last name:</label>
                <input type="text" name="lastname" placeholder="Last name" value={formData.lastname} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="email" className="font-semibold text-white">Email:</label>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="username" className="font-semibold text-white">Username:</label>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-semibold text-white">Bio:</label>
              <textarea name="bio" placeholder="Bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
              <button type="button" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={navigate('/home') }>Discard</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};