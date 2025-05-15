import { useDispatch, useSelector } from "react-redux";
import { switchCompany } from "../../../store/company/companySlice";
import {
  resetEmployees,
  loadEmployees,
} from "../../../store/employee/employeeSlice";
import { useEffect } from "react";
import EmployeeCardList from "../../../components/lib/employee/employee";
import { RootState } from "~/store";

const CompanySwitcher = () => {
  const dispatch = useDispatch();
  const { companies, selectedCompany } = useSelector(
    (state: RootState) => state.company
  );

  const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(switchCompany(e.target.value));
    dispatch(resetEmployees());
    dispatch(loadEmployees({ company: e.target.value, page: 1 }));
  };

  useEffect(() => {
    dispatch(loadEmployees({ company: selectedCompany, page: 1 }));
  }, []);

  return (
    <>
      <div className="flex justify-start w-full max-w-sm mx-auto mt-6">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-2">
          Select Company
        </label>
        <select
          id="company"
          value={selectedCompany}
          onChange={handleSwitch}
          className="block w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <EmployeeCardList />
    </>
  );
};
export default CompanySwitcher;
