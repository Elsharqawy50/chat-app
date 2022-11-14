import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Register, NOT_FOUND } from "./Constants";
import HomePage from "../Pages/Home";
import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";
import NotFoundPage from "../Pages/NotFound";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={Home} element={<HomePage />} />
      <Route path={Login} element={<LoginPage />} />
      <Route path={Register} element={<RegisterPage />} />
      <Route path={NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
