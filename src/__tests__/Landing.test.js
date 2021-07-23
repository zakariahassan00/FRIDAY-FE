import React from 'react';
import { Provider } from 'react-redux'
// import { BrowserRouter } from 'react-router-dom';
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
    const sumbit = screen.getByTestId('submit');

    // click on make select and choose BMW
    fireEvent.focusIn(screen.getByTestId('make'));
    const makeSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(makeSelectItems[0])
    fireEvent.blur(screen.getByTestId('make'))

    // click on models and choose 3er
    fireEvent.focusIn(screen.getByTestId('models'));
    const modelsSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(modelsSelectItems[2])
    fireEvent.blur(screen.getByTestId('models'))

    // click bodyType and choose first option
    fireEvent.focusIn(screen.getByTestId('bodyType'));
    const bodyTypesSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(bodyTypesSelectItems[0]);
    fireEvent.blur(screen.getByTestId('bodyType'));

    // click engine power and choose first option
    fireEvent.focusIn(screen.getByTestId('engPower'));
    const engPowerSelectItems = await waitFor (() => screen.getAllByTestId('autocomplete-item'));
    fireEvent.mouseDown(engPowerSelectItems[0]);
    fireEvent.blur(screen.getByTestId('engPower'));

    
    expect(sumbit).toBeEnabled();
})