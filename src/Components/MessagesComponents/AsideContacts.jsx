import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../UserContext";


const SuggestionCard = ({ profileImage, firstName, lastName, username }) => {

  const {usuario} = useUser();

  return (
    <button className="w-[100%] cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out">
      <div className="flex items-center justify-start gap-2 p-5">
        <img
          src={usuario.photo}
          alt={`${firstName} ${lastName}`}
          width={40}
          height={40}
          className="rounded-full border-2 border-blue-500"
        />
        <div className="flex flex-col">
          <p className="text-white text-sm">
            {firstName} {lastName}
          </p>
          <p className="text-gray-400 text-xs">@{username}</p>
        </div>
      </div>
    </button>
  );
}  

export const AsideContacts = () => {
  return (
    <aside className="aside_chats-container w-[15%] h-full flex flex-col justify-between items-center bg-gray-700 text-gray-200">
      <SuggestionCard
        firstName={"Adrian"}
        lastName={"Ortiz"}
        username={"Adrian-ortiz"}
      />
    </aside>
  );
};
