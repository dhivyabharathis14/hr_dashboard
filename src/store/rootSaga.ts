import { all } from "redux-saga/effects";
import { employeeSaga } from "../store/employee/employeeSaga";
import companySaga from "../store/company/companySaga";

export default function* rootSaga() {
  yield all([companySaga(), employeeSaga()]);
}
