import { Component, ChangeEvent } from 'react'

interface SearchProps {
    onSearch: (searchTerm: string) => void
}

interface SearchState {
    searchTerm: string
}

class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props)
        const searchTerm = localStorage.getItem('searchTerm') || ''
        this.state = { searchTerm }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value })
    }

    handleSearch = () => {
        const searchTerm = this.state.searchTerm.trim()
        localStorage.setItem('searchTerm', searchTerm)
        this.props.onSearch(searchTerm)
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.searchTerm}
                    onChange={this.handleInputChange}
                />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        )
    }
}

export default Search
