import React from "react";
import { Suggestions } from "./Suggestions";
import { Stories } from "./Stories";
import { SearchInput } from "./SearchInput";
import { useNavigate } from "react-router";

export const SuggestionsSection = ({usuario}) => {

  return (
    <section className="h-[100vh] flex flex-col justify-start gap-9 items-center bg-gray-800 pt-8">
      <SearchInput />
      {/* <Stories /> */}
      <Suggestions />
    </section>
  );
};
