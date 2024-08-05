import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const authMiddleware = (Component) => {
  return (props) => {
    const location = useLocation();
    const [authStatus, setAuthStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const verifyAuth = async () => {
        try {
          const response = await axiosInstance.get("/user/verifyToken");
          setAuthStatus(response.data);
        } catch (error) {
          setAuthStatus({ authenticated: false });
        } finally {
          setLoading(false);
        }
      };
      verifyAuth();
    }, [location.pathname]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authStatus.authenticated) {
      if (location.pathname.startsWith(import.meta.env.VITE_PROFESSOR_PATH) && authStatus.role === "professor") {
        return <Navigate to={import.meta.env.VITE_PROFESSOR_PATH_LOGIN} replace />;
      } else if (location.pathname.startsWith(import.meta.env.VITE_ADMIN_PATH) && authStatus.role === "admin") {
        return <Navigate to={import.meta.env.VITE_ADMIN_PATH_LOGIN} replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    }

    return <Component {...props} />;
  };
};

export default authMiddleware;