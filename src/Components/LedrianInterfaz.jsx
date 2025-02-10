import React from 'react'
import "../styles.css";
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import { MobileNavBar } from './Mobile/MobileAside';

import { Feed } from './LedrianInterfazSubComponents/Feed';
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection';
import { useUser } from '../UserContext';
import { SearchInput } from './LedrianInterfazSubComponents/SearchInput';
import { NotificationButton } from './Mobile/NotificationIcon';


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

      <section className='lg:hidden flex flex-col justify-between h-screen bg-gray-900'>
        <div className='grid grid-cols-[5fr_1fr]'>
          <SearchInput padding='p-3'/>
          <NotificationButton usuario={usuario}/>
        </div>
        <Feed usuario={usuario} />
        <MobileNavBar usuario={usuario}/>
      </section>
      </>
  )
}
