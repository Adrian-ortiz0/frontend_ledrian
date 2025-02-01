import React from 'react'
import { useUser } from '../UserContext';
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import {SuggestionsSection} from './LedrianInterfazSubComponents/SuggestionsSection';
import { FollowersFeed } from './FriendsComponents/FollowersFeed';

export const MyFollowers = () => {
    const { usuario } = useUser();
  return (
    <section className='bg-gray-900  h-screen flex'>
        <section className='flex h-screen'>
            <FollowersFeed usuario={usuario}/>
            <SuggestionsSection usuario={usuario}/>
        </section>
        <AsideProfile usuario={usuario} />
    </section>
  )
}
