import React from 'react'
import { FeedCreate } from './FeedCreate'
import { FeedPosts } from './FeedPosts'

export const Feed = ({usuario}) => {
  return (
    <main className='flex flex-col p-10 overflow-y-auto h-screen'>
        <FeedCreate />
        <FeedPosts usuario={usuario} />
    </main>
  )
}
