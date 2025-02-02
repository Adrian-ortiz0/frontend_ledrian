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
    <main className='bg-gray-900  h-screen flex'>
      <section className='flex h-screen hidden lg:flex'>
        <Feed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      <AsideProfile usuario={usuario} />
      </section>

      <section className='lg:hidden'>
        <div className='py-3'>
        <SearchInput />
        </div>
        <MobileNavBar/>
        <MobileFeed usuario={usuario} />
      </section>
    </main>
  )
}
