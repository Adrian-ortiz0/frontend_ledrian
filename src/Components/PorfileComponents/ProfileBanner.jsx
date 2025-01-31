import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../CreateModal";

export const ProfileBanner = ({ usuario }) => {
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#f5f5f5]">
      {/* Banner */}
      <div className="w-full h-[30vh] bg-[#746c6c] bg-cover bg-center rounded-t-lg"
           style={{ backgroundImage: `url(${usuario.banner})` }}>
      </div>

      {/* Profile Info */}
      <div className="w-full min-5xl flex flex-col items-center bg-[#1c1c1c] py-8 px-6 rounded-b-lg shadow-lg">
        <div className="flex items-center gap-6 mb-6">
          {/* Profile Image */}
          <button className="relative bottom-30 right-60">
            <img 
              src={usuario.photo}
              alt={`${usuario.name} ${usuario.lastname}`}
              className="w-45 h-45 rounded-full border-4 border-white shadow-lg"
            />
          </button>

          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">{usuario.name} {usuario.lastname}</h1>
            <p className="text-gray-400">@{usuario.username}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="text-white w-full flex flex-col items-center gap-6">
          {/* Action Buttons */}
          <div className="flex gap-6 mb-4">
            <button
              onClick={() => navigate("edit")}
              className="bg-blue-500 text-white py-2 px-8 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-amber-800 text-white py-2 px-8 rounded-full hover:bg-green-600 transition duration-300"
            >
              Add Post
            </button>
          </div>

          {/* Stats Section */}
          <div className="flex justify-around w-full text-sm text-gray-400 mb-4">
            <p>{usuario.publications.length} posts</p>
            <p>{usuario.followers.length} followers</p>
            <p>{usuario.following.length} following</p>
          </div>

          {/* Bio Text */}
          <div className="text-center px-6">
            <p>{usuario.bio}</p>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
    </div>
  );
};
