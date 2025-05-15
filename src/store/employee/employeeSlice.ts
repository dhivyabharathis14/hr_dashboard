import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: string;
  name: string;
  department: string;
}

interface EmployeeState {
  employees: Employee[];
  page: number;
  hasMore: boolean;
  totalPages: number;
  loading: boolean;
  error: any;
}

const initialState: EmployeeState = {
  employees: [],
  page: 1,
  hasMore: true,
  totalPages: 1,
  loading: false,
  error: null,
};

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
      _action: PayloadAction<{ company: string; page: number }>
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
      }>
    ) => {
      const { data, hasMore, totalPages, page } = action.payload;
      state.employees = [...data];
      state.hasMore = hasMore;
      state.totalPages = totalPages;
      state.page = page;
      state.loading = false;
    },
    loadEmployeesFailure: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetEmployees,
  loadEmployeesRequest,
  loadEmployeesSuccess,
  loadEmployeesFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
