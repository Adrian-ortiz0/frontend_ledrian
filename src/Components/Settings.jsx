import React from 'react'
import { HeaderNav } from './LedrianInterfazSubComponents/HeaderNav'
import { AsideProfile } from './LedrianInterfazSubComponents/AsideProfile'
import { SettingsFeed } from './SettingsComponents/SettingsFeed'
import { useUser } from '../UserContext'

export const Settings = () => {

  const {usuario} = useUser();

  return (
    <section className='settings_background'>
        <HeaderNav usuario={usuario}/>
        <section className='content'>
            <AsideProfile usuario={usuario} />
            <SettingsFeed usuario={usuario} />
        </section>
    </section>
    
  )
}
