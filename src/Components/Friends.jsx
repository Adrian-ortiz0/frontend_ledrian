import React from "react";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "./LedrianInterfazSubComponents/HeaderNav";
import { FriendsFeed } from "./FriendsComponents/FriendsFeed";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../UserContext";

export const Friends = () => {
  const { usuario } = useUser();
  return (

    <section className='bg-gray-900  h-screen flex'>
      <section className='flex h-screen'>
        <FriendsFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
      <AsideProfile usuario={usuario} />
    </section>

  );
};
