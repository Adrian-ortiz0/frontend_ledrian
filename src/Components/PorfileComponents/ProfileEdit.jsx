import React, { useState } from "react";
import { ProfileEditForm } from "./ProfileEditForm";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router";


export const ProfileEdit = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  const navigate = useNavigate();

  const {usuario} = useUser();

  const handleNoti = () => {
    setIsNotificationOpen(true);
  };

  const handleNotiClose = () => {
    setIsNotificationOpen(false);
  };

  return (
    <>
        {/*<SuggestionsSection usuario={usuario} />*/}
        {isNotificationOpen && (
        <ProfileEditForm usuario={usuario} onClose={handleNotiClose}/>
      )}
        </>
  );
};
