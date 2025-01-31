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
      <div className="w-full h-[25vh] bg-[#746c6c] bg-cover bg-center "
        style={{ backgroundImage: `url(${usuario.banner})` }}>
      </div>

      {/* Profile Info */}
      <div className="flex w-full">
        <div className="w-full h-full bg-[#1c1c1c] rounded-b-lg flex shadow-lg flex-col">
          <button className="w-full flex justify-center items-center">
            <img
              src={usuario.photo}
              alt={`${usuario.name} ${usuario.lastname}`}
              className="w-45 h-45 rounded-full border-4 border-white"
            />
          </button>
          <div className="flex-col items-center justify-center text-center text-white w-full">
            {/* Nombre de usuario y su handle */}
            <h3 className="text-3xl font-bold mb-2">{usuario.name} {usuario.lastname}</h3>
            <p className="text-gray-400 text-lg">@{usuario.username}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-8 w-full text-3xl text-gray-400 bg-black mb-4 ">
          <div className="flex flex-col">
            <span className="text-center">{usuario.publications.length}</span>
            <span> posts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-center">{usuario.followers.length}</span>
            <span>followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-center">{usuario.following.length}</span>
            <span> following</span>
          </div>
        </div>
      </div>
      <div className="text-white w-full flex-col items-center mt-6">
        <span className="text-gray-300 text-base max-w-3xl text-center text-gray-200 text-sm mt-2">{usuario.bio} {`hola soy un ser humano que le importa.`}</span>

        {/* Botones de Acción */}
        {/*<div className="flex gap-8 mt-6">
            <button
              onClick={() => navigate("edit")}
              className="bg-blue-500 text-white py-2 px-10 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-amber-800 text-white py-2 px-10 rounded-full hover:bg-green-600 transition duration-300"
            >
              Add Post
            </button>
  </div>*/}
      </div>


      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
    </div>
  );
};
