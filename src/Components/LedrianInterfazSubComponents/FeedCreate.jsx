import React, { useState } from "react";
import { CreateModal } from "../CreateModal";
import { useUser } from "../../UserContext";

export const FeedCreate = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { usuario } = useUser();

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const profileImagePath = usuario.photo.startsWith("http")
    ? usuario.photo
    : `http://localhost:8083/api/publications/images/${usuario.photo}`;

  return (
    <div className="w h-full flex flex-col items-center">
      <div className="w-[100%] flex flex-col items-center justify-center rounded-3xl bg-gray-800 gap-6 shadow-lg p-8">
        <div className="w-full flex items-center justify-center gap-8">
          <img
            src={profileImagePath}
            alt="Profile Icon"
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          <button
            onClick={handleCreate}
            className="w-[80%] bg-[#ffffff18] text-white rounded-xl text-xl p-4 outline-none resize-none min-h-[80px] placeholder:text-gray-400 placeholder:font-medium cursor-pointer"
          >
            What are you thinking?...
          </button>
        </div>
      </div>
      {isCreateModalOpen && <CreateModal onClose={handleCloseModal} usuario={usuario} />}
    </div>
  );
};