import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Home, Login, Register, NOT_FOUND } from "./Constants";
import { useSelector } from "react-redux";
import PageLoading from "components/UI/PageLoading";

const HomePage = React.lazy(() => import("Pages/Home"));
const LoginPage = React.lazy(() => import("Pages/Login"));
const RegisterPage = React.lazy(() => import("Pages/Register"));
const NotFoundPage = React.lazy(() => import("Pages/NotFound"));

// helper func to add Suspense for all pages
const SuspenseFunc = (Component) => {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component />
    </React.Suspense>
  );
};

const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);

  // check if user is logged in can see the home page, otherwise can see the login page
  const ReqAuth = () => {
    if (!Object.keys(user).length) {
      return <Navigate to={Login} />;
    } else {
      return <Outlet />;
    }
  };

  // check if user isn't logged route to the login page
  const NotReqAuth = () => {
    if (Object.keys(user).length) {
      return <Navigate to={Home} />;
    } else {
      return <Outlet />;
    }
  };

  return (
    <Routes>
      <Route element={<ReqAuth />}>
        <Route path={Home} element={SuspenseFunc(HomePage)} />
      </Route>

      <Route element={<NotReqAuth />}>
        <Route path={Login} element={SuspenseFunc(LoginPage)} />
        <Route path={Register} element={SuspenseFunc(RegisterPage)} />
      </Route>

      <Route path={NOT_FOUND} element={SuspenseFunc(NotFoundPage)} />
    </Routes>
  );
};

export default AppRouter;
