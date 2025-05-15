import { createSlice } from "@reduxjs/toolkit";

export interface CommonState {
  isExpanded: boolean;
}

export const CommonSlice = createSlice({
  name: "Common",
  initialState: {
    isExpanded: true,
  } as CommonState,
  reducers: {
    toggleSidebar: (state) => {
      return {
        ...state,
        isExpanded: !state.isExpanded,
      };
    },
  },
});

export const { toggleSidebar } = CommonSlice.actions;
const CommonReducer = CommonSlice.reducer;
export default CommonReducer;
