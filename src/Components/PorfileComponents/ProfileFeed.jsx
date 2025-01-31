import React from 'react'
import { ProfileBanner } from './ProfileBanner'
import { ProfileNav } from './ProfileNav'
import { ProfilePosts } from './ProfilePosts'

export const ProfileFeed = ({usuario}) => {
  return (
    <div className='flex-col w-[60vw] left-[15vw] fixed overflow-auto'>
        <ProfileBanner usuario={usuario} />
        <ProfilePosts usuario={usuario} />
    </div>
  )
}
