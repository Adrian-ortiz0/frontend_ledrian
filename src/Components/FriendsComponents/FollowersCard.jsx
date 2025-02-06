import { useEffect, useState } from "react";
import AxiosConfiguration from "../../AxiosConfiguration";
import { useUser } from "../../UserContext";
import { Button, CircularProgress } from "@mui/material";

export const FollowersCard = ({ followerId }) => {
  const { usuario: loggedUser, actualizarUsuario } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await AxiosConfiguration.get(`/users/${followerId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching follower info:", error);
      }
    };

    fetchUserInfo();
  }, [followerId]);

  useEffect(() => {
    setIsFollowing(loggedUser?.followingIds?.includes(followerId));
  }, [loggedUser, followerId]);

  const handleFollow = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("¡Necesitas iniciar sesión!");
      return;
    }

    setIsLoading(true);

    try {
      if (isFollowing) {
        await AxiosConfiguration.delete(
          `/follows/unfollow?followerId=${loggedUser.id}&followingId=${followerId}`,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        actualizarUsuario({
          ...loggedUser,
          followingIds: loggedUser.followingIds.filter(id => id !== followerId),
        });
      } else {
        await AxiosConfiguration.post(
          "/follows",
          {
            usernameFollowedId: followerId,
            usernameFollowingId: loggedUser.id,
            date: new Date().toISOString(),
          },
          { headers: { Authorization: `Bearer ${authToken}` } }
        );

        actualizarUsuario({
          ...loggedUser,
          followingIds: [...loggedUser.followingIds, followerId],
        });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error al gestionar seguimiento:", error);
      alert("Error en la operación");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) return <div className="text-white p-4">Cargando...</div>;

  return (
    <div className="bg-[#1E1E1E] rounded-2xl shadow-lg p-5 w-full max-w-md mx-auto mb-6 transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={userInfo.photo || "/default-profile.png"}
            alt={userInfo.username}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 hover:border-gray-500 transition-all"
          />
          <div>
            <p className="text-white font-semibold text-lg">{userInfo.name}</p>
            <p className="text-gray-400 text-sm">@{userInfo.username}</p>
          </div>
        </div>

        <Button
          onClick={handleFollow}
          variant="contained"
          color={isFollowing ? "error" : "primary"}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            fontSize: "0.875rem",
            borderRadius: "12px",
            px: 2.5,
            py: 1,
            transition: "all 0.3s",
          }}
        >
          {isLoading ? <CircularProgress size={22} color="inherit" /> : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    </div>
  );
};
