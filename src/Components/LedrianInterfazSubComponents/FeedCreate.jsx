import React, { useState } from "react";

import { CreateModal } from "../CreateModal";
import { useUser } from "../../UserContext";

export const FeedCreate = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {usuario} = useUser();

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };


  return (
    <div className="w h-full flex flex-col items-center">
      <div className="w-[100%] flex flex-col items-center justify-center rounded-3xl bg-gray-800  gap-6 shadow-lg p-8">
        <div className="w-full flex items-center justify-center gap-8">
          <img src="/public/profile_icon.png" alt="Profile Icon" width={70} height={70} />
          <button onClick={handleCreate} className="w-[80%] bg-[#ffffff18] text-white rounded-xl text-xl p-4 outline-none resize-none min-h-[80px] placeholder:text-gray-400 placeholder:font-medium cursor-pointer">
            What are you thinking?...
          </button>
        </div>
        <div className="w-full flex justify-between items-center mt-6">
          <div className="flex gap-8">
            {/* <button className="bg-transparent border-none cursor-pointer">
              <img src="/public/image_icon.png" alt="Image Icon" width={25} height={25} />
            </button>
            <button className="bg-transparent border-none cursor-pointer">
              <img src="/public/emoji_icon.png" alt="Emoji Icon" width={25} height={25} />
            </button> */}
          </div>
          {/* <button className="bg-purple-600 text-white rounded-lg px-6 py-3 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-00">
            Post
          </button> */}
        </div>
      </div>
      {isCreateModalOpen && (
              <CreateModal onClose={handleCloseModal} usuario={usuario} />
            )}
    </div>
  );
};
