import React from "react";
import { Suggestions } from "./Suggestions";
import { Stories } from "./Stories";
import { SearchInput } from "./SearchInput";
import { useNavigate } from "react-router";

export const SuggestionsSection = ({usuario}) => {

  const navigate = useNavigate();
  
  const handleSelectUser = (user) => {
    console.log('Usuario seleccionado:', user);
    navigate(`../user/${user.id}`)
  };

  return (
    <section className="w-[25vw] h-full fixed right-0 flex flex-col justify-start gap-9 items-center bg-gray-800 pt-8">
      <SearchInput onSelectUser={handleSelectUser} />
      <Stories />
      <Suggestions />
    </section>
  );
};
