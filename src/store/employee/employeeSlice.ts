import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  reportingManager: string;
  functionalManager: string;
  grantedLeave: number;
  availedLeave: any;
  openingBalance: number;
  upcomingEvents: any;
  message: any;
  starRating: number;
  performanceReview: any;
  awards: any;
  status: string;
  linkedinUrl: any;
  githubUrl: any;
  facebookUrl: any;
  id: string | number;
  name: string;
  department: string;
  designation?: string;
}

export interface EmployeeFilters {
  department?: string;
  designation?: string;
}

interface EmployeeState {
  employees: Employee[];
  page: number;
  hasMore: boolean;
  totalPages: number;
  loading: boolean;
  error: any;
  departments: string[];
  designations: string[];
  filters: EmployeeFilters;
}

const initialState: EmployeeState = {
  employees: [],
  page: 1,
  hasMore: true,
  totalPages: 1,
  loading: false,
  error: null,
  departments: [],
  designations: [],
  filters: {
    department: "",
    designation: "",
  },
};

export interface LoadEmployeesRequestPayload {
  company: string;
  page: number;
  filters?: EmployeeFilters;
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    resetEmployees: (state) => {
      state.employees = [];
      state.page = 1;
      state.hasMore = true;
      state.totalPages = 1;
      state.error = null;
    },
    loadEmployeesRequest: (
      state,
      _action: PayloadAction<LoadEmployeesRequestPayload>
    ) => {
      state.loading = true;
      state.error = null;
    },
    loadEmployeesSuccess: (
      state,
      action: PayloadAction<{
        data: Employee[];
        hasMore: boolean;
        totalPages: number;
        page: number;
        departments?: string[];
        designations?: string[];
      }>
    ) => {
      const { data, hasMore, totalPages, page, departments, designations } =
        action.payload;
      state.employees = [...data];
      state.hasMore = hasMore;
      state.totalPages = totalPages;
      state.page = page;
      state.loading = false;

      // Update departments and designations if provided
      if (departments) {
        state.departments = departments;
      }
      if (designations) {
        state.designations = designations;
      }
    },
    loadEmployeesFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<EmployeeFilters>) => {
      state.filters = action.payload;
    },
    setDepartments: (state, action: PayloadAction<string[]>) => {
      state.departments = action.payload;
    },
    setDesignations: (state, action: PayloadAction<string[]>) => {
      state.designations = action.payload;
    },
  },
});

export const {
  resetEmployees,
  loadEmployeesRequest,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  setFilters,
  setDepartments,
  setDesignations,
} = employeeSlice.actions;

export default employeeSlice.reducer;
