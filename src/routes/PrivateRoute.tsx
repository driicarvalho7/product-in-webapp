import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  component: React.ComponentType;
}

interface DecodedToken {
  exp: number;
}

function isTokenValid(token: string): boolean {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const token = Cookies.get("auth_token");

  if (!token || !isTokenValid(token)) {
    return <Navigate to="/auth" />;
  }

  return <Component />;
}

export default PrivateRoute;
