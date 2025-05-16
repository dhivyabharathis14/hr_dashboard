import { ROUTES } from "../../components/constants/routes";
import Login from "../../components/lib/Login/login";

export const publicRoutes = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
];
