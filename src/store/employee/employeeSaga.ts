import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEmployees,
  fetchDepartments,
  fetchDesignations,
} from "../../api/employeeServices";
import {
  loadEmployeesRequest,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  setDepartments,
  setDesignations,
  LoadEmployeesRequestPayload,
} from "./employeeSlice";

function* handleLoadEmployees(action: ReturnType<typeof loadEmployeesRequest>) {
  try {
    const { company, page, filters } =
      action.payload as LoadEmployeesRequestPayload;

    // Call the enhanced API with filters
    const res = yield call(fetchEmployees, company, page, filters);

    // Update departments and designations in the Redux store if they're provided
    if (res.departments) {
      yield put(setDepartments(res.departments));
    }

    if (res.designations) {
      yield put(setDesignations(res.designations));
    }

    // If the API doesn't return departments and designations, you could fetch them separately
    // const departments = yield call(fetchDepartments, company);
    // const designations = yield call(fetchDesignations, company);
    // yield put(setDepartments(departments));
    // yield put(setDesignations(designations));

    yield put(
      loadEmployeesSuccess({
        data: res.data,
        hasMore: res.hasMore,
        totalPages: res.totalPages,
        page: page,
      })
    );
  } catch (error) {
    yield put(loadEmployeesFailure(error));
  }
}

// Optional: Add a saga to load filter options when the company changes
function* handleCompanyChange(action: any) {
  try {
    const company = action.payload;

    // Load departments for the selected company
    const departments = yield call(fetchDepartments, company);
    yield put(setDepartments(departments));

    // Load designations for the selected company
    const designations = yield call(fetchDesignations, company);
    yield put(setDesignations(designations));
  } catch (error) {
    console.error("Failed to load filter options:", error);
  }
}

export function* employeeSaga() {
  yield takeLatest("employee/loadEmployeesRequest", handleLoadEmployees);
  yield takeLatest("company/switchCompanyRequest", handleCompanyChange);
}
