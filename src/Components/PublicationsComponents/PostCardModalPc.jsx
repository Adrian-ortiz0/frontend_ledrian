import React from 'react';

export const PostCardModalPc = ({ img, description, username, onClose }) => {
  return (
    <div className="post-card-modal-overlay" onClick={onClose}>
      <div className="post-card-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="post-card-modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="post-card-modal-body">
          <div className="post-card-modal-image-container">
            <img src={img} alt={description} className="post-card-modal-image" />
          </div>
          <div className="post-card-modal-details">
            <h3 className="post-card-modal-username">{username}</h3>
            <p className="post-card-modal-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};