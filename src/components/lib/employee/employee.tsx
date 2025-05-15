import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEmployees } from "../../../store/employee/employeeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { RootState } from "~/store";

export const EmployeeCardList = () => {
  const dispatch = useDispatch();
  const { selectedCompany } = useSelector((state) => state.company);
  const { employees, totalPages, page, loading } = useSelector(
    (state: RootState) => state.employee
  );
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    dispatch(loadEmployees({ company: selectedCompany, page: currentPage }));
  }, [selectedCompany, currentPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="flex flex-col bg-gray-200 shadow-md py-8 px-6 rounded-md">
            <div className="flex flex-col items-center gap-4">
              <img
                className="rounded-full border-4 border-gray-300 h-24 w-24"
                src={`https://randomuser.me/api/portraits/men/${
                  emp.id % 100
                }.jpg`}
                alt={emp.name}
              />
              <div className="text-center">
                <div className="font-medium text-lg text-gray-800">
                  {emp.name}
                </div>
                <div className="text-gray-500 text-sm">{emp.designation}</div>
                <div className="text-sm text-gray-700">{emp.department}</div>
                <span
                  className={`text-xs mt-1 inline-block px-2 py-1 rounded ${
                    emp.status === "active"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}>
                  {emp.status}
                </span>
              </div>
              <div className="flex gap-4 text-xl text-gray-700">
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faGithub} />
                <FontAwesomeIcon icon={faFacebook} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span className="text-gray-700 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>

      {loading && (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      )}
    </div>
  );
};
export default EmployeeCardList;
