import React, { useState } from 'react'
import { PostCard } from '../PublicationsComponents/PostCard'

export const ProfilePosts = ({usuario}) => {

  const [ownPosts, setOwnPosts] = useState([]);


  console.log(usuario)
  return (
    <section className='profile_posts'>
      <PostCard />
    </section>
  )
}
