import React, { useState, ChangeEvent } from 'react'

interface SearchProps {
    onSearch: (searchTerm: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>(
        () => localStorage.getItem('searchTerm') || '',
    )

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleSearch = (): void => {
        const trimmedSearchTerm: string = searchTerm.trim()
        onSearch(trimmedSearchTerm)
    }

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default Search
