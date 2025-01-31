import React from 'react'
import { FeedCreate } from './FeedCreate'

export const Feed = ({usuario}) => {
  return (
    <main className='flex flex-col w-[60vw] p-10 left-[15vw] fixed'>
        <FeedCreate />
    </main>
  )
}
