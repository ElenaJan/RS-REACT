import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import Results from './components/Results.tsx'
import { it, describe } from 'vitest'
import './setupTests'

// const mockResults = [
//     { name: 'bulbasaur', description: 'A grass type pokemon' },
//     { name: 'charmander', description: 'A fire type pokemon' },
// ]

describe('Results component', () => {
    // beforeAll(() => {
    //     vi.fn()
    //         .mockResolvedValue({
    //             ok: true,
    //             json: () =>
    //                 Promise.resolve({ results: mockResults, count: 2 }),
    //         })
    // })

    // afterAll(() => {
    //     vi.resetAllMocks()
    // })

    it('renders the specified number of results', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Results search="" />} />
                </Routes>
            </MemoryRouter>,
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByText('bulbasaur')).toBeInTheDocument(),
        )
        expect(screen.getByText('charmander')).toBeInTheDocument()
    })

    it('displays appropriate message if no results are present', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Results search="dassdf" />} />
                </Routes>
            </MemoryRouter>,
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
        await waitFor(() =>
            expect(screen.getByText(/No cards available/i)).toBeInTheDocument(),
        )
    })

    it('opens the detailed card component on result click', async () => {
        render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Results search="" />} />
                </Routes>
            </MemoryRouter>,
        )

        await waitFor(() =>
            expect(screen.getByText('bulbasaur')).toBeInTheDocument(),
        )

        fireEvent(
            screen.getByText('bulbasaur'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        await waitFor(() =>
            expect(
                screen.getByText(/Details for bulbasaur/i),
            ).toBeInTheDocument(),
        )
    })
})
