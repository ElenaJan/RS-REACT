import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Details from './components/Details'

// Mock fetch to simulate API call
vi.mock('node-fetch', () => ({
    fetch: () =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({ name: 'bulbasaur', height: 7, weight: 69 }),
        }),
}))

describe('Details component', () => {
    it('displays a loading indicator while fetching data', async () => {
        render(<Details itemName="bulbasaur" onClose={() => {}} />)

        // Assert that loading indicator is displayed
        expect(screen.getByTestId('loader')).toBeInTheDocument()

        // Wait for the fetchInfo function to complete
        await waitFor(() => {
            expect(
                screen.getByText('Details for bulbasaur'),
            ).toBeInTheDocument()
        })
    })
})
