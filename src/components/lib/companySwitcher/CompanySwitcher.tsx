import { useDispatch, useSelector } from "react-redux";
import { useEffect, ChangeEvent, useState } from "react";
import { RootState } from "~/store";
import { switchCompanyRequest } from "../../../store/company/companySlice";
import {
  resetEmployees,
  loadEmployeesRequest,
  setFilters,
} from "../../../store/employee/employeeSlice";
import CustomDropdown from "../../../shared/DropDown";

const CompanySwitcher = () => {
  const dispatch = useDispatch();
  const { companies, selectedCompany } = useSelector(
    (state: RootState) => state.company
  );
  const { departments, designations, filters } = useSelector(
    (state: RootState) => state.employee
  );

  // Initialize local state for filters
  const [localFilters, setLocalFilters] = useState({
    department: filters?.department || "",
    designation: filters?.designation || "",
  });

  const handleSwitch = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCompany = e.target.value;
    dispatch(switchCompanyRequest(newCompany));
    dispatch(resetEmployees());
    // Reset filters when company changes
    setLocalFilters({
      department: "",
      designation: "",
    });
  };

  const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDepartment = e.target.value;
    const updatedFilters = {
      ...localFilters,
      department: newDepartment,
    };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
  };

  const handleDesignationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newDesignation = e.target.value;
    const updatedFilters = {
      ...localFilters,
      designation: newDesignation,
    };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
  };

  useEffect(() => {
    if (selectedCompany) {
      dispatch(
        loadEmployeesRequest({
          company: selectedCompany,
          page: 1,
          filters: localFilters,
        })
      );
    }
  }, [selectedCompany, localFilters, dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-4 mx-auto mt-6 max-w-3xl">
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Employee Filters</h3>
      </div>

      <div className="flex space-y-4 gap-9">
        <CustomDropdown
          id="company"
          label="Select Company"
          value={selectedCompany}
          options={companies}
          onChange={handleSwitch}
        />

        <CustomDropdown
          id="department"
          label="Department"
          value={localFilters.department}
          options={departments || []}
          onChange={handleDepartmentChange}
          placeholder="All Departments"
        />

        <CustomDropdown
          id="designation"
          label="Designation"
          value={localFilters.designation}
          options={designations || []}
          onChange={handleDesignationChange}
          placeholder="All Designations"
        />
      </div>
    </div>
  );
};

export default CompanySwitcher;
