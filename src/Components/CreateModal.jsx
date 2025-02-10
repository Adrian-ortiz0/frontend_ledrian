import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
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
    if (description.length < 5 || description.length > 500) {
      alert("The caption must be between 5 and 500 characters.");
      return;
    }
    const data = new FormData();
    data.append('description', description);
    data.append('photo', formData.photo);
    data.append('username', formData.username);
    data.append('date', formData.date);
    data.append("publisherId", formData.publisherId);

    AxiosConfiguration.post('publications/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
    })
      .then((response) => {
        console.log('Post created:', response.data);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div className='text-black
 fixed inset-0 bg-black/50 flex justify-center items-center z-[9999] p-4'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl'>
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          <h2 className='text-lg font-semibold'>Create a new post</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='flex justify-center items-center h-60 bg-gray-50 border-b border-gray-200'>
            {image ? (
              <img src={image} alt='Preview' className='max-w-full max-h-full object-contain' />
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
            placeholder='Write a caption (5-500 characters)...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full h-24 p-4 border-none outline-none resize-none text-sm border-b border-gray-200'
          />
          <button
            id='publish-button'
            type='submit'
            disabled={!image || description.length < 5 || description.length > 500}
            className='w-full p-3 bg-blue-500 text-white border-none rounded-b-lg text-sm font-semibold cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed'
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};
