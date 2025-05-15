import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../../shared/SideBar";
import { RootState } from "~/store";
import { toggleSidebar } from "../../../store/common/CommonSlice";
import spinner from "../../../assets/spinner.svg";
import { Suspense } from "../../../components/provider/Suspense";
import { Outlet } from "../../../components/lib/router/Outlet";

/**
 * Private Pages Layout.
 */
export const PrivateLayout = () => {
  const dispatch = useDispatch();
  const { isExpanded } = useSelector((state: RootState) => state.common);

  /**
   * Toggle between open or close the sidenav bar.
   */
  const onToggleSidebarView = () => {
    dispatch(toggleSidebar());
  };

  return (
    <main className="relative h-full min-h-screen">
      <>
        <header id="page-topbar">
          <div className="mx-auto flex h-full items-center justify-between pr-6">
            {/* <div className="flex items-center">
              <Link
                to={ROUTES.BASE_URL}
                className="flex items-center gap-2 text-lg font-semibold">
                <MemberIcon className="text-purple-400" />
                {isExpanded && <span className="text-black">HR DASHBOARD</span>}
              </Link>
              <button
                className="relative !z-50 h-[64px] w-14 -translate-x-6 px-4 py-2 text-[#555b6d]"
                onClick={onToggleSidebarView}></button>
            </div> */}
          </div>
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
      </>
    </main>
  );
};
