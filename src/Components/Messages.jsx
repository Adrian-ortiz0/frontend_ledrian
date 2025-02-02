import React from 'react'
import { HeaderNav } from './LedrianInterfazSubComponents/HeaderNav'
import { useUser } from '../UserContext'
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile';
import { AsideContacts } from './MessagesComponents/AsideContacts';
import { ChatContainer } from './MessagesComponents/ChatContainer';
import { AsideOnlyIcons } from './MessagesComponents/AsideOnlyIcons';
import MessagingContainer from './Chat/MessagingContainer';

export const Messages = () => {

    const {usuario} = useUser();

  return (
        <section className='flex h-screen w-screen'>
            {/* <AsideOnlyIcons usuario={usuario} /> */}
            <MessagingContainer usuario={usuario} />
        </section>
  )
}
