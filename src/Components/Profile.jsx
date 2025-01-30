import React from 'react'
import { HeaderNav } from '../Components/LedrianInterfazSubComponents/HeaderNav'    
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile'
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection'
import { ProfileFeed } from './PorfileComponents/ProfileFeed'
import { useUser } from '../UserContext'

export const Profile = () => {

  const {usuario} = useUser();

  return (
    <section className='profile_container'>
        <HeaderNav usuario={usuario}/>
        <section className='content'>
            <AsideProfile usuario={usuario} />
            <ProfileFeed usuario={usuario} />
            <SuggestionsSection usuario={usuario} />
        </section>
    </section>
  )
}
