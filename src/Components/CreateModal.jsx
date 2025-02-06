import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useUser } from "../UserContext";
import AxiosConfiguration from '../AxiosConfiguration';

export const CreateModal = ({ onClose, usuario }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [formData, setFormData] = useState({
    description: "",
    photo: '',
    username: usuario.username,
    date: new Date().toISOString(),
    publisherId: usuario.id
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(URL.createObjectURL(file));

      setFormData({
        ...formData,
        photo: file, 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('description', description);
    data.append('photo', formData.photo); 
    data.append('username', formData.username);
    data.append('date', formData.date);
    data.append("publisherId", formData.publisherId)

    AxiosConfiguration.post('publications/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
      },
    })
      .then((response) => {
        console.log('Publicación creada:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error al crear la publicación:', error);
      });
  };

  return (
    <div className='fixed inset-0 bg-black/50 bg-opacity-70 flex justify-center items-center z-[9999]'>
  <div className='bg-white rounded-lg shadow-lg w-[500px] max-w-[90%]'>
    <div className='flex justify-between items-center p-4 border-b border-gray-200'>
      <h2 className='text-lg font-semibold'>Create a new post</h2>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
    <form onSubmit={handleSubmit}>
      <div className='flex justify-center items-center h-[300px] bg-gray-50 border-b border-gray-200'>
        {image ? (
          <img src={image} alt='Preview' className='max-w-full max-h-[300px] object-contain' />
        ) : (
          <label htmlFor='file-upload' className='cursor-pointer text-blue-500 font-semibold'>
            <span>Upload an image</span>
            <input
              id='file-upload'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </label>
        )}
      </div>
      <textarea
        id='caption-textarea'
        placeholder='Write a caption...'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full h-[100px] p-4 border-none outline-none resize-none font-inherit text-sm border-b border-gray-200'
      />
      <button
        id='publish-button'
        type='submit'
        disabled={!image}
        className='w-full p-3 bg-blue-500 text-white border-none rounded-b-lg text-sm font-semibold cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed'
      >
        Publish
      </button>
    </form>
  </div>
</div>
  );
};