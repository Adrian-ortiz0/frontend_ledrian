import React from "react";
import { AsideProfile } from "../LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "../LedrianInterfazSubComponents/HeaderNav";
import { ProfileEditForm } from "./ProfileEditForm";
import { Suggestions } from "../LedrianInterfazSubComponents/Suggestions";
import { SuggestionsSection } from "../LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../../UserContext";

export const ProfileEdit = () => {

  const {usuario} = useUser();

  return (
    <div className="profile_container">
      <HeaderNav usuario={usuario} />
      <section className="content">
        <AsideProfile usuario={usuario} />
        <ProfileEditForm usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
    </div>
  );
};
