import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthStore } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const MenuAvatar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { signOut, user } = useAuthStore();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = () => {
    handleCloseUserMenu();
    navigate("/Profile");
  };

  const handleLogOut = () => {
    handleCloseUserMenu();
    signOut();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar
          sx={{ width: 40, height: 40 }}
          alt={`${user.username}`}
          src={user.photoURL}
        />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleNavigate}>
          <Typography sx={{ textAlign: "center" }}>Perfil</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <Typography sx={{ textAlign: "center" }}>Cerrar sesion</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuAvatar;
