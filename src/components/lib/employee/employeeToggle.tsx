import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployeesRequest } from "../../../store/employee/employeeSlice";
import { RootState } from "~/store";
import EmployeeCardList from "../employee/employee";
import EmployeeListView from "../employee/employeeListView";

export const EmployeeDirectory = () => {
  const [viewMode, setViewMode] = useState("list"); // "grid" or "list"
  const { selectedCompany } = useSelector((state: RootState) => state.company);
  const dispatch = useDispatch();

  const refreshData = () => {
    dispatch(loadEmployeesRequest({ company: selectedCompany, page: 1 }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* View Toggle Controls */}
      <div className="max-w-7xl mx-auto pt-6 px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Employee Directory
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={refreshData}
              className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Refresh Data
            </button>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                  viewMode === "grid"
                    ? "bg-blue-50 text-blue-700 border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                  viewMode === "list"
                    ? "bg-blue-50 text-blue-700 border-blue-700"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering based on view mode */}
      {viewMode === "grid" ? <EmployeeCardList /> : <EmployeeListView />}
    </div>
  );
};

export default EmployeeDirectory;
