import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { useUser } from "../../UserContext";
import AxiosConfiguration from "../../AxiosConfiguration";

export const FeedPostCard = ({
  username,
  profilePic,
  imageUrl,
  likes,
  comments,
  description,
  date,
  postId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { usuario } = useUser();

  const handleLikeClick = async () => {
    try {
      const interationDTO = {
        userGivingInteration: usuario.username,
        userReceivingInteration: username,
        idPublication: postId, 
        type: "Like",
        date: new Date().toISOString() 
      };

      const response = await AxiosConfiguration.post("interations", interationDTO);

      if (response.status === 200) {
        setIsLiked(!isLiked);
        // Aquí podrías actualizar el estado de likes en el componente si es necesario
      }
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Fecha inválida";

    const options = { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        marginBottom: 3,
        backgroundColor: "#1e2939",
        color: "#ffffff",
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={<Avatar src={profilePic} alt={username} />}
        title={username}
        subheader={
          <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
            {formatDate(date)}
          </Typography>
        }
      />

      <CardMedia component="img" image={imageUrl} alt="Post" />

      <CardActions disableSpacing>
        <IconButton
          onClick={handleLikeClick}
          sx={{ color: isLiked ? "#ff4444" : "#ffffff" }}
        >
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton sx={{ color: "#ffffff" }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton sx={{ color: "#ffffff" }}>
          <ShareIcon />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography>{description}</Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }}>
          {likes} Me gusta
        </Typography>
        <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
          {comments} Comentarios
        </Typography>
      </CardContent>
    </Card>
  );
};