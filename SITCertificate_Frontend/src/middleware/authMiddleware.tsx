import { useEffect, useState } from "react";
import { Navigate, useLocation, Location } from "react-router-dom";
import { userVerifyToken } from "../apis/userAPI";

interface AuthMiddlewareProps {
  [key: string]: any;
}

const authMiddleware = (Component: React.ComponentType<AuthMiddlewareProps>) => {
  return (props: AuthMiddlewareProps) => {
    const { pathname }: Location = useLocation();
    const [loading, setLoading] = useState<boolean>(true);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [role, setRole] = useState<string | null>(null);

    const verifyAuth = async () => {
      try {
        const res = await userVerifyToken();
        if ('data' in res) {
          setAuthenticated(res.data.data.authenticated);
          setRole(res.data.data.role);
        } else {
          setAuthenticated(res.authenticated);
        }
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
    if (role === "student" && (pathname.startsWith("/admin") || pathname.startsWith("/professor"))) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };
};

export default authMiddleware;
