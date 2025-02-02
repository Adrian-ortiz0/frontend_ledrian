import React from "react";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "./LedrianInterfazSubComponents/HeaderNav";
import { FriendsFeed } from "./FriendsComponents/FriendsFeed";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../UserContext";
import { MobileNavBar } from './Mobile/MobileAside';



export const Friends = () => {
  const { usuario } = useUser();
  return (
    <section className='bg-gray-900  h-screen flex'>
      <section className='flex h-screen hidden lg:flex'>
        <FriendsFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      <AsideProfile usuario={usuario} />
      </section>

      <section className='flex h-screen lg:hidden'>
        <FriendsFeed usuario={usuario} />
        <MobileNavBar/>
        
      </section>
    </section>
  );
};
