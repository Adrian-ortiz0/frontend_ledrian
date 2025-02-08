import React, { useEffect, useState } from "react";
import AxiosConfiguration from "../../AxiosConfiguration";
import { useUser } from "../../UserContext";

const MiniHistory = ({ followerId, size = 70 }) => {
  const [userInfo, setUserInfo] = useState(null);

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

    if (followerId) {
      fetchUserInfo();
    }
  }, [followerId]);

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center">
        <div
          style={{ width: size, height: size }}
          className="bg-gray-200 rounded-full"
        ></div>
        <p className="mt-2 text-sm text-gray-500">Cargando...</p>
      </div>
    );
  }

  const profileImagePath = userInfo.photo?.startsWith("http")
    ? userInfo.photo
    : `http://localhost:8080/ledrian-0.0.1-SNAPSHOT/api/publications/images/${userInfo.photo}`;

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ width: size, height: size }}
        className="rounded-full overflow-hidden border-2 border-gray-300 transform transition duration-300 hover:scale-105"
      >
        <img
          src={profileImagePath || "/default-profile.png"}
          alt={userInfo.username}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-2 text-sm text-white">{userInfo.username}</p>
    </div>
  );
};

export const Stories = () => {
  const { usuario } = useUser();
  // Suponemos que followersIds es un arreglo de IDs de seguidores
  const followersIds = usuario?.followersIds || [];
  const visibleItems = 3;
  const [startIndex, setStartIndex] = useState(0);

  // Calcula el slice de seguidores que se van a mostrar
  const visibleFollowers = followersIds.slice(startIndex, startIndex + visibleItems);

  // Función para avanzar el carrusel
  const handleNext = () => {
    if (startIndex + visibleItems < followersIds.length) {
      setStartIndex(startIndex + 1);
    }
  };

  // Función para retroceder el carrusel
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Botón para retroceder */}
      {startIndex > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition"
        >
          &lt;
        </button>
      )}

      {/* Contenedor de los MiniHistory visibles */}
      <div className="flex gap-4">
        {visibleFollowers.map((followerId) => (
          <MiniHistory key={followerId} followerId={followerId} />
        ))}
      </div>

      {/* Botón para avanzar */}
      {startIndex + visibleItems < followersIds.length && (
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 transition"
        >
          &gt;
        </button>
      )}
    </div>
  );
};
