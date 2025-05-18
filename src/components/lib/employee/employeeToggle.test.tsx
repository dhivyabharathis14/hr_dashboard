import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import EmployeeDirectory from "./employeeToggle"; // adjust path as needed
import * as redux from "react-redux";
import { loadEmployeesRequest } from "../../../store/employee/employeeSlice";
import "@testing-library/jest-dom";

// Mock child components
jest.mock("../employee/employee", () => () => (
  <div>EmployeeCardList Component</div>
));
jest.mock("../employee/employeeListView", () => () => (
  <div>EmployeeListView Component</div>
));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("EmployeeDirectory", () => {
  let store: any;
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");

  beforeEach(() => {
    store = mockStore({
      company: {
        selectedCompany: "companyA",
        companies: ["companyA", "companyB", "companyC"],
      },
    });

    useDispatchSpy.mockReturnValue(store.dispatch);
  });

  it("renders with default list view", () => {
    render(
      <Provider store={store}>
        <EmployeeDirectory />
      </Provider>
    );

    expect(screen.getByText("Employee Directory")).toBeInTheDocument();
    expect(screen.getByText("EmployeeListView Component")).toBeInTheDocument();
  });

  it("switches to grid view when the grid button is clicked", () => {
    render(
      <Provider store={store}>
        <EmployeeDirectory />
      </Provider>
    );

    const gridButton = screen.getAllByRole("button")[2]; // Grid button is third in order
    fireEvent.click(gridButton);

    expect(screen.getByText("EmployeeCardList Component")).toBeInTheDocument();
  });

  it("dispatches loadEmployeesRequest when refresh button is clicked", () => {
    render(
      <Provider store={store}>
        <EmployeeDirectory />
      </Provider>
    );

    const refreshButton = screen.getByText("Refresh Data");
    fireEvent.click(refreshButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      loadEmployeesRequest({ company: "companyA", page: 1 })
    );
  });
});
