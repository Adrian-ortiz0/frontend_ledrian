import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../CreateModal";
import NotificationsList from "../Nofications/NotificationsList";

const NavButton = ({
  imagePath,
  altText,
  text,
  navigateTo,
  onClick,
  width = 20,
  height = 20,
  isProfilePhoto = false,
}) => {
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
      className={`w-full h-full bg-transparent border-none rounded-lg cursor-pointer text-white transition duration-300 text-left pl-5 flex items-center gap-8 p-5 hover:bg-[#ffffff18] ${
        isProfilePhoto ? "justify-center" : ""
      }`}
    >
      <img
        src={imagePath}
        alt={altText}
        width={width}
        height={height}
        className={isProfilePhoto ? "rounded-full" : ""}
      />
      {!isProfilePhoto && text}
    </button>
  );
};

export const AsideProfile = ({ usuario }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleNoti = () => {
    setIsNotificationOpen(true);
  };

  const handleNotiClose = () => {
    setIsNotificationOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const profileImagePath = usuario.photo.startsWith("http")
    ? usuario.photo
    : `http://localhost:8083/api/publications/images/${usuario.photo}`;

  return (
    <aside className="overflow-y-scroll h-full flex flex-col justify-between items-center bg-gray-800 text-gray-200">
      <div className="flex flex-col w-full justify-around">
        <span className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 italic font-bold pt-10 pb-4">
          Ledrian
        </span>

        <NavButton
          imagePath="/home_icon.png"
          altText="Home Icon"
          text="Home"
          navigateTo="/home"
        />
        <NavButton
          imagePath="/notification_icon.png"
          altText="Notifications Icon"
          text="Notifications"
          onClick={handleNoti}
        />
        <NavButton
          imagePath="/friends_icon.png"
          altText="Friends Icon"
          text="Followers"
          navigateTo="/myfollowers"
        />
        <NavButton
          imagePath="/friends_icon.png"
          altText="Friends Icon"
          text="Following"
          navigateTo="/friends"
        />
        <NavButton
          imagePath="/tabs_icon.png"
          altText="Create Icon"
          text="Create"
          onClick={handleCreate}
        />
        <NavButton
          imagePath="/conversation_icon.png"
          altText="Messages Icon"
          text="Messages"
          navigateTo="/messages"
        />
      </div>

      <div className="flex flex-col w-full justify-around">
        <NavButton
          imagePath={profileImagePath}
          altText="User Photo"
          text={
            <span className="text-white font-semibold ml-2">
              {usuario.name} {usuario.lastname}
            </span>
          }
          navigateTo="/profile"
          width={40}
          height={40}
          isProfilePhoto={false}
        />
        <NavButton
          imagePath="/logout_icon.png"
          altText="Log out Icon"
          text="Log out"
          onClick={handleLogout}
        />
      </div>

      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
      {isNotificationOpen && (
        <NotificationsList onClose={handleNotiClose} usuario={usuario} />
      )}
    </aside>
  );
};
