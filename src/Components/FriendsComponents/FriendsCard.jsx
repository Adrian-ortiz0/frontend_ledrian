import { useEffect, useState } from "react";
import AxiosConfiguration from "../../AxiosConfiguration";
import { useUser } from "../../UserContext";
import { Button, CircularProgress } from "@mui/material";

export const FriendsCard = ({ usuario }) => {
  const { usuario: loggedUser, actualizarUsuario } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await AxiosConfiguration.get(`/users/${usuario.id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [usuario.id]);

  useEffect(() => {
    setIsFollowing(loggedUser?.followingIds?.includes(usuario.id) || false);
  }, [loggedUser, usuario.id]);

  const handleFollow = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("No se encontró token de autenticación. Por favor, inicia sesión de nuevo.");
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        await AxiosConfiguration.delete(
          `/follows/unfollow?followerId=${loggedUser.id}&followingId=${usuario.id}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setIsFollowing(false);
        actualizarUsuario({
          ...loggedUser,
          followingIds: loggedUser.followingIds.filter((id) => id !== usuario.id),
        });
      } else {
        await AxiosConfiguration.post(
          "/follows",
          {
            usernameFollowedId: usuario.id,
            usernameFollowingId: loggedUser.id,
            date: new Date().toISOString(),
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        setIsFollowing(true);
        actualizarUsuario({
          ...loggedUser,
          followingIds: Array.from(new Set([...loggedUser.followingIds, usuario.id])),
        });
      }
    } catch (error) {
      console.error("Error al seguir/dejar de seguir:", error);
      alert("Hubo un error. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <div className="text-white p-4">Cargando...</div>;
  }

  const profileImagePath = userInfo.photo?.startsWith("http")
    ? userInfo.photo
    : `http://localhost:8083/api/publications/images/${userInfo.photo}`;

  return (
    <div className="bg-[#1e2939] rounded-2xl shadow-lg p-5 w-full max-w-md mx-auto mb-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={profileImagePath || "/default-profile.png"}
            alt={userInfo.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors"
          />
          <div>
            <p className="text-white font-bold text-xl">{userInfo.name}</p>
            <p className="text-gray-300 text-sm">@{userInfo.username}</p>
          </div>
        </div>

        <Button
          onClick={handleFollow}
          variant="contained"
          color={isFollowing ? "error" : "primary"}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            fontSize: "0.9rem",
            borderRadius: "12px",
            px: 3,
            py: 1,
            boxShadow: "none",
            transition: "all 0.3s",
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : isFollowing ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
        </Button>
      </div>
    </div>
  );
};