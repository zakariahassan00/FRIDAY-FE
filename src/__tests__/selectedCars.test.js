import React from "react";
import { Provider } from "react-redux";
import {
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import SelectedCars from "../components/cars/SelectedCars";
import { store } from "../config/state/store";
import { Route, MemoryRouter } from "react-router-dom";

const renderComponent = (params) =>
  render(
    <Provider store={store}>
        <MemoryRouter initialEntries={[`/cars/${params.make}/${params.model}/${params.bodyType}/${params.engPower}`]}>
            <Route path="/cars/:make/:model/:bodyType/:engPower">
                <SelectedCars />
            </Route>
        </MemoryRouter>
    </Provider>
  );

beforeEach(() => {
    renderComponent({ make: "BMW", model: "3er", bodyType: "Kombi", engPower: 118 })
});

afterEach(() => {
  cleanup();
});

it("calls the getCars action and displays the cars", async () => {
  const allCars = await waitFor(() => screen.getAllByTestId("single-car-info"));

  expect(allCars.length).toEqual(1);
});

it("shows the current path", async () => {
  const path = screen.getByTestId("current-path");
  await waitFor(() => screen.getAllByTestId("single-car-info"));


  expect(path).toHaveTextContent("BMW > 3er");
});

it("shows the correct number of cars", async () => {
  const path = screen.getByTestId("cars-number");
  await waitFor(() => screen.getAllByTestId("single-car-info"));

  expect(path).toHaveTextContent("1 vehicles found");
});
