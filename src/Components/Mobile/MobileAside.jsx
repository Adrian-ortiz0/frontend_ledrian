import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../CreateModal";

export const NavButton = ({ imagePath, altText, navigateTo, onClick, width = 24, height = 24 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center bg-transparent border-none cursor-pointer text-white transition duration-300 p-2 hover:bg-[#ffffff18]"
    >
      <img src={imagePath} alt={altText} width={width} height={height} />
    </button>
  );
};

export const MobileNavBar = ({ usuario }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="w-full bg-gray-800 text-gray-200 flex justify-around items-center p-2">
      <NavButton
        imagePath="/public/home_icon.png"
        altText="Home Icon"
        navigateTo="/home"
        width={28}
        height={28}
      />
      <NavButton
        imagePath="/public/friends_icon.png"
        altText="Followers Icon"
        navigateTo="/friends"
        width={28}
        height={28}
      />
      <NavButton
        imagePath="/public/tabs_icon.png"
        altText="Create Icon"
        onClick={handleCreate}
        width={28}
        height={28}
      />
      <NavButton
        imagePath="/public/conversation_icon.png"
        altText="Messages Icon"
        navigateTo="/messages"
        width={28}
        height={28}
      />
      <NavButton
        imagePath="/public/profile_icon.png"
        altText="User Photo"
        navigateTo="../profile"
        width={28}
        height={28}
      />

      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
    </div>
  );
};