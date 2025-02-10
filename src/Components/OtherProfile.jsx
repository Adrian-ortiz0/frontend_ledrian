import React, { useEffect, useState } from "react";
import { SuggestionsSection } from "./LedrianInterfazSubComponents/SuggestionsSection";
import { AsideProfile } from "./LedrianInterfazSubComponents/AsideProfile";
import { useUser } from "../UserContext";
import { OtherProfileFeed } from "./OtherProfileComponents/OtherProfileFeed";
import AxiosConfiguration from "../AxiosConfiguration";
import { useParams } from "react-router";
import { MobileNavBar } from "./Mobile/MobileAside";

export const OtherProfile = () => {
  const {usuario} = useUser();
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('authToken');

    AxiosConfiguration.get(`users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setSelectedUser(response.data); 
      })
      .catch((error) => {
        console.error('Error obteniendo el perfil del usuario:', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, [id]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>Error al cargar el perfil.</p>;
  }

  if (!selectedUser) {
    return <p>Usuario no encontrado.</p>;
  }

  return (

    <>
    <div className="h-screen bg-gray-100 hidden lg:grid lg:grid-cols-[1fr_4fr_1fr]">
      <AsideProfile usuario={usuario} /> 
      <OtherProfileFeed usuario={selectedUser} otroUsuario={usuario} /> 
      <SuggestionsSection usuario={usuario} />
    </div>
      <div className='lg:hidden flex flex-col justify-between h-screen'>
      <OtherProfileFeed usuario={selectedUser} />
      <MobileNavBar usuario={usuario}/>
      </div>
    </>
  );
};