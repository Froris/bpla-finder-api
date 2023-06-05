import React from "react";
import logoImage from "../images/logo.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function Logo({ onClick }) {
  return (
    <Box display="flex" alignItems="center">
      <Box
        onClick={onClick}
        sx={{
          mr: "1rem",
          display: { xs: "none", sm: "block" },
          cursor: "pointer",
        }}
      >
        <img src={logoImage} alt="logo" style={{ height: "3rem" }} />
      </Box>
      <Typography
        onClick={onClick}
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
    </Box>
  );
}

export default Logo;
