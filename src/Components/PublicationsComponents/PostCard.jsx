import React, { useState } from 'react';
import { PostCardModalPc } from './PostCardModalPc';

export const PostCard = ({ img, description, username }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="post_card">
        <button className="post" onClick={openModal}>
          <img src={img} alt={description} />
        </button>
      </div>

      {isModalOpen && (
        <PostCardModalPc
          img={img}
          description={description}
          username={username}
          onClose={closeModal}
        />
      )}
    </>
  );
};