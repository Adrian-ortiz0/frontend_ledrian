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
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Create a new post</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='image-upload'>
            {image ? (
              <img src={image} alt='Preview' className='image-preview' />
            ) : (
              <label htmlFor='file-upload' className='upload-label'>
                <span>Upload an image</span>
                <input
                  id='file-upload'
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
          <textarea
            id='caption-textarea'
            placeholder='Write a caption...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            id='publish-button'
            type='submit'
            disabled={!image}
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};