import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AutoComplete from '../common/components/autoComplete/AutoComplete';

it("renders the list correctly", () => {
    const fakeOptions = { data: ["BMW", "AUDI", "FORD"], loaded: true, errors: false }
    render(<AutoComplete name="make" options={fakeOptions} />)
    const makeInput = screen.getByTestId('make');
    fireEvent.focusIn(makeInput);
    const makeList = screen.getAllByTestId('autocomplete-item');

    expect(makeList.length).toBe(3)
});

it("displays loading if request is finished", () => {
    const fakeOptions = { data: [], loaded: false, errors: false }
    render(<AutoComplete name="make" options={fakeOptions} />)
    const makeInput = screen.getByTestId('make');
    fireEvent.focusIn(makeInput);
    const makeListLoading = screen.getByTestId('autocomplete-loading-message');

    expect(makeListLoading).toBeTruthy()
});

it("displays the correct empty message", () => {
    const fakeOptions = { data: [], loaded: true, errors: true }
    render(<AutoComplete name="make" options={fakeOptions} emptyOptionsMsg="No Available makes"/>)
    const makeInput = screen.getByTestId('make');
    fireEvent.focusIn(makeInput);
    const makeListEmpty = screen.getByTestId('autocomplete-empty-message');

    expect(makeListEmpty).toHaveTextContent("No Available makes");
});

it("put the value in input after selecting item from list", () => {
    const fakeOptions = { data: ["BMW", "AUDI", "FORD"], loaded: true, errors: false }
    render(<AutoComplete name="make" options={fakeOptions} onChange={jest.fn} />)
    const makeInput = screen.getByTestId('make');
    
    // act as user on selecting a value from the list
    fireEvent.focusIn(makeInput);
    const makeList = screen.getAllByTestId('autocomplete-item');
    fireEvent.mouseDown(makeList[0]);
    fireEvent.blur(makeInput);

    expect(makeInput.value).toBe("BMW");
})

it("filters the list based on the user input", () => {
    const fakeOptions = { data: ["111", "A1", "CCC"], loaded: true, errors: false }
    render(<AutoComplete name="make" options={fakeOptions} onChange={jest.fn} />)
    const makeInput = screen.getByTestId('make');
    
    // typing 1 in input, and the autocomplete should only display items that contain 1 
    fireEvent.focusIn(makeInput);
    fireEvent.change(makeInput, { target: { value: 1 } })
    const makeList = screen.getAllByTestId('autocomplete-item');

    expect(makeList.length).toEqual(2);
});
