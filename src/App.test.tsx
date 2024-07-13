/// src/App.test.tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

describe('App component', () => {
    it('renders the title', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        )
        expect(screen.getByText('React Pokemon')).toBeInTheDocument()
    })

    it('renders the Search component', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        )
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('renders the NotFound component for unknown routes', () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>,
        )
        expect(screen.getByText(/404 - Not Found/i)).toBeInTheDocument()
        expect(
            screen.getByText(/The page you are looking for does not exist./i),
        ).toBeInTheDocument()
    })
})
