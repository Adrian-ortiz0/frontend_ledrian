import React from 'react'
import { HeaderNav } from '../Components/LedrianInterfazSubComponents/HeaderNav'
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile'
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection'
import { ProfileFeed } from './PorfileComponents/ProfileFeed'
import { useUser } from '../UserContext'
import { MobileNavBar } from './Mobile/MobileAside';


export const Profile = () => {

  const { usuario } = useUser();

  return (

    <div className=''>
      <div className='hidden lg:flex'>
        <ProfileFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      <AsideProfile usuario={usuario} />
      </div>
      <div className='lg:hidden'>
      <ProfileFeed usuario={usuario} />

      <MobileNavBar />
      </div>
    </div>
  )
}
