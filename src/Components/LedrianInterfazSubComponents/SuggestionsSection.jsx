import React from "react";
import { Suggestions } from "./Suggestions";
import { Stories } from "./Stories";

export const SuggestionsSection = ({usuario}) => {
  return (
    <section className="suggestions-section-container">
      <Stories />
      <Suggestions />
    </section>
  );
};
