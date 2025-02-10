import React, { useState } from "react";
import { useNavigate } from "react-router";
import NotificationsList from "../Nofications/NotificationsList";
import { NavButton } from './MobileAside';

export const NotificationButton = ({usuario}) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    
    const navigate = useNavigate();

    const handleNoti = () => {
        setIsNotificationOpen(true);
      };
    
      const handleNotiClose = () => {
        setIsNotificationOpen(false);
      };

      return (
        <>
        <NavButton
        imagePath="/notification_icon.png"
        altText="Notifications Icon"
        text="Notifications"
        onClick={handleNoti}
      />
      {isNotificationOpen && (
        <NotificationsList onClose={handleNotiClose} usuario={usuario} />
      )}
      </>
      )
    
}
