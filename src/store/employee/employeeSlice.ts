import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEmployees } from "../../api/employeeServices";

export const loadEmployees = createAsyncThunk(
  "employee/load",
  async ({ company, page }: { company: string; page: number }) => {
    const res = await fetchEmployees(company, page);
    return res;
  }
);

interface EmployeeState {
  employees: any[];
  page: number;
  hasMore: boolean;
  totalPages: number;
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  page: 1,
  hasMore: true,
  totalPages: 1, // ✅ Initial value
  loading: false,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loadEmployees.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: any[];
            hasMore: boolean;
            totalPages: number;
          }>
        ) => {
          state.employees = action.payload.data;
          state.hasMore = action.payload.hasMore;
          state.totalPages = action.payload.totalPages;
          state.page += 1;
          state.loading = false;
        }
      );
  },
});

export const { resetEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
