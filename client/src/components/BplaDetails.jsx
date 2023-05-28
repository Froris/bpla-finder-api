import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";

import ImagesCarousel from "../components/ImagesCarousel";
import useBplaServer from "../hooks/bplaServer.hook";
import { Box, Button, Paper, createTheme } from "@mui/material";
import RadarChart from "../components/RadarChart";
import Loader from "../components/Loader";
import ListParameters from "../components/ListParameters";
import DetailInfoBlock from "../components/DetailInfoBlock";

import { FormContext } from "../context/formContext";
import { loadImagesAsFiles } from "../helpers";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      _800: 800,
    },
  },
});

const skipedListParams = [
  "_name",
  "model",
  "shortDescription",
  "description",
  "sourceUrl",
  "vendor",
];

export default function BplaDetails({ setActiveStep, setDeleteResult }) {
  // NEW
  const navigate = useNavigate();
  const { states, setIsEditing } = useContext(FormContext);
  /////////////////////////////////////////////////////////////

  const [data, setData] = useState(null);
  const [chartValues, setChartValues] = useState([]);
  const { getBplaId, deleteBplaById, isLoading } = useBplaServer();
  const bplaId = useParams().id;
  const wrapBreakpoint = theme.breakpoints.down("_800");

  // NEW
  async function handleEdit() {
    setIsEditing(true);
    const convertedData = await loadImagesAsFiles(data.photos);

    states.current = {
      ...data,
      photos: convertedData,
      images: [...data.photos],
    };

    navigate("/create");
  }

  function handleDelete() {
    deleteBplaById(bplaId)
      .then((result) => {
        setDeleteResult(result);
        setActiveStep(1);
      })
      .catch((err) => {
        setDeleteResult(err);
        setActiveStep(1);
      });
  }
  //////////////////////

  async function getBpla() {
    setData(await getBplaId(bplaId));
  }

  useEffect(() => {
    getBpla();
  }, []);

  useEffect(() => {
    if (data) {
      setChartValues(BuildCartValues(data));
    }
  }, [data]);

  function BuildCartValues(baseData) {
    let values = [{ label: "", data: 0, enabled: true }];
    const whoIncluding = [
      { key: "flightRange", label: "Макс. Дальність польоту", enabled: true },
      { key: "wingspan", label: "Розмах крил", enabled: true },
      { key: "maxFlyWeight", label: "Злітна маса", enabled: true },
      { key: "payloadWeight", label: "Корисне навантаження", enabled: true },
      { key: "maxSpeed", label: "Максимальна швидкіть", enabled: true },
      { key: "cruiseSpeed", label: "Крейсерна швидкіть", enabled: true },
      { key: "maxFlyHeight", label: "Макс. висота польоту", enabled: true },
      { key: "heightOfUse", label: "Операційна висота", enabled: true },
      { key: "flyDuration", label: "Тривалість польоту", enabled: true },
    ];

    values = [];
    for (let parameter of whoIncluding) {
      if (baseData[parameter.key]) {
        values.push({
          label: parameter.label,
          data: baseData[parameter.key],
          enabled: parameter.enabled,
        });
      }
    }

    return values;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Paper sx={{ minHeight: "calc(100vh - 5rem)", mt: "4.5rem" }}>
      {!isLoading && (
        <>
          <Box
            sx={{
              display: "flex",
              [wrapBreakpoint]: {
                flexWrap: "wrap",
              },
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <ImagesCarousel
              images={data.photos}
              elevation={0}
              displayNavText={false}
            />
            <DetailInfoBlock
              name={data._name}
              model={data.model}
              shortDescription={data.shortDescription}
              description={data.description}
              sourceUrl={data.sourceUrl}
              vendor={data.vendor}
            />
          </Box>
          {/*NEW*/}
          <Box mx={2} my={2}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              EDIT
            </Button>
          </Box>
          <Box mx={2} my={2}>
            <Button variant="contained" color="primary" onClick={handleDelete}>
              DELETE
            </Button>
          </Box>

          <ListParameters datas={data} skipParameters={skipedListParams} />

          {chartValues.length !== 0 && <RadarChart init={chartValues} />}
        </>
      )}
    </Paper>
  );
}
