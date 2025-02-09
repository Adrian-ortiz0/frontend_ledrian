import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NavButton } from './MobileAside';


export const LogOutButton = () => {

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("usuario");
        localStorage.removeItem("authToken");
        navigate("/login");
      };

    return (
        <>
        <NavButton
        imagePath="/logout_icon.png"
        altText="Log out Icon"
        text="Log Out"
        onClick={handleLogout}
      />
      </>
      )
}