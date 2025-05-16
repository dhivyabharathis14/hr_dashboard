import EmployeeCardList from "../../components/lib/employee/employee";
import { ROUTES } from "../../components/constants/routes";
import { PrivateLayout } from "../../components/layout/PrivateLayout";
import CompanySwitcher from "../../components/lib/companySwitcher/CompanySwitcher";
import AnnouncementsFeed from "../../components/lib/Announcement/Announcementfeed";
import EmployeeDetail from "../../components/lib/employee/employeeDetail";
import { ProtectedRoute } from "../../routes/protected/protected";
import EmployeeDirectory from "../../components/lib/employee/employeeToggle";

export const privateRoutes = [
  {
    path: ROUTES.BASE_URL,
    element: <PrivateLayout />,
    children: [
      {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: ROUTES.BASE_URL,
            element: (
              <>
                <CompanySwitcher />
                <EmployeeDirectory />
              </>
            ),
          },
          {
            path: ROUTES.EMPLOYEES,
            element: <EmployeeCardList />,
          },
          {
            path: ROUTES.ANNOUNCEMENT,
            element: <AnnouncementsFeed isAdmin={true} />,
          },
        ],
      },

      {
        element: <ProtectedRoute allowedRoles={["admin", "employee"]} />,
        children: [
          {
            path: `${ROUTES.EMPLOYEES}:id`,
            element: <EmployeeDetail />,
          },
        ],
      },
    ],
  },
];
