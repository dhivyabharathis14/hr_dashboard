import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../../shared/SideBar";
import { RootState } from "~/store";
import { toggleSidebar } from "../../../store/common/CommonSlice";
import { Suspense } from "../../../components/provider/Suspense";
import { Outlet } from "../../../components/lib/router/Outlet";
import { useAuth } from "../../../shared/providers/auth";
import { useNavigate } from "react-router-dom";

/**
 * Private Pages Layout.
 */
export const PrivateLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isExpanded } = useSelector((state: RootState) => state.common);

  /**
   * Toggle between open or close the sidenav bar.
   */
  const onToggleSidebarView = () => {
    dispatch(toggleSidebar());
  };

  /**
   * Handle logout and redirect to login page.
   */
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="relative h-full min-h-screen">
      <header
        id="page-topbar"
        className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-600 hover:text-black"
            onClick={onToggleSidebarView}>
            ☰
          </button>
          {isExpanded && (
            <h1 className="text-xl font-semibold">HR Dashboard</h1>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Logout
        </button>
      </header>

      <Sidebar />

      <div
        className={`min-h-screen mt-10 ${
          isExpanded ? "ml-60" : "ml-[80px]"
        } overflow-hidden`}>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};
