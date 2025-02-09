import React from "react";
import { useUser } from "../UserContext";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { FollowersFeed } from "./FriendsComponents/FollowersFeed";
import { MobileNavBar } from "./Mobile/MobileAside";

export const MyFollowers = () => {
  const { usuario } = useUser();
  return (
    <>
      <section className="overflow-y-hidden h-screen bg-gray-900 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]">
        <AsideProfile usuario={usuario} />
        <FollowersFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>

      <section className="bg-gray-900 lg:hidden flex h-screen">
        <FollowersFeed usuario={usuario} />
        <MobileNavBar />
      </section>
      </>
  );
};
