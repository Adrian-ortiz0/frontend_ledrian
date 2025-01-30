import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export const NavProfile = ({ usuario }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('authToken');

    handleClose();

    navigate("/login");
  };

  return (
    <div className='nav_profile-container'>
      <img src={usuario.photo} alt="profile icon" width={40} height={40} />
      <button>
        {usuario.username}
        <IconButton onClick={handleClick} aria-controls='profile-menu' aria-haspopup='true'>
          <MoreVertIcon />
        </IconButton>
      </button>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </div>
  );
};