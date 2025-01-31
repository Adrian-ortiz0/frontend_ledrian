import React from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../UserContext";


const NavButton = ({
  imagePath,
  altText,
  text,
  navigateTo,
  onClick,
  width = 20,
  height = 20,
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
      className="w-full h-full bg-transparent border-none rounded-lg cursor-pointer text-white transition duration-300 text-left pl-5 flex items-center gap-8 p-5 hover:bg-[#ffffff18]"
    >
      <img src={imagePath} alt={altText} width={width} height={height} />
      {text}
    </button>
  );
};

export const AsideOnlyIcons = ({ usuario }) => {

  return (
    <aside className="aside_only-icons">
      <div className="flex flex-col w-full justify-around">
        <NavButton imagePath="/public/home_icon.png" navigateTo="/home"  />
        <NavButton imagePath="/public/friends_icon.png" navigateTo="/friends" />
        <NavButton imagePath="/public/conversation_icon.png" navigateTo="/messages"  />
        <NavButton imagePath="/public/notification_icon.png" navigateTo="/home"  />
      </div>

      <div className="flex flex-col w-full justify-around">
        <NavButton imagePath={usuario.photo} navigateTo="../profile"  />
        <NavButton imagePath="/public/setting_icon.png" navigateTo="/settings"  />
        <NavButton imagePath="/public/setting_icon.png" navigateTo="/login"  />
      </div>

    </aside>
  );
};
