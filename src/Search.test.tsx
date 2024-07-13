import React from 'react'
import { render, screen } from '@testing-library/react'
import Search from './components/Search'

describe('Search component', () => {
    beforeEach(() => {
        localStorage.clear() // Clear local storage before each test
    })

    it('retrieves the value from local storage upon mounting', () => {
        localStorage.setItem('searchTerm', 'charmander')

        render(<Search onSearch={() => {}} />)

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('charmander')
    })

    it('displays an empty input field if no value is in local storage', () => {
        localStorage.clear()

        render(<Search onSearch={() => {}} />)

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('')
    })
})
