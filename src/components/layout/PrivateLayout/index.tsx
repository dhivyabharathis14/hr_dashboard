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
        <header
          id="page-topbar"
          className={`fixed h-[60px] ${
            isExpanded ? "left-60" : "left-[80px]"
          } right-0 top-0 z-50 border-b border-card-border-secondary bg-white`}>
          <div className="mx-auto flex h-full items-center justify-between pr-6">
            <div className="flex items-center">
              Sidebar need to be added
              <button
                className="relative !z-50 h-[64px] w-14 -translate-x-6 px-4 py-2 text-[#555b6d]"
                onClick={onToggleSidebarView}></button>
            </div>
          </div>
        </header>
        <div
          className={`min-h-screen ${
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
