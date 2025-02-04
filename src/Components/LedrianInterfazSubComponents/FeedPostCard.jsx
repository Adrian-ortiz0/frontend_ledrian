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
  Modal,
  Box,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from "../../UserContext";
import AxiosConfiguration from "../../AxiosConfiguration";

const CommentsModal = ({ open, handleClose, postId, publisherId, onCommentAdded }) => {
  const { usuario } = useUser();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [commentsList, setCommentsList] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      const response = await AxiosConfiguration.get("interations", {
        params: {
          publicationId: postId,
          typeInterationId: 2,
          _expand: "userGiving"
        },
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setCommentsList(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open, postId]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !usuario?.id) return;

      setIsSubmitting(true);
      const payload = {
        publicationId: postId,
        userGivingId: usuario.id,
        userReceivingId: publisherId,
        typeInterationId: 2,
        date: new Date().toISOString(),
        comment: comment.trim(),
      };

      await AxiosConfiguration.post("interations", payload, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setSnackbarMessage("Comentario agregado!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setComment("");
      await fetchComments();
      onCommentAdded();
    } catch (error) {
      console.error("Error agregando comentario:", error);
      setSnackbarMessage("Error al agregar comentario");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="comments-modal"
      aria-describedby="comments-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#1e2939",
          color: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Comentarios</Typography>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ bgcolor: "#3a4a5c", mb: 2 }} />

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Escribe un comentario..."
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="filled"
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#b0b0b0" },
            }}
            sx={{
              backgroundColor: "#334155",
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
            disabled={isSubmitting || !comment.trim()}
            endIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
          >
            Enviar
          </Button>
        </Box>

        <Divider sx={{ bgcolor: "#3a4a5c", mb: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          {loadingComments ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : commentsList.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: "#b0b0b0", textAlign: "center" }}
            >
              Aún no hay comentarios.
            </Typography>
          ) : (
            commentsList.map((comment) => (
              <Box key={comment.id} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                  <Avatar 
                    src={comment.userGiving?.profilePic} 
                    sx={{ width: 24, height: 24 }}
                  />
                  <Typography variant="body2" sx={{ color: "white", fontWeight: 500 }}>
                    {comment.userGiving?.username}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "white", ml: 4 }}>
                  {comment.comment}
                </Typography>
                <Typography variant="caption" sx={{ color: "#b0b0b0", ml: 4, display: "block" }}>
                  {new Date(comment.date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            ))
          )}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={snackbarSeverity}
            sx={{
              backgroundColor:
                snackbarSeverity === "success" ? "#4caf50" : "#f44336",
              color: "#fff",
              "& .MuiAlert-icon": { color: "#fff" },
            }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export const FeedPostCard = ({
  username,
  profilePic,
  imageUrl,
  interations,
  comments: initialComments,
  description,
  date,
  postId,
  publisherId,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [actionType, setActionType] = useState("");
  const [interactionId, setInteractionId] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [optimisticLikes, setOptimisticLikes] = useState(0);
  const [optimisticComments, setOptimisticComments] = useState(initialComments || 0);
  const { usuario } = useUser();

  useEffect(() => {
    const userInteraction = interations?.find(
      (i) => i.typeInterationId === 1 && i.userGivingId === usuario?.id
    );
    setIsLiked(!!userInteraction);
    setInteractionId(userInteraction?.id || null);

    const initialLikes =
      interations?.filter((i) => i.typeInterationId === 1).length || 0;
    setOptimisticLikes(initialLikes);
  }, [interations, usuario?.id]);

  useEffect(() => {
    setOptimisticComments(initialComments);
  }, [initialComments]);

  const handleLikeClick = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken || !usuario?.id) return;

      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setOptimisticLikes((prev) => (newIsLiked ? prev + 1 : prev - 1));
      setActionType(newIsLiked ? "add" : "remove");
      setShowSuccess(true);

      if (newIsLiked) {
        const response = await AxiosConfiguration.post(
          "interations",
          {
            date: new Date().toISOString(),
            publicationId: postId,
            userGivingId: usuario.id,
            userReceivingId: publisherId,
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
      setShowSuccess(false);
    }
  };

  const handleCommentsClick = () => {
    setCommentsOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.01)" },
      }}
    >
      <CardHeader
        avatar={
          <Avatar src={profilePic} alt={username} sx={{ width: 40, height: 40 }} />
        }
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
            transition: "color 0.3s",
          }}
        >
          {isLiked ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderIcon fontSize="medium" />
          )}
        </IconButton>

        <IconButton onClick={handleCommentsClick} sx={{ color: "#ffffff" }}>
          <ChatBubbleOutlineIcon fontSize="medium" />
        </IconButton>

        <IconButton sx={{ color: "#ffffff" }}>
          <ShareIcon fontSize="medium" />
        </IconButton>
      </CardActions>

      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: "#ffffff" }}>
          {optimisticLikes} Me gusta
        </Typography>
        <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
          {optimisticComments} Comentarios
        </Typography>
      </CardContent>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{
            backgroundColor: "#4caf50",
            color: "#fff",
            "& .MuiAlert-icon": { color: "#fff" },
          }}
        >
          {actionType === "add" ? "❤️ ¡Like agregado!" : "💔 Like eliminado"}
        </Alert>
      </Snackbar>

      <CommentsModal
        open={commentsOpen}
        handleClose={() => setCommentsOpen(false)}
        postId={postId}
        publisherId={publisherId}
        onCommentAdded={() => setOptimisticComments(c => c + 1)}
      />
    </Card>
  );
};