import React, {useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import {Button, Container} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ModeSwitch from "./ModeSwitch";
import LogoutIcon from "@mui/icons-material/Logout";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Divider from "@mui/material/Divider";

import {AuthContext} from "../context/context";
import SearchInput from "./SearchInput";
import MobileMenu from "./MobileMenu";
import Logo from "./Logo";

const mobileMenuId = "primary-search-account-menu-mobile";

export default function Navbar({displaySearch = true}) {
	const navigate = useNavigate();
	const location = useLocation();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const {logout, isAuthenticated} = useContext(AuthContext);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	function handleCompareClick() {
	}

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
			<Box sx={{flexGrow: 1}}>
				<AppBar position="fixed">
					<Container maxWidth="lg">
						<Toolbar>
							<Logo onClick={handleClickHome}/>

							{displaySearch && (
									<Box sx={{flexGrow: 1}}>
										<SearchInput/>
									</Box>
							)}

							<Box
									sx={{
										display: {xs: "none", md: "flex"},
										ml: "auto",
										flexDirection: "row",
										alignItems: "center",
									}}
							>
								{isAuthenticated && location.pathname !== "/create" && (
										<>
											<Button
													onClick={handleClickAddNewBpla}
													color="secondary"
													type="button"
													sx={{p: "10px"}}
													aria-label="search"
											>
												<AddRoundedIcon sx={{mr: "0.5rem"}}/>
												<Typography variant="button">додати БПЛА</Typography>
											</Button>
											<Divider
													orientation="vertical"
													flexItem
													sx={{backgroundColor: "#adadad"}}
											/>
										</>
								)}

								<Box mx={".5rem"}>
									<ModeSwitch/>
								</Box>

								{isAuthenticated && (
										<>
											<Divider
													orientation="vertical"
													flexItem
													sx={{backgroundColor: "#adadad"}}
											/>

											<Button
													onClick={handleClickLogout}
													color="secondary"
													type="button"
													sx={{p: "10px", ml: "1.5rem"}}
													aria-label="search"
											>
												<Typography variant="button">log out</Typography>
												<LogoutIcon sx={{ml: "0.5rem"}}/>
											</Button>
										</>
								)}
							</Box>

							<Box ml='auto' sx={{display: {xs: "flex", md: "none"}}}>
								<IconButton
										size="large"
										aria-label="show more"
										aria-controls={mobileMenuId}
										aria-haspopup="true"
										onClick={handleMobileMenuOpen}
										color="inherit"
								>
									<MenuRoundedIcon/>
								</IconButton>
							</Box>

							<MobileMenu
									pathname={location.pathname}
									badgeContent={4}
									isMobileMenuOpen={isMobileMenuOpen}
									isAuthenticated={isAuthenticated}
									mobileMenuId={mobileMenuId}
									mobileMoreAnchorEl={mobileMoreAnchorEl}
									handleCompareClick={handleCompareClick}
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
