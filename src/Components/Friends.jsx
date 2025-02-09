import React from "react";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { HeaderNav } from "./LedrianInterfazSubComponents/HeaderNav";
import { FriendsFeed } from "./FriendsComponents/FriendsFeed";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { useUser } from "../UserContext";
import { MobileNavBar } from "./Mobile/MobileAside";
import { SearchInput } from './LedrianInterfazSubComponents/SearchInput';
import { NotificationButton } from './Mobile/NotificationIcon';


export const Friends = () => {
  const { usuario } = useUser();
  return (
    <>
      <section className="h-screen bg-gray-900 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]">
        <AsideProfile usuario={usuario} />
        <FriendsFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>

      <section className="flex flex-col bg-gray-900 h-screen lg:hidden">
        <div className='grid grid-cols-[5fr_1fr]'>
          <SearchInput padding='p-3'/>
          <NotificationButton usuario={usuario}/>
        </div>
        <FriendsFeed usuario={usuario} />
        <MobileNavBar usuario={usuario} />
      </section>
      </>
  );
};
