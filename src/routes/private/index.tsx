import React, { lazy } from "react";
import { ROUTES } from "../../components/constants/routes";
import { PrivateLayout } from "../../components/layout/PrivateLayout";
import { ProtectedRoute } from "../../routes/protected/protected";
import { Suspense } from "../../components/provider/Suspense";

const EmployeeCardList = lazy(
  () => import("../../components/lib/employee/employee")
);
const CompanySwitcher = lazy(
  () => import("../../components/lib/companySwitcher/CompanySwitcher")
);
const AnnouncementsFeed = lazy(
  () => import("../../components/lib/Announcement/Announcementfeed")
);
const EmployeeDetail = lazy(
  () => import("../../components/lib/employee/employeeDetail")
);
const EmployeeDirectory = lazy(
  () => import("../../components/lib/employee/employeeToggle")
);

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
              <Suspense fallback={<div>Loading Dashboard...</div>}>
                <>
                  <CompanySwitcher />
                  <EmployeeDirectory />
                </>
              </Suspense>
            ),
          },
          {
            path: ROUTES.EMPLOYEES,
            element: (
              <Suspense fallback={<div>Loading Employees...</div>}>
                <EmployeeCardList />
              </Suspense>
            ),
          },
          {
            path: ROUTES.ANNOUNCEMENT,
            element: (
              <Suspense fallback={<div>Loading Announcements...</div>}>
                <AnnouncementsFeed isAdmin={true} />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <ProtectedRoute allowedRoles={["admin", "employee"]} />,
        children: [
          {
            path: `${ROUTES.EMPLOYEES}:id`,
            element: (
              <Suspense fallback={<div>Loading Employee Details...</div>}>
                <EmployeeDetail />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
];
