import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { userVerifyToken } from "../api/user/userAPI";

const authMiddleware = (Component) => {
  return (props) => {
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    const verifyAuth = async () => {
      try {
        const { data } = await userVerifyToken();
        setAuthenticated(data.authenticated);
        setRole(data.role);
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
      return null;
    }
    
    if (!authenticated) {
      if (pathname.startsWith("/admin")) return <Navigate to="/admin/login" replace />;
      if (pathname.startsWith("/professor")) return <Navigate to="/professor/login" replace />;
      return <Navigate to="/login" replace />;
    }
    if (role === "admin" && !pathname.startsWith("/admin")) {
      return <Navigate to="/admin" replace />;
    }
    if (role === "professor" && !pathname.startsWith("/professor")) {
      return <Navigate to="/professor" replace />;
    }
    if (role === "student") {
      if (pathname.startsWith("/admin") || pathname.startsWith("/professor")) {
        return <Navigate to="/" replace />;
      }
    }
    return <Component {...props} />;
  };
};

export default authMiddleware;