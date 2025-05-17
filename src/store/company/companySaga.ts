import { takeLatest, put } from "redux-saga/effects";
import { switchCompanyRequest, switchCompany } from "./companySlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleSwitchCompany(action: PayloadAction<string>) {
  yield put(switchCompany(action.payload));
}

export default function* companySaga() {
  yield takeLatest(switchCompanyRequest, handleSwitchCompany);
}
