import React from 'react'
import { FriendsCard } from './FriendsCard'

export const FriendsFeed = ({usuario}) => {
  return (
    <div className='friends_feed'>
        <div className='flex flex-col w-[60vw] p-10 left-[15vw] fixed'>
            <FriendsCard usuario={usuario} />
        </div>
    </div>
  )
}
