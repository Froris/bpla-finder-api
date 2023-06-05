import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useFormData } from "./hooks/formData.hook";

export function useRoutes(isAuthenticated) {
  const { FormProvider } = useFormData();

  return (
    <>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/login" exact element={<AuthPage />} />
        <Route
          path="/detail/:id"
          element={
            <FormProvider>
              <DetailPage />
            </FormProvider>
          }
        />
        <Route
          path="/create"
          exact
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FormProvider>
                <CreatePage />
              </FormProvider>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
