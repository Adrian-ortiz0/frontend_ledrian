import React from "react";
import { Suggestions } from "./Suggestions";
import { Stories } from "./Stories";
import { SearchInput } from "./SearchInput";

export const SuggestionsSection = ({usuario}) => {
  return (
    <section className="w-[25vw] h-full fixed right-0 flex flex-col justify-between items-center bg-gray-800 pt-8">
      <SearchInput />
      <Stories />
      <Suggestions />
    </section>
  );
};
