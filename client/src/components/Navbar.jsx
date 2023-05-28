import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Box from "@mui/material/Box";
import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ModeSwitch from "./ModeSwitch";
import LogoutIcon from "@mui/icons-material/Logout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreIcon from "@mui/icons-material/MoreVert";

import logoImage from "../images/logo.png";
import { AuthContext } from "../context/context";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";

const mobileMenuId = "primary-search-account-menu-mobile";

export default function Navbar({ displaySearch = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { logout, isAuthenticated } = useContext(AuthContext);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleClickHome() {
    navigate("/");
  }

  function handleClickAddNewBpla() {
    navigate("/create");
  }

  function handleClickLogout() {
    logout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="lg">
          <Toolbar>
            <Box
              onClick={handleClickHome}
              sx={{
                mr: "1rem",
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
            >
              <img src={logoImage} alt="logo" style={{ height: "3rem" }} />
            </Box>
            <Typography
              onClick={handleClickHome}
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: "3rem",
                display: { xs: "none", sm: "block" },
                cursor: "pointer",
              }}
            >
              БПЛА
            </Typography>

            {displaySearch && <SearchInput />}

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                ml: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {isAuthenticated && location.pathname !== "/create" && (
                <Button
                  onClick={handleClickAddNewBpla}
                  color="secondary"
                  type="button"
                  sx={{ p: "10px", ml: "1.5rem" }}
                  aria-label="search"
                >
                  <AddRoundedIcon sx={{ mr: "0.5rem" }} />
                  <Typography variant="button">додати БПЛА</Typography>
                </Button>
              )}

              <ModeSwitch />

              {isAuthenticated && (
                <Button
                  onClick={handleClickLogout}
                  color="secondary"
                  type="button"
                  sx={{ p: "10px", ml: "1.5rem" }}
                  aria-label="search"
                >
                  <Typography variant="button">log out</Typography>
                  <LogoutIcon sx={{ ml: "0.5rem" }} />
                </Button>
              )}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>

            <MobileMenu
              pathname={location.pathname}
              isMobileMenuOpen={isMobileMenuOpen}
              isAuthenticated={isAuthenticated}
              mobileMenuId={mobileMenuId}
              mobileMoreAnchorEl={mobileMoreAnchorEl}
              handleLogout={handleClickLogout}
              handleMobileMenuClose={handleMobileMenuClose}
              handleAddNewBpla={handleClickAddNewBpla}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
