import React, { useEffect, useState } from 'react'
import { PostCard } from '../PublicationsComponents/PostCard'
import AxiosConfiguration from '../../AxiosConfiguration';

export const ProfilePosts = ({usuario}) => {

  const [ownPosts, setOwnPosts] = useState([]);

  const fetchOwnPosts = () => {
    AxiosConfiguration.get(`publications/user/${usuario.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` 
      },
    }).then((response) => {
      setOwnPosts(response.data)
    }).catch((error) => {
      console.error("Error fetching posts" + error)
    })
  }

  useEffect(() => {
    console.log(ownPosts)
    fetchOwnPosts();
  }, [])


  console.log(usuario)
  return (
    <section className='profile_posts'>
      <PostCard />
    </section>
  )
}
