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
      <div className='h-screen bg-gray-100 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]'>
      <AsideProfile usuario={usuario} />
        <ProfileFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </div>
      <div className='lg:hidden flex flex-col justify-between h-screen'>
      <ProfileFeed usuario={usuario} />
      <MobileNavBar usuario={usuario}/>
      </div>
    </div>
  )
}
