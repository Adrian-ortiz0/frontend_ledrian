import React, { useState, useEffect } from "react";
import {
  Avatar,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
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
  publisherId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [actionType, setActionType] = useState("");
  const [interactionId, setInteractionId] = useState(null);
  const { usuario } = useUser();

  // Verificar estado del like con el backend
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken || !usuario?.id) return;

        const response = await AxiosConfiguration.get(`interations/check-like`, {
          params: {
            userId: usuario.id,
            postId: postId
          },
          headers: { Authorization: `Bearer ${authToken}` }
        });

        if (response.data.hasLiked) {
          setIsLiked(true);
          setInteractionId(response.data.interactionId);
          
          const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
          savedLikes[postId] = { interactionId: response.data.interactionId };
          localStorage.setItem("likes", JSON.stringify(savedLikes));
        } else {
          const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
          delete savedLikes[postId];
          localStorage.setItem("likes", JSON.stringify(savedLikes));
          setIsLiked(false);
          setInteractionId(null);
        }
      } catch (error) {
        console.error("Error verificando like:", error);
      }
    };

    checkLikeStatus();
  }, [postId, usuario?.id]); 

  const handleLikeClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !usuario?.id) return;

      const newIsLiked = !isLiked;
      const action = newIsLiked ? "add" : "remove";

      setIsLiked(newIsLiked);
      setActionType(action);
      setShowSuccess(true);

      if (action === "add") {
        const response = await AxiosConfiguration.post("interations", {
          publicationId: postId,
          userGivingId: usuario.id,
          userReceivingId: publisherId,
          typeInterationId: 1,
        }, {
          headers: { Authorization: `Bearer ${authToken}` }
        });

        setInteractionId(response.data.id);
        const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
        savedLikes[postId] = { interactionId: response.data.id };
        localStorage.setItem("likes", JSON.stringify(savedLikes));
      } else {
        if (interactionId) {
          await AxiosConfiguration.delete(`interations/${interactionId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });

          const savedLikes = JSON.parse(localStorage.getItem("likes")) || {};
          delete savedLikes[postId];
          localStorage.setItem("likes", JSON.stringify(savedLikes));
          setInteractionId(null);
        }
      }
    } catch (error) {
      console.error("Error gestionando like:", error);
      setIsLiked(prev => !prev); 
      setShowSuccess(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", { 
      day: "2-digit", 
      month: "long", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  return (
    <Card sx={{
      maxWidth: 500,
      margin: "auto",
      marginBottom: 3,
      backgroundColor: "#1e2939",
      color: "#ffffff",
      borderRadius: 2,
      transition: "transform 0.2s",
      '&:hover': { transform: "scale(1.01)" }
    }}>
      <CardHeader
        avatar={<Avatar src={profilePic} alt={username} sx={{ width: 40, height: 40 }} />}
        title={<Typography variant="h6">{username}</Typography>}
        subheader={
          <Typography variant="caption" sx={{ color: "#b0b0b0" }}>
            {formatDate(date)}
          </Typography>
        }
      />

      <CardMedia 
        component="img" 
        image={imageUrl} 
        alt="Post content" 
        sx={{ maxHeight: 500, objectFit: "cover" }}
      />

      <CardActions disableSpacing>
        <IconButton
          onClick={handleLikeClick}
          sx={{ 
            color: isLiked ? "#ff4444" : "#ffffff",
            transition: "color 0.3s"
          }}
        >
          {isLiked ? <FavoriteIcon fontSize="medium" /> : <FavoriteBorderIcon fontSize="medium" />}
        </IconButton>
        
        <IconButton sx={{ color: "#ffffff" }}>
          <ChatBubbleOutlineIcon fontSize="medium" />
        </IconButton>
        
        <IconButton sx={{ color: "#ffffff" }}>
          <ShareIcon fontSize="medium" />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>{description}</Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }}>
          {likes + (isLiked ? 1 : 0)} Me gusta
        </Typography>
        <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
          {comments} Comentarios
        </Typography>
      </CardContent>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            backgroundColor: '#4caf50',
            color: '#fff',
            '& .MuiAlert-icon': { color: '#fff' }
          }}
        >
          {actionType === "add" ? "❤️ ¡Like agregado!" : "💔 Like eliminado"}
        </Alert>
      </Snackbar>
    </Card>
  );
};