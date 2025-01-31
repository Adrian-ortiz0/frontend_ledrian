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
    <div className="w-full flex flex-col items-center">
    {/* banner */}
    <div
      className="w-full h-40 sm:h-56 md:h-64 lg:h-50 bg-gray-700 bg-cover bg-center"
      style={{ backgroundImage: `url(${usuario.banner})` }}
    ></div>

    {/* contenedor de perfil */}
    <div className="w-full gap-7 max-w-4xl bg-gray-100 rounded-lg shadow-md -mt-16 p-6 flex flex-col items-center">
      {/* imagen de perfil */}
      <button className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden">
        <img src={usuario.photo} alt={`${usuario.name} ${usuario.lastname}`} className="w-full h-full object-cover" />
      </button>

      {/* info del usuario */}
      <div className="text-center mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{usuario.name} {usuario.lastname}</h3>
        <p className="text-gray-500 text-lg">@{usuario.username}</p>
      </div>

      {/* follows */}
      <div className="flex justify-around w-full max-w-md mt-6 text-center">
        <div className="flex flex-col text-gray-700">
          <span className="text-xl font-semibold">{usuario.publications.length}</span>
          <span className="text-sm text-gray-500">Posts</span>
        </div>
        <div className="flex flex-col text-gray-700">
          <span className="text-xl font-semibold">{usuario.followers.length}</span>
          <span className="text-sm text-gray-500">Followers</span>
        </div>
        <div className="flex flex-col text-gray-700">
          <span className="text-xl font-semibold">{usuario.following.length}</span>
          <span className="text-sm text-gray-500">Following</span>
        </div>
      </div>

      {/* biografia */}
      <p className="text-gray-700 text-sm text-center mt-4 max-w-2xl">{usuario.bio || "Hola, soy un ser humano que le importa."}</p>

      {/* botones de accion */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("edit")}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
        >
          Add Post
        </button>
      </div>
    </div>

    {/* modal pa crear */}
    {isCreateModalOpen && <CreateModal onClose={handleCloseModal} usuario={usuario} />}
  </div>
  );
};
