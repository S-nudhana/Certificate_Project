import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const authMiddleware = (Component) => {
  return (props) => {
    const location = useLocation();
    const isLoggedIn = Cookies.get("token") !== undefined;
    const isProfLoggedIn = Cookies.get("profToken") !== undefined;
    const isAdminLoggedIn = Cookies.get("adminToken") !== undefined;

    // if (location.pathname.startsWith(import.meta.env.VITE_PROFESSOR_PATH)) {
    //   if (!isProfLoggedIn) {
    //     return (
    //       <Navigate to={import.meta.env.VITE_PROFESSOR_PATH_LOGIN} replace />
    //     );
    //   }
    // } else if (location.pathname.startsWith(import.meta.env.VITE_ADMIN_PATH)) {
    //   if (!isAdminLoggedIn) {
    //     return <Navigate to={import.meta.env.VITE_ADMIN_PATH_LOGIN} replace />;
    //   }
    // } else {
    //   if (!isLoggedIn) {
    //     return <Navigate to="/login" replace />;
    //   }
    // }
    return <Component {...props} />;
  };
};

export default authMiddleware;
