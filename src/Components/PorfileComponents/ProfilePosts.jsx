import React, { useEffect, useState } from 'react';
import { PostCard } from '../PublicationsComponents/PostCard';
import AxiosConfiguration from '../../AxiosConfiguration';

export const ProfilePosts = ({ usuario }) => {
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


  return (
    <section className="profile_posts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-h-[40vh] w-[90%] p-5 mx-auto mt-5 place-items-center z-[1] ">
      {ownPosts.length > 0 ? (
        ownPosts.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            img={post.photo}
            description={post.description}
            date={post.date}
            interations={post.interations}
            postId={post.id}
          />
        ))
      ) : (
        <p>No hay publicaciones</p>
      )}
    </section>
  );
};