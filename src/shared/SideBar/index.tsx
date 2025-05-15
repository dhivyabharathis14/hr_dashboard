import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import spinner from "../../assets/home.svg";
import { ROUTES } from "../../components/constants/routes";
import CompanySwitcher from "../../components/lib/companySwitcher/CompanySwitcher";
import { useSelector } from "react-redux";
import { RootState } from "~/store";

interface Props {
  expanded: boolean;
}

export const Sidebar = ({ expanded }: Props) => {
  const [activeKey, onSetActiveKey] = useState("home");
  const navigate = useNavigate();
  const { selectedCompany } = useSelector((state: RootState) => state.company);

  const onNavigateTo = (to: string, key: string) => {
    onSetActiveKey(key);
    navigate(to);
  };

  return (
    <div
      className={`fixed inset-y-0 z-40 mt-0 flex flex-col border-r bg-white pt-[60px] shadow-md transition-all duration-300 ease-in-out ${
        expanded ? "w-60" : "w-20"
      }`}>
      {/* Top Header Branding */}
      <div
        className={`fixed top-0 z-50 flex h-[60px] items-center border-b border-gray-200 bg-blue-600 text-white ${
          expanded ? "w-60 px-5 justify-between" : "w-20 px-4 justify-center"
        }`}>
        <Link
          to={ROUTES.BASE_URL}
          className="flex items-center gap-2 text-lg font-semibold">
          <img src={spinner} alt="HR" width={24} height={24} />
          {expanded && <span>HR DASHBOARD</span>}
        </Link>
      </div>

      <div className={`flex-1 p-2.5 overflow-y-auto`}>
        {/* Company Dropdown */}
        {expanded && <CompanySwitcher />}

        <Sidenav
          expanded={expanded}
          appearance="subtle"
          className="sidebar-nav !text-sm !text-black py-5">
          <Sidenav.Body>
            <Nav
              activeKey={activeKey}
              onSelect={onSetActiveKey}
              className="flex flex-col gap-1">
              {/* Home */}
              <Nav.Item
                eventKey="home"
                icon={
                  <img
                    src={spinner}
                    alt="Home"
                    className="rs-sidenav-item-icon scale-125"
                    width={20}
                    height={20}
                  />
                }
                onClick={() => onNavigateTo(ROUTES.BASE_URL, "home")}
                className={`flex items-center gap-4 rounded-md px-2 py-2 text-gray-800 transition hover:bg-blue-100 ${
                  activeKey === "home"
                    ? "bg-blue-100 font-semibold text-blue-600"
                    : ""
                }`}>
                {expanded && <span className="text-[16px]">Home</span>}
              </Nav.Item>

              {/* Items visible when company is selected */}
              {selectedCompany && (
                <>
                  <Nav.Item
                    eventKey="employees"
                    icon={
                      <img
                        src={spinner}
                        alt="Employees"
                        className="rs-sidenav-item-icon scale-125"
                        width={20}
                        height={20}
                      />
                    }
                    onClick={() => onNavigateTo(ROUTES.EMPLOYEES, "employees")}
                    className={`flex items-center gap-4 rounded-md px-2 py-2 text-gray-800 transition hover:bg-blue-100 ${
                      activeKey === "employees"
                        ? "bg-blue-100 font-semibold text-blue-600"
                        : ""
                    }`}>
                    {expanded && (
                      <span className="text-[16px]">Employees List</span>
                    )}
                  </Nav.Item>

                  <Nav.Item
                    eventKey="announcement"
                    icon={
                      <img
                        src={spinner}
                        alt="Announcement"
                        className="rs-sidenav-item-icon scale-125"
                        width={20}
                        height={20}
                      />
                    }
                    onClick={() =>
                      onNavigateTo(ROUTES.ANNOUNCEMENT, "announcement")
                    }
                    className={`flex items-center gap-4 rounded-md px-2 py-2 text-gray-800 transition hover:bg-blue-100 ${
                      activeKey === "announcement"
                        ? "bg-blue-100 font-semibold text-blue-600"
                        : ""
                    }`}>
                    {expanded && (
                      <span className="text-[16px]">Announcement</span>
                    )}
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </div>
  );
};
