import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../shared/providers/auth";
import { ROUTES } from "../../components/constants/routes";

export const ProtectedRoute = ({
  allowedRoles,
}: {
  allowedRoles: string[];
}) => {
  const { userRole } = useAuth();

  if (!userRole) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <div className="text-center mt-10 text-red-500">Access Denied</div>;
  }

  return <Outlet />;
};
