import { useDispatch, useSelector } from "react-redux";
import { useEffect, ChangeEvent } from "react";
import { RootState } from "~/store";
import { switchCompanyRequest } from "../../../store/company/companySlice";
import {
  resetEmployees,
  loadEmployeesRequest,
} from "../../../store/employee/employeeSlice";

const CompanySwitcher = () => {
  const dispatch = useDispatch();
  const { companies, selectedCompany } = useSelector(
    (state: RootState) => state.company
  );

  const handleSwitch = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCompany = e.target.value;
    dispatch(switchCompanyRequest(newCompany));
    dispatch(resetEmployees());
  };

  useEffect(() => {
    if (selectedCompany) {
      dispatch(loadEmployeesRequest({ company: selectedCompany, page: 1 }));
    }
  }, [selectedCompany, dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-4 mx-auto mt-6 max-w-md">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Company Selector</h3>
      </div>

      <div className="relative">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-2">
          Select Company
        </label>

        <select
          id="company"
          value={selectedCompany}
          onChange={handleSwitch}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 rounded-md bg-white shadow-sm transition duration-200 ease-in-out cursor-pointer">
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompanySwitcher;
