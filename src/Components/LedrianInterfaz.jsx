import React from 'react'
import "../styles.css";
import { HeaderNav } from './LedrianInterfazSubComponents/HeaderNav';
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import { Feed } from './LedrianInterfazSubComponents/Feed';
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection';
import { useUser } from '../UserContext';

export const LedrianInterfaz = () => {

  const {usuario} = useUser();
  console.log(usuario);

  return (
    <main className='bg-[#18153d] bg-gray-900  h-screen flex'>
        <AsideProfile usuario={usuario} />
      <section className='flex h-screen'>
        <Feed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
    </main>
  )
}
