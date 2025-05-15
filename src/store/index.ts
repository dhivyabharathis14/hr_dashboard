import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import companyReducer from "./company/companySlice";
import CommonReducer from "./common/CommonSlice";
import employeeReducer from "./employee/employeeSlice";

import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    common: CommonReducer,
    company: companyReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // disable thunk if not used
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
