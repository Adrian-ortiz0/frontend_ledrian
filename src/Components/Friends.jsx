import React from "react";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "./LedrianInterfazSubComponents/HeaderNav";
import { FriendsFeed } from "./FriendsComponents/FriendsFeed";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../UserContext";

export const Friends = () => {
  const {usuario} = useUser();
  return (
    <section className="friends_container">
        <HeaderNav usuario={usuario} />
      <section className="content">
        <AsideProfile usuario={usuario} />
        <FriendsFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
    </section>
  );
};
