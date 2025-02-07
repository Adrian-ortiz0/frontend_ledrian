import React from 'react'
import "../styles.css";
import { HeaderNav } from './LedrianInterfazSubComponents/HeaderNav';
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import { MobileNavBar } from './Mobile/MobileAside';

import { Feed } from './LedrianInterfazSubComponents/Feed';
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection';
import { useUser } from '../UserContext';
import { MobileFeed } from './Mobile/MobileFeed';
import { SearchInput } from './LedrianInterfazSubComponents/SearchInput';


export const LedrianInterfaz = () => {

  const {usuario} = useUser();
  console.log(usuario);

  return (
    <>
      <section className='h-screen bg-gray-900 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]'>
        <AsideProfile usuario={usuario} />
        <Feed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>

      <section className='lg:hidden h-screen bg-gray-900'>
        <div className='py-3'>
        <SearchInput />
        </div>
        <MobileNavBar/>
        <MobileFeed usuario={usuario} />
      </section>
      </>
  )
}
