import React from 'react'
import { HeaderNav } from './LedrianInterfazSubComponents/HeaderNav'
import { useUser } from '../UserContext'
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import { AsideContacts } from './MessagesComponents/AsideContacts';
import { ChatContainer } from './MessagesComponents/ChatContainer';
import { AsideOnlyIcons } from './MessagesComponents/AsideOnlyIcons';

export const Messages = () => {

    const {usuario} = useUser();

  return (
    <div className='bg-white h-screen flex-col'>
        <HeaderNav usuario={usuario} />
        <section className='content'>
            <AsideOnlyIcons usuario={usuario} />
            <AsideContacts usuario={usuario} />
            <ChatContainer usuario={usuario} />
        </section>
    </div>
  )
}
