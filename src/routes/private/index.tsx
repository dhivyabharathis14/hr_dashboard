import { ROUTES } from "../../components/constants/routes";
import { PrivateLayout } from "../../components/layout/PrivateLayout";
import CompanySwitcher from "../../components/lib/companySwitcher/CompanySwitcher";

export const privateRoutes = [
  {
    path: ROUTES.BASE_URL,
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <CompanySwitcher />,
      },
    ],
  },
];
