import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  component: React.ComponentType;
}

function PrivateRoute({ component: Component }: PrivateRouteProps) {
  const token = Cookies.get("auth_token");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return <Component />;
}

export default PrivateRoute;
