import React from "react";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "./LedrianInterfazSubComponents/HeaderNav";
import { FriendsFeed } from "./FriendsComponents/FriendsFeed";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../UserContext";
import { MobileNavBar } from "./Mobile/MobileAside";

export const Friends = () => {
  const { usuario } = useUser();
  return (
    <>
      <section className="h-screen bg-gray-900 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]">
        <AsideProfile usuario={usuario} />
        <FriendsFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>

      <section className="flex  bg-gray-900 h-screen lg:hidden">
        <FriendsFeed usuario={usuario} />
        <MobileNavBar />
      </section>
      </>
  );
};
