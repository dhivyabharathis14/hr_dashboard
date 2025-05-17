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

export const EmployeeCardList = () => {
  const dispatch = useDispatch();
  const { selectedCompany } = useSelector((state: RootState) => state.company);
  const { employees, totalPages, page, loading } = useSelector(
    (state: RootState) => state.employee
  );

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(
        loadEmployeesRequest({ company: selectedCompany, page: newPage })
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <Link
            to={`${ROUTES.EMPLOYEES}${emp.id}`}
            key={emp.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Card Header with gradient background */}
            <div className="bg-gradient-to-r from-purple-300 to-purple-400 h-16 flex items-center px-6">
              <div className="w-full">
                <span
                  className={`float-right inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    emp.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {emp.status}
                </span>
              </div>
            </div>

            {/* Employee Information */}
            <div className="p-6 pt-0 -mt-10 flex flex-col items-center">
              {/* Avatar with border */}
              <div className="relative mb-4">
                <img
                  className="h-24 w-24 rounded-full border-4 border-white shadow-md"
                  src={`https://randomuser.me/api/portraits/men/${emp.id}.jpg`}
                  alt={emp.name}
                />
                <span
                  className={`absolute bottom-0 right-0 h-5 w-5 border-2 border-white rounded-full ${
                    emp.status === "active" ? "bg-green-500" : "bg-yellow-500"
                  }`}></span>
              </div>

              {/* Employee Details */}
              <div className="text-center space-y-1">
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">
                  {emp.name}
                </h3>
                <p className="text-gray-600 font-medium">
                  {emp.designation || "Employee"}
                </p>
                <p className="text-gray-500 text-sm">{emp.department}</p>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-4 mt-4 text-gray-500">
                {emp.linkedinUrl && (
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                )}
                {emp.githubUrl && <FontAwesomeIcon icon={faGithub} size="lg" />}
                {emp.facebookUrl && (
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                )}
                {/* If no social urls specified */}
                {!emp.linkedinUrl && !emp.githubUrl && !emp.facebookUrl && (
                  <>
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      size="lg"
                      className="opacity-40"
                    />
                    <a href="https://github.com/dhivyabharathis14">
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="lg"
                        className="opacity-40"
                      />
                    </a>
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="lg"
                      className="opacity-40"
                    />
                  </>
                )}
              </div>

              {/* View Profile Button */}
              <div className="mt-6 w-full">
                <div className="text-center py-2 px-4 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg group-hover:bg-purple-50 group-hover:text-purple-700 transition">
                  View Profile
                </div>
              </div>
            </div>
          </Link>
        ))}
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

export default EmployeeCardList;
