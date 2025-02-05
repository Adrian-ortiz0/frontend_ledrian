import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { useUser } from '../../UserContext';

export const ProfileEditForm = ({ usuario, onClose }) => {
  const navigate = useNavigate();
  const { actualizarUsuario } = useUser(); 

  if (!usuario?.id) {
    toast.error("Error: Usuario no válido");
    navigate('/profile');
    return null;
  }

  const [formData, setFormData] = useState({
    name: usuario.name || '',
    lastname: usuario.lastname || '',
    email: usuario.email || '',
    username: usuario.username || '',
    bio: usuario.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfileDTO = {
      name: formData.name,
      lastname: formData.lastname,
      email: formData.email,
      username: formData.username,
      bio: formData.bio,
    };

    const token = localStorage.getItem('authToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const response = await axios.put(
        `http://localhost:8083/api/users/edit/${usuario.id}`,
        userProfileDTO,
        { headers }
      );

      actualizarUsuario({ ...usuario, ...userProfileDTO });

      toast.success("¡Perfil actualizado con éxito!", {
        position: "top-right",
        autoClose: 3000,
      });

      onClose();

    } catch (error) {
      toast.error(`Error al actualizar el perfil: ${error.response?.data?.message || error.message}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className='w-screen h-screen bg-black flex items-center justify-center'>
      <div className='bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg'>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="name" className="font-semibold text-white">Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="lastname" className="font-semibold text-white">Last name:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="email" className="font-semibold text-white">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
              </div>
              <div className="flex flex-col w-1/2 space-y-2">
                <label htmlFor="username" className="font-semibold text-white">Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} className="p-2 border border-gray-600 rounded bg-gray-700 text-white" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="font-semibold text-white">Bio:</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white h-24 resize-none"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700">Save</button>
              <button type="button" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700 ml-2" onClick={() => navigate('/profile')}>Discard</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
