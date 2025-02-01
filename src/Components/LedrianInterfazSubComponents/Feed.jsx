import React from 'react'
import { FeedCreate } from './FeedCreate'
import { FeedPosts } from './FeedPosts'

export const Feed = ({usuario}) => {
  return (
    <main className='flex flex-col w-[60vw] p-10 left-[15vw] fixed overflow-y-auto h-screen'>
        <FeedCreate />
        <FeedPosts usuario={usuario} />
    </main>
  )
}
