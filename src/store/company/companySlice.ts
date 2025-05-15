import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedCompany: "companyA",
  companies: ["companyA", "companyB", "companyC"],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    switchCompany: (state, action: PayloadAction<string>) => {
      state.selectedCompany = action.payload;
    },
    switchCompanyRequest: (state, _action: PayloadAction<string>) => {},
  },
});

export const { switchCompany, switchCompanyRequest } = companySlice.actions;
export default companySlice.reducer;
