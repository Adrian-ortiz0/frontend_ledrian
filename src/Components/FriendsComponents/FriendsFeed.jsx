import React from 'react'
import { FriendsCard } from './FriendsCard'

export const FriendsFeed = ({usuario}) => {
  return (
    <div className='friends_feed'>
        <div className='friends_feed-container'>
            <FriendsCard usuario={usuario} />
        </div>
    </div>
  )
}
