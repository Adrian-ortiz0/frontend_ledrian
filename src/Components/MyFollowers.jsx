import React from "react";
import { useUser } from "../UserContext";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { FollowersFeed } from "./FriendsComponents/FollowersFeed";
import { MobileNavBar } from "./Mobile/MobileAside";

export const MyFollowers = () => {
  const { usuario } = useUser();
  return (
    <main className="">
      <section className=" hidden lg:bg-gray-900  h-screen lg:flex h-screen">
        <AsideProfile usuario={usuario} />
        <FollowersFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
      <section className="bg-gray-900 lg:hidden h-screen flex h-screen">
        <FollowersFeed usuario={usuario} />
        <MobileNavBar />
      </section>
    </main>
  );
};
