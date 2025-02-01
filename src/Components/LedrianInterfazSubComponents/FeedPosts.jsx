import React, { useEffect, useState } from 'react';
import AxiosConfiguration from '../../AxiosConfiguration';
import { FeedPostCard } from './FeedPostCard';

export const FeedPosts = ({ usuario }) => {
  const [ownPosts, setOwnPosts] = useState([]);

  const fetchImage = async (photo) => {
    const imageUrl = `http://localhost:8083/api/publications/images/${photo}`;
    const response = await fetch(imageUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
    if (!response.ok) {
      console.error(`Error cargando imagen: ${imageUrl}`);
      return null;
    }
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
  };

  const fetchOwnPosts = async () => {
    try {
      const response = await AxiosConfiguration.get(`publications/user/${usuario.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const postsWithImages = await Promise.all(
        response.data.map(async (post) => ({
          ...post,
          photo: await fetchImage(post.photo),
        }))
      );

      const sortedPosts = postsWithImages.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date); 
        return dateB - dateA; 
      });

      setOwnPosts(sortedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchOwnPosts();
  }, [usuario]);

  console.log(ownPosts);

  return (
    <main className='feed_post-container'>
      {ownPosts.map((ownPost) => (
        <FeedPostCard
          key={ownPost.id}
          username={usuario.username}
          profilePic={usuario.photo}
          imageUrl={ownPost.photo}
          likes={25}
          comments={10}
        />
      ))}
    </main>
  );
};