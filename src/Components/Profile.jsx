import React from 'react'
import { HeaderNav } from '../Components/LedrianInterfazSubComponents/HeaderNav'
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile'
import { SuggestionsSection } from './LedrianInterfazSubComponents/SuggestionsSection'
import { ProfileFeed } from './PorfileComponents/ProfileFeed'
import { useUser } from '../UserContext'

export const Profile = () => {

  const { usuario } = useUser();

  return (

    <div className=''>
        {/*<HeaderNav usuario={usuario}/>*/}
      <AsideProfile usuario={usuario} />
        <ProfileFeed usuario={usuario} />
        <SuggestionsSection usuario={usuario} />
      </div>
  )
}
