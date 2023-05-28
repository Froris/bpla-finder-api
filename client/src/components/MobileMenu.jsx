import React from "react";
import { Button, MenuItem, Menu, Typography, Box } from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import LogoutIcon from "@mui/icons-material/Logout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function MobileMenu({
  pathname,
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  isAuthenticated,
  handleLogout,
  handleMobileMenuClose,
  handleAddNewBpla,
}) {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated && pathname !== "/create" && (
        <MenuItem>
          <Button
            fullWidth
            onClick={handleAddNewBpla}
            color="primary"
            type="button"
            aria-label="search"
          >
            <AddRoundedIcon sx={{ mr: "0.5rem" }} />
            <Typography variant="button">додати БПЛА</Typography>
          </Button>
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem>
          <Button
            onClick={handleLogout}
            color="primary"
            type="button"
            aria-label="search"
          >
            <LogoutIcon sx={{ mr: "0.5rem" }} />
            <Typography variant="button">log out</Typography>
          </Button>
        </MenuItem>
      )}
      <MenuItem onClick={handleMobileMenuClose}>
        <Box mx="auto" mt={2}>
          <ModeSwitch />
        </Box>
      </MenuItem>
    </Menu>
  );
}

export default MobileMenu;
