import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import noPhoto from "../images/noPhoto.jpg";

export default function BplaCard({
  title,
  idBpla,
  preview = noPhoto,
  children,
}) {
  const navigate = useNavigate();

  function handleClickDetail() {
    navigate("/detail/" + idBpla);
  }

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardActionArea sx={{ height: "100%" }}>
        <CardMedia
          onClick={handleClickDetail}
          component="img"
          height={"230rem"}
          image={preview}
          alt="preview"
          sx={{ objectFit: "contain", p: 1 }}
        />
        <CardContent
          onClick={handleClickDetail}
          sx={{
            m: 0.5,
            height: "13rem",
            overflow: "hidden",
            border: "1px solid rgba(10, 10, 10, 0.05)",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ m: "0 0 2rem auto" }}>
        <Button size="small" color="primary" onClick={handleClickDetail}>
          Детальніше
        </Button>
      </CardActions>
    </Card>
  );
}
