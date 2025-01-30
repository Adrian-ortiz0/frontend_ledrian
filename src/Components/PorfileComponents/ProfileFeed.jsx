import React from 'react'
import { ProfileBanner } from './ProfileBanner'
import { ProfileNav } from './ProfileNav'
import { ProfilePosts } from './ProfilePosts'

export const ProfileFeed = ({usuario}) => {
  return (
    <div className='profile'>
        <ProfileBanner usuario={usuario} />
        <ProfilePosts usuario={usuario} />
    </div>
  )
}
