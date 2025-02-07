import React from 'react'
import { ProfileBanner } from './ProfileBanner'
import { ProfileNav } from './ProfileNav'
import { ProfilePosts } from './ProfilePosts'

export const ProfileFeed = ({usuario}) => {
  return (
    <>
    <div className='hidden lg:flex flex-col h-[100vh] overflow-y-auto'>
      <ProfileBanner usuario={usuario} />
      <ProfilePosts usuario={usuario} />
    </div>
    <div className='lg:hidden flex-col w-full fixed h-[94vh] overflow-y-auto'>
      <ProfileBanner usuario={usuario} />
      <ProfilePosts usuario={usuario} />
    </div>
    </>
  )
}
