import React from 'react';
import { Provider } from 'react-redux'
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Landing from '../components/landing/Landing';
import { store } from '../config/state/store';

beforeEach(() => {
    render(<Provider store={store}><Landing /></Provider>);
})

afterEach(() => {
    cleanup()
})

it("calls getMake action and displays the data in makeInput correctly", async () => {
    fireEvent.focusIn(screen.getByTestId('make'));
    const makeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    
    expect(makeSelectItems.length).toEqual(3);
})

it("prevents the user from accessing the next page without filling all fields", async () => {
    // initialy all fileds have null value, so the user cant click go to the next page
    const sumbit = screen.getByTestId('submit');
    expect(sumbit).toBeDisabled(); 
})

it("clears the models input on make input change", async () => {

    const makeInput = screen.getByTestId('make');
    const modelsInput = screen.getByTestId('models');

    // click on make select and choose BMW
    fireEvent.focusIn(makeInput);
    const makeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(makeSelectItems[0]);
    fireEvent.blur(makeInput);

    // click on models and choose 3er
    fireEvent.focusIn(modelsInput);
    const modelsSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(modelsSelectItems[2]);
    fireEvent.blur(modelsInput);

    // clear make value
    fireEvent.change(makeInput, { target: { value: "" } });
    // click on make select and choose AUDI
    fireEvent.focusIn(makeInput);
    const newMakeSelect = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(newMakeSelect[1]);
    fireEvent.blur(makeInput);
    
    expect(screen.getByTestId('models').value).toBe("");
});

it("clears the bodyType input & enginePower input on model input change", async () => {
    const makeInput = screen.getByTestId('make');
    const modelsInput = screen.getByTestId('models');
    const bodyTypeInput = screen.getByTestId('bodyType');
    const engPowerInput = screen.getByTestId('engPower');

    // click on make select and choose BMW
    fireEvent.focusIn(makeInput);
    const makeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(makeSelectItems[0]);
    fireEvent.blur(makeInput);

    // click on models and choose 3er
    fireEvent.focusIn(modelsInput);
    const modelsSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(modelsSelectItems[2]);
    fireEvent.blur(modelsInput);

    // click on models and choose first option
    fireEvent.focusIn(bodyTypeInput);
    const bodyTypeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(bodyTypeSelectItems[0]);
    fireEvent.blur(bodyTypeInput);

    // click on models and choose first option
    fireEvent.focusIn(engPowerInput);
    const engPowerTypeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(engPowerTypeSelectItems[0]);
    fireEvent.blur(engPowerInput);

    // clear models value
    fireEvent.change(modelsInput, { target: { value: "" } });
    // click on make select and choose first option
    fireEvent.focusIn(modelsInput);
    const newModelsSelect = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(newModelsSelect[0]);
    fireEvent.blur(modelsInput);

    expect(bodyTypeInput.value).toBe("");
    expect(engPowerInput.value).toBe("");
});