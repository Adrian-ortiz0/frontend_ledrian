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

      setOwnPosts(postsWithImages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchOwnPosts();
  }, [usuario]);

  return (
    <section className="profile_posts">
      {ownPosts.length > 0 ? (
        ownPosts.map((post) => (
          <PostCard
            key={post.id}
            username={post.username}
            img={post.photo}
            description={post.description}
          />
        ))
      ) : (
        <p>No hay publicaciones</p>
      )}
    </section>
  );
};