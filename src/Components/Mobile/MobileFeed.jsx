import React from 'react'
import { FeedPostsMobile } from './MobileFeedPost'

export const MobileFeed = ({usuario}) => {
  return (
    <main className='flex flex-col w-screen fixed overflow-y-auto h-screen pb-[15vh]'>
        <FeedPostsMobile usuario={usuario} />
    </main>
  )
}
