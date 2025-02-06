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
        alert("¡Has dejado de seguir al usuario!");
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
        alert("¡Usuario seguido con éxito!");
      }
    } catch (error) {
      console.error("Error al seguir/dejar de seguir:", error);
      alert("Hubo un error. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <p className="text-white text-center">Cargando...</p>;
  }

  return (
    <div className="bg-[#1e1e1e] rounded-2xl shadow-md p-6 w-full max-w-md mx-auto mb-6 border border-gray-700 transition-transform hover:scale-105">
      <div className="flex flex-col items-center">
        <img
          src={userInfo.photo || "/public/profile_icon.png"}
          alt={userInfo.username}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-500 shadow-md"
        />
        <h2 className="text-white text-lg font-semibold mt-4">{userInfo.name}</h2>
        <p className="text-gray-400 text-sm">@{userInfo.username}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          variant="contained"
          color={isFollowing ? "error" : "primary"}
          onClick={handleFollow}
          disabled={isLoading}
          className="w-full max-w-[200px] rounded-lg"
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>
    </div>
  );
};
