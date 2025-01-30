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
    <main className='ledrianInterfaz'>
      <HeaderNav usuario={usuario}/>
      <section className='content'>
        <AsideProfile usuario={usuario} />
        <Feed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </section>
    </main>
  )
}
