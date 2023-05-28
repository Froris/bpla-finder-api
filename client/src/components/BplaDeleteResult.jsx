import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function BplaDeleteResult({ deleteResult }) {
  const navigate = useNavigate();

  function handleOnBackHome() {
    navigate("/");
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4, pt: 10, minHeight: "calc(100vh - 12rem)" }}
    >
      <Paper
        variant="outlined"
        sx={{ mt: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="left">
          {deleteResult.message}
        </Typography>
        <Button variant="contained" onClick={handleOnBackHome} sx={{ mt: 5 }}>
          На головну
        </Button>
      </Paper>
    </Container>
  );
}

export default BplaDeleteResult;
