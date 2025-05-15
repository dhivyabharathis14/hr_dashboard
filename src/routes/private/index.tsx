import EmployeeCardList from "../../components/lib/employee/employee";
import { ROUTES } from "../../components/constants/routes";
import { PrivateLayout } from "../../components/layout/PrivateLayout";
import CompanySwitcher from "../../components/lib/companySwitcher/CompanySwitcher";
import AnnouncementsFeed from "../../components/lib/Announcement/Announcementfeed";

export const privateRoutes = [
  {
    path: ROUTES.BASE_URL,
    element: <PrivateLayout />,
    children: [
      {
        path: ROUTES.BASE_URL,
        element: (
          <>
            <CompanySwitcher />
            <EmployeeCardList />
          </>
        ),
      },
      {
        path: ROUTES.EMPLOYEES,
        element: (
          <>
            <EmployeeCardList />
          </>
        ),
      },
      {
        path: ROUTES.ANNOUNCEMENT,
        element: (
          <>
            <AnnouncementsFeed announcements={[]} />
          </>
        ),
      },
    ],
  },
];
