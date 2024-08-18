import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const authMiddleware = (Component) => {
  return (props) => {
    const location = useLocation();
    const [authStatus, setAuthStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyAuth = async () => {
      try {
        const response = await userVerifyToken();
        setAuthStatus(response.data);
      } catch (error) {
        setAuthStatus({ authenticated: false });
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      verifyAuth();
    }, []);

    if (loading) {
      return "";
    }

    if (!authStatus.authenticated) {
      if (location.pathname.startsWith("/professor") || authStatus.role === "professor") {
        return <Navigate to={"/professor/login"} replace />;
      } else if (location.pathname.startsWith("/admin") || authStatus.role === "admin") {
        return <Navigate to={"/admin/login"} replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    } else {
      if (location.pathname.startsWith("/professor") && authStatus.role === "professor") {
        return <Component {...props} />
      } else if (location.pathname.startsWith("/admin") && authStatus.role === "admin") {
        return <Component {...props} />
      } else if (location.pathname.startsWith("/") && authStatus.role === "student") {
        return <Component {...props} />
      } else {
        if (location.pathname.startsWith("/professor")) {
          return <Navigate to={"/professor/login"} replace />;
        } else if (location.pathname.startsWith("/admin")) {
          return <Navigate to={"/admin/login"} replace />;
        } else {
          return <Navigate to="/login" replace />;
        }
      }
    }
  };
};

export default authMiddleware;