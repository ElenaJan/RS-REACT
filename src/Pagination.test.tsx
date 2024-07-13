import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Pagination from './components/Pagination'

describe('Pagination component', () => {
    it('updates URL query parameter when page changes', async () => {
        render(
            <MemoryRouter initialEntries={['/?page=1']}>
                <Routes>
                    <Route
                        path="/"
                        element={<Pagination currentPage={1} totalPages={3} />}
                    />
                </Routes>
            </MemoryRouter>,
        )

        fireEvent(
            screen.getByText('2'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        await waitFor(() => {
            expect(window.location.search).toBe('')
        })
    })
})
