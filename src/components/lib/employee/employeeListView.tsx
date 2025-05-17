import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployeesRequest } from "../../../store/employee/employeeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { RootState } from "~/store";
import { Link } from "../../../components/lib/router/Link";
import { ROUTES } from "../../../components/constants/routes";

export const EmployeeListView = () => {
  const dispatch = useDispatch();
  const { selectedCompany } = useSelector((state: RootState) => state.company);
  const { employees, totalPages, page, loading } = useSelector(
    (state: RootState) => state.employee
  );

  const [currentPage, setCurrentPage] = useState(page);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedEmployees, setSortedEmployees] = useState([...employees]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    // Sort employees whenever the sort criteria or employee data changes
    const sorted = [...employees].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    setSortedEmployees(sorted);
  }, [employees, sortField, sortDirection]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(
        loadEmployeesRequest({ company: selectedCompany, page: newPage })
      );
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Employee List Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("name")}>
                    Employee
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("department")}>
                    Department
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("designation")}>
                    Designation
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort("status")}>
                    Status
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://randomuser.me/api/portraits/men/${emp.id}.jpg`}
                          alt={emp.name}
                        />
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 border border-white rounded-full ${
                            emp.status === "active"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}></span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {emp.name}
                        </div>
                        <div className="text-sm text-gray-500">#{emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {emp.department || "Not assigned"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {emp.designation || "Employee"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        emp.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-3">
                      {emp.linkedinUrl ? (
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="text-blue-700"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="text-gray-400 opacity-40"
                        />
                      )}

                      {emp.githubUrl ? (
                        <FontAwesomeIcon
                          icon={faGithub}
                          className="text-gray-800"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faGithub}
                          className="text-gray-400 opacity-40"
                        />
                      )}

                      {emp.facebookUrl ? (
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-blue-600"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faFacebook}
                          className="text-gray-400 opacity-40"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`${ROUTES.EMPLOYEES}${emp.id}`}
                      className="text-blue-600 hover:text-blue-900 flex items-center justify-end">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {!loading && employees.length === 0 && (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-xl border border-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-700">
            No employees found
          </h3>
          <p className="mt-1 text-gray-500">
            Try selecting a different company or adding employees.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <button
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === 1}
              onClick={() => handlePageChange(currentPage - 1)}>
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Page numbers - show up to 5 pages */}
            {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
              const pageNum =
                page <= 3
                  ? idx + 1
                  : page >= totalPages - 2
                  ? totalPages - 4 + idx
                  : page - 2 + idx;

              // Only render if page number is valid
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === pageNum
                        ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}>
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}

            <button
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={page === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default EmployeeListView;
