import React, { useRef } from "react";
import AxiosConfiguration from "../../AxiosConfiguration"; 
import { useUser } from "../../UserContext";

export const ProfilePhotoUpdate = () => {
  const fileInputRef = useRef(null);
  const { usuario, actualizarUsuario } = useUser();

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      AxiosConfiguration.patch(`/users/${usuario.id}/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
      })
        .then((response) => {
          const updatedPhoto = response.data.photo;
          actualizarUsuario({ ...usuario, photo: updatedPhoto });
        })
        .catch((error) => {
          console.error("Error al actualizar la foto de perfil:", error);
        });
    }
  };

  return (
    <div>
      <img
        src={`http://localhost:8083/api/publications/images/${usuario.photo}`}
        alt="Foto de perfil"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
        accept="image/*"
      />
    </div>
  );
};
