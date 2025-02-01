import { useEffect, useState } from "react";
import AxiosConfiguration from "../../AxiosConfiguration";
import { useUser } from "../../UserContext"; 

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
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [usuario.id]);

  useEffect(() => {
    if (loggedUser && loggedUser.followingIds && loggedUser.followingIds.includes(usuario.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
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
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setIsFollowing(false);
        const newFollowingIds = loggedUser.followingIds.filter((id) => id !== usuario.id);
        const updatedLoggedUser = {
          ...loggedUser,
          followingIds: newFollowingIds,
        };
        actualizarUsuario(updatedLoggedUser);
        alert("¡Has dejado de seguir al usuario!");
      } else {
        await AxiosConfiguration.post(
          "/follows",
          {
            usernameFollowedId: usuario.id,
            usernameFollowingId: loggedUser.id,
            date: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setIsFollowing(true);
        const newFollowingIds = Array.from(new Set([...loggedUser.followingIds, usuario.id]));
        const updatedLoggedUser = {
          ...loggedUser,
          followingIds: newFollowingIds,
        };
        actualizarUsuario(updatedLoggedUser);
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
    <div className="bg-[#262626] rounded-lg shadow-lg p-4 w-full max-w-md mx-auto mb-4">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        {userInfo.name}
      </h2>
      <div className="space-y-4">
        <div className="bg-[#333333] rounded-lg p-6 flex flex-col items-center justify-center space-y-4">
          <img
            src={userInfo.photo || "/public/profile_icon.png"}
            alt={userInfo.username}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-center">
            <p className="text-white font-medium">{userInfo.name}</p>
            <p className="text-gray-400 text-sm">@{userInfo.username}</p>
          </div>
          <button
            onClick={handleFollow}
            disabled={isLoading}
            className={`w-full max-w-[200px] text-sm px-4 py-2 rounded-lg transition-colors ${
              isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-[#555555] hover:bg-[#666666]"
            } text-white ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Cargando..." : isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
};