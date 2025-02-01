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

export const FeedPostCard = ({
  username,
  profilePic,
  imageUrl,
  likes,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
        subheader={<Typography variant="caption" sx={{ color: '#b0b0b0' }}>Hace 2 horas</Typography>}
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
