import React, { useState, useEffect } from 'react';
import { Avatar, IconButton, Typography, Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AxiosConfiguration from '../../AxiosConfiguration';
import { useUser } from '../../UserContext';

export const PostCardModalPc = ({ img, description, username, onClose, date, interations, postId}) => {
  const { usuario } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [interactionId, setInteractionId] = useState(null);
  const [optimisticLikes, setOptimisticLikes] = useState(0);

  useEffect(() => {
    const userInteraction = interations?.find(
      (i) => i.typeInterationId === 1 && i.userGivingId === usuario?.id
    );
    setIsLiked(!!userInteraction);
    setInteractionId(userInteraction?.id || null);

    const initialLikes = interations?.filter((i) => i.typeInterationId === 1).length || 0;
    setOptimisticLikes(initialLikes);
  }, [interations, usuario?.id]);

  const handleLikeClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !usuario?.id) return;

      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setOptimisticLikes((prev) => (newIsLiked ? prev + 1 : prev - 1));

      if (newIsLiked) {
        const response = await AxiosConfiguration.post(
          "interations",
          {
            date: new Date().toISOString(),
            publicationId: postId,
            userGivingId: usuario.id,
            userReceivingId: usuario.id,
            typeInterationId: 1,
          },
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        );
        setInteractionId(response.data.id);
      } else {
        if (interactionId) {
          await AxiosConfiguration.delete(`interations/${interactionId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          setInteractionId(null);
        }
      }
    } catch (error) {
      console.error("Error gestionando like:", error);
      setIsLiked((prev) => !prev);
      setOptimisticLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-[100vw] max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex-1 bg-black flex items-center justify-center p-4">
          <img
            src={img}
            alt={description}
            className="max-w-full max-h-[80vh] object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col w-full md:w-[400px]">
          <div className="flex items-center p-4 border-b">
            <Avatar src="/default-avatar.jpg" alt={username} />
            <Typography variant="subtitle1" className="ml-2 font-semibold">
              {username}
            </Typography>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <Typography variant="body1" className="font-semibold">
                {username}
              </Typography>
              <Typography variant="body2" className="text-gray-700">
                {description}
              </Typography>
              <Typography variant="caption" className="text-gray-500 block mt-1">
                {formattedDate}
              </Typography>
            </div>

            {interations
              ?.filter((i) => i.typeInterationId === 2)
              .map((comment) => (
                <div key={comment.id} className="mb-4">
                  <Typography variant="body1" className="font-semibold">
                    {comment.userGiving?.username || "Usuario"}
                  </Typography>
                  <Typography variant="body2" className="text-gray-700">
                    {comment.comment}
                  </Typography>
                </div>
              ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-between mb-2">
              <div className="flex space-x-4">
                <IconButton onClick={handleLikeClick}>
                  {isLiked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
              </div>
            </div>

            <Typography variant="body2" className="font-semibold">
              {optimisticLikes} Me gusta
            </Typography>
            <Typography variant="caption" className="text-gray-500 block">
              {formattedDate}
            </Typography>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Añade un comentario..."
                className="flex-1 outline-none"
              />
              <button className="text-blue-500 font-semibold">Publicar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};