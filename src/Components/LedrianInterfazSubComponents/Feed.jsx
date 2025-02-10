import React from 'react'
import { FeedCreate } from './FeedCreate'
import { FeedPosts } from './FeedPosts'

export const Feed = ({usuario}) => {
  return (
    <>
    <main className='hidden lg:flex lg:flex-col p-10 overflow-y-auto h-screen'>
        <FeedCreate />
        <FeedPosts usuario={usuario} />
    </main>
    <main className='flex flex-col overflow-y-auto h-screen lg:hidden'>
        <FeedPosts usuario={usuario} />
    </main>
    </>
  )
}
