import React from "react";

import { Container } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "../components/Navbar";

import BplaDetails from "../components/BplaDetails";
import BplaDeleteResult from "../components/BplaDeleteResult";

function StepContent({
  activeStep,
  setActiveStep,
  setDeleteResult,
  deleteResult,
  ...props
}) {
  switch (activeStep) {
    case 0:
      return (
        <BplaDetails
          setActiveStep={setActiveStep}
          setDeleteResult={setDeleteResult}
          {...props}
        />
      );
    case 1:
      return <BplaDeleteResult deleteResult={deleteResult} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function DetailPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [deleteResult, setDeleteResult] = React.useState(0);

  return (
    <>
      <Navbar displaySearch={false} />
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <StepContent
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setDeleteResult={setDeleteResult}
          deleteResult={deleteResult}
        />
      </Container>
    </>
  );
}
