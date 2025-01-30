import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../CreateModal";

export const AsideProfile = ({ usuario }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <aside className="aside_profile-container">
      <div className="aside_profile-options">
        <button onClick={() => navigate("../profile")}>
          <img src={usuario.photo} alt="" width={30} height={30} />
          {usuario.name} {usuario.lastname}
        </button>
        <button onClick={() => navigate("/home")}>
          <img src="/public/home_icon.png" alt="" width={20} height={20} />
          Home
        </button>
        <button onClick={() => navigate("/friends")}>
          <img src="/public/friends_icon.png" alt="" width={20} height={20} />
          Friends
        </button>
        <button onClick={handleCreate}> 
          <img src="/public/tabs_icon.png" alt="" width={20} height={20} />
          Create
        </button>
        <button onClick={() => navigate("/settings")}>
          <img src="/public/setting_icon.png" alt="" width={20} height={20} />
          Settings
        </button>
        <button>
          <img src="/public/conversation_icon.png" alt="" width={20} height={20} />
          Messages
        </button>
        <button>
          <img src="/public/more_icon.png" alt="" width={20} height={20} />
          More
        </button>
      </div>

      {isCreateModalOpen && (
        <CreateModal onClose={handleCloseModal} usuario={usuario} />
      )}
    </aside>
  );
};