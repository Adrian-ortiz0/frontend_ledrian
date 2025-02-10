import React from 'react'
import { ProfileBanner } from '../PorfileComponents/ProfileBanner'
import { ProfilePosts } from '../PorfileComponents/ProfilePosts'
import { OtherProfileBanner } from './OtherProfileBanner'

export const OtherProfileFeed = ({usuario}) => {
  return (
        <div className='flex-col h-[100vh] overflow-y-auto'>
          <OtherProfileBanner usuario={usuario} />
          <ProfilePosts usuario={usuario} />
        </div>
  )
}
