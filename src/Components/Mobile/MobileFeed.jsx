import React from 'react'
import { FeedPostsMobile } from './MobileFeedPost'

export const MobileFeed = ({usuario}) => {
  return (
    <main className='flex flex-col w-screen overflow-y-auto h-screen'>
        <FeedPostsMobile usuario={usuario} />
    </main>
  )
}
