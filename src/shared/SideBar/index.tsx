import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { ROUTES } from "../../components/constants/routes";
import CompanySwitcher from "../../components/lib/companySwitcher/CompanySwitcher";
import {} from "rsuite";
import PeopleSpeakerIcon from "@rsuite/icons/PeopleSpeaker";
import PageNextIcon from "@rsuite/icons/PageNext";
import PagePreviousIcon from "@rsuite/icons/PagePrevious";
import MemberIcon from "@rsuite/icons/Member";
import PeoplesMapIcon from "@rsuite/icons/PeoplesMap";
import UserBadgeIcon from "@rsuite/icons/UserBadge";
import { toggleSidebar } from "../../store/common/CommonSlice";

export const Sidebar = () => {
  const [activeKey, setActiveKey] = useState("home");
  const navigate = useNavigate();
  const { selectedCompany } = useSelector((state: RootState) => state.company);
  const dispatch = useDispatch();
  const { isExpanded } = useSelector((state: RootState) => state.common);

  const navigateTo = (to: string, key: string) => {
    setActiveKey(key);
    navigate(to);
  };
  const onToggleSidebarView = () => {
    dispatch(toggleSidebar());
  };
  return (
    <div
      className={`fixed inset-y-0 z-40 flex flex-col bg-purple-300 pt-16 transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      }`}>
      {/* Brand Header */}
      <div
        className={`fixed top-0 z-50 flex h-16 items-center text-black ${
          isExpanded ? "w-64 px-4 justify-between" : "w-20 px-3 justify-center"
        }`}>
        <Link
          to={ROUTES.BASE_URL}
          className="flex items-center gap-2 text-lg font-semibold">
          <MemberIcon className="text-purple-400" />
          {isExpanded && <span className="text-black">HR DASHBOARD</span>}
        </Link>

        <button
          onClick={onToggleSidebarView}
          className="text-black-400 hover:text-black transition-colors rounded-full p-1 hover:bg-purple-500">
          {isExpanded ? <PagePreviousIcon /> : <PageNextIcon />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <nav className="flex flex-col gap-2">
          {/* Home */}
          <button
            onClick={() => navigateTo(ROUTES.BASE_URL, "home")}
            className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
              activeKey === "home"
                ? "bg-purple-600 text-black"
                : "text-black-300 hover:bg-slate-700"
            }`}>
            <UserBadgeIcon className={isExpanded ? "mr-3" : "mx-auto"} />
            {isExpanded && <span>Dashboard</span>}
          </button>

          {/* Conditional Navigation Items */}
          {selectedCompany && (
            <>
              <button
                onClick={() => navigateTo(ROUTES.EMPLOYEES, "employees")}
                className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                  activeKey === "employees"
                    ? "bg-purple-600 text-black"
                    : "text-black-300 hover:bg-slate-700"
                }`}>
                <PeoplesMapIcon className={isExpanded ? "mr-3" : "mx-auto"} />
                {isExpanded && <span>Employees List</span>}
              </button>

              <button
                onClick={() => navigateTo(ROUTES.ANNOUNCEMENT, "announcement")}
                className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                  activeKey === "announcement"
                    ? "bg-purple-600 text-black"
                    : "text-black-300 hover:bg-slate-700"
                }`}>
                <PeopleSpeakerIcon
                  className={isExpanded ? "mr-3" : "mx-auto"}
                />
                {isExpanded && <span>Announcement</span>}
              </button>
            </>
          )}
        </nav>
      </div>

      {/* User Profile Area (Optional) */}
      <div
        className={`mt-auto border-t border-slate-700 p-4 ${
          isExpanded ? "" : "flex justify-center"
        }`}>
        <div
          className={`flex items-center ${isExpanded ? "" : "justify-center"}`}>
          <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-black font-medium">
            U
          </div>
          {isExpanded && (
            <div className="ml-3">
              <p className="text-sm font-medium text-black">User Name</p>
              <p className="text-xs text-black-400">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
