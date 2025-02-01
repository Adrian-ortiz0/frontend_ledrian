import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../CreateModal";

const NavButton = ({ imagePath, altText, text, navigateTo, onClick, width = 20, height = 20 }) => {
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
      className="w-full h-full bg-transparent border-none rounded-lg cursor-pointer text-white transition duration-300 text-left pl-5 flex items-center gap-8 p-5 hover:bg-[#ffffff18]"
    >
      <img src={imagePath} alt={altText} width={width} height={height} />
      {text}
    </button>
  );
};

export const AsideProfile = ({ usuario }) => {
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
    <aside className="w-[15vw] h-full flex flex-col justify-between items-center bg-gray-800 text-gray-200 fixed">
      <div className="flex flex-col w-full justify-around">
        <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 italic font-bold pl-[2vw] pt-10 pb-5">Ledrian</span>

        <NavButton
          imagePath="/public/home_icon.png"
          altText="Home Icon"
          text="Home"
          navigateTo="/home"
        />
        <NavButton
          imagePath="/public/friends_icon.png"
          altText="Friends Icon"
          text="Followers"
          navigateTo="/friends"
        />
        <NavButton
          imagePath="/public/friends_icon.png"
          altText="Friends Icon"
          text="Following"
          navigateTo="/friends"
        />
        <NavButton
          imagePath="/public/tabs_icon.png"
          altText="Create Icon"
          text="Create"
          onClick={handleCreate}
        />
        <NavButton
          imagePath="/public/conversation_icon.png"
          altText="Messages Icon"
          text="Messages"
          navigateTo="/messages"
        />
        <NavButton
          imagePath="/public/notification_icon.png"
          altText="Messages Icon"
          text="Notifications"
          navigateTo="/home"
        />
      </div>

      <div className="flex flex-col w-full justify-around">
        <NavButton
          imagePath={usuario.photo}
          altText="User Photo"
          text={`${usuario.name} ${usuario.lastname}`}
          navigateTo="../profile"
          width={40}
          height={40}
        />
        {/*<NavButton 
          imagePath="/public/setting_icon.png" 
          altText="Settings Icon" 
          text="Settings" 
          navigateTo="/settings" 
  />*/}
        <NavButton
          imagePath="/public/logout_icon.png"
          altText="Log out Icon"
          text="Log out"
          onClick={handleLogout}
        />
      </div>

      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
    </aside>
  );
};
