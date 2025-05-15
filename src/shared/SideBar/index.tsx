import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Nav, Sidenav } from "rsuite";
import spinner from "../../assets/spinner.svg";
import { ROUTES } from "../../components/constants/routes";

interface Props {
  expanded: boolean;
}

/**
 * Sidebar Navigation.
 */
export const Sidebar = ({ expanded }: Props) => {
  const [activeKey, onSetActiveKey] = useState("home");
  const navigate = useNavigate();

  const onNavigateTo = (to: string) => {
    navigate(to);
  };

  return (
    <div
      className={`fixed inset-y-0 z-40 mt-0 flex flex-col border-r bg-white pt-[60px] shadow-md transition-all duration-300 ease-in-out ${
        expanded ? "w-60" : "w-20"
      }`}>
      <div
        className={`fixed top-0 z-50 h-[60px] border-b border-card-border-secondary py-2 text-center ${
          expanded ? "w-60 px-5" : "w-20 px-4"
        }`}>
        <Link
          to={ROUTES.BASE_URL}
          className="flex h-[44px] items-center justify-center gap-2">
          {/* <img src={spinner} alt="HR DASHBOARD" /> */}
          <h3>HR DASHBOARD</h3>
        </Link>
      </div>
      <div className={`h-full p-2.5 ${expanded ? "overflow-y-auto" : ""}`}>
        <Sidenav
          expanded={expanded}
          appearance="subtle"
          className="sidebar-nav !text-sm !text-black">
          <Sidenav.Body>
            <Nav
              activeKey={activeKey}
              onSelect={onSetActiveKey}
              className=" flex flex-col gap-1">
              <Nav.Item
                eventKey="home"
                icon={
                  <img
                    src={spinner}
                    alt="Home"
                    className="rs-sidenav-item-icon rs-icon scale-125"
                    width={1}
                    height={1}
                  />
                }
                onClick={() => onNavigateTo(ROUTES.BASE_URL)}>
                Home
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    </div>
  );
};
