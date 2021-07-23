import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Pagination from '../common/components/pagination/Pagination';

afterEach(() => {
    cleanup()
})

describe("Pagination", () => {
    test("it shows the correct number of page", () => {
        render(<Pagination currentPage={0} handlePageChange={jest.fn} maxPagesCount={10}/>);
        expect(screen.getByTestId("pagination-current")).toHaveTextContent("page 1 of 11")
    })

    test("disable first and prev at the first page", () => {
        render(<Pagination currentPage={0} handlePageChange={jest.fn} maxPagesCount={10}/>);
        expect(screen.getByTestId("pagination-first-btn")).toBeDisabled();
        expect(screen.getByTestId("pagination-prev-btn")).toBeDisabled();
    })

    test("disable next and last at the last page", () => {
        render(<Pagination currentPage={10} handlePageChange={jest.fn} maxPagesCount={10}/>);
        expect(screen.getByTestId("pagination-next-btn")).toBeDisabled();
        expect(screen.getByTestId("pagination-last-btn")).toBeDisabled();
    })

    test("disable all if there is only one page", () => {
        render(<Pagination currentPage={0} handlePageChange={jest.fn} maxPagesCount={0}/>);
        expect(screen.getByTestId("pagination-next-btn")).toBeDisabled();
        // if there is only 1 page then all pagination buttons should be disabled
        for (let btn of screen.getAllByRole('button')) {
            expect(btn).toBeDisabled();
        }
    })
})