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
        const res = await userVerifyToken();
        setAuthenticated(res.data.data.authenticated);
        setRole(res.data.data.role);
      } catch (error) {
        setAuthenticated(false);
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