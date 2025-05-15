import { call, put, takeLatest } from "redux-saga/effects";
import { fetchEmployees } from "../../api/employeeServices";
import {
  loadEmployeesRequest,
  loadEmployeesSuccess,
  loadEmployeesFailure,
} from "./employeeSlice";

function* handleLoadEmployees(action: ReturnType<typeof loadEmployeesRequest>) {
  try {
    const { company, page } = action.payload;
    const res = yield call(fetchEmployees, company, page);
    yield put(loadEmployeesSuccess({ ...res, page }));
  } catch (error) {
    yield put(loadEmployeesFailure(error));
  }
}

export function* employeeSaga() {
  yield takeLatest("employee/loadEmployeesRequest", handleLoadEmployees);
}
