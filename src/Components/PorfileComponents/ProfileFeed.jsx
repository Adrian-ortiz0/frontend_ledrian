import React from 'react'
import { ProfileBanner } from './ProfileBanner'
import { ProfileNav } from './ProfileNav'
import { ProfilePosts } from './ProfilePosts'

export const ProfileFeed = ({usuario}) => {
  return (
    <>
    <div className='flex flex-col w-full overflow-y-auto'>
      <ProfileBanner usuario={usuario} />
      <ProfilePosts usuario={usuario} />
    </div>
    </>
  )
}
