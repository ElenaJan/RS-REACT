import { Component } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'
import './App.css'

interface Result {
    name: string
    description: string
}

interface AppState {
    results: Result[]
    loading: boolean
    error: Error | null
    testError: boolean
}

class App extends Component<Record<string, never>, AppState> {
    state: AppState = {
        results: [],
        loading: false,
        error: null,
        testError: false,
    }

    componentDidMount() {
        const searchTerm = localStorage.getItem('searchTerm') || ''
        this.fetchResults(searchTerm)
    }

    fetchResults = (searchTerm: string) => {
        this.setState({ loading: true })
        const url = searchTerm
            ? `https://pokeapi.co/api/v2/pokemon/${searchTerm}`
            : `https://pokeapi.co/api/v2/pokemon?limit=20`

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'Something went wrong! Network response was not ok!',
                    )
                }
                return response.json()
            })
            .then((data) => {
                if (searchTerm) {
                    this.setState({
                        results: [
                            {
                                name: data.name,
                                description: `Height: ${data.height}, Weight: ${data.weight}`,
                            },
                        ],
                        loading: false,
                    })
                } else {
                    const results = data.results.map(
                        (item: { name: string; url: string }) => ({
                            name: item.name,
                            description: item.url,
                        }),
                    )
                    this.setState({ results, loading: false })
                }
            })
            .catch((error) => this.setState({ error, loading: false }))
    }

    handleSearch = (searchTerm: string) => {
        this.fetchResults(searchTerm)
    }

    throwError = () => {
        this.setState({ testError: true })
        throw new Error('This is test error!')
    }

    render() {
        const { results, loading, error, testError } = this.state

        return (
            <ErrorBoundary>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                    }}
                >
                    <div className="search-wrapper">
                        <Search onSearch={this.handleSearch} />
                        <button className="error-btn" onClick={this.throwError}>
                            Throw Error
                        </button>
                    </div>
                    <div
                        style={{
                            flex: '1 1 80%',
                            overflowY: 'auto',
                            padding: '10px',
                        }}
                    >
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <p>Error loading results: {error.message}</p>
                        ) : testError ? (
                            <p>Test error</p>
                        ) : (
                            <Results results={results} />
                        )}
                    </div>
                </div>
            </ErrorBoundary>
        )
    }
}

export default App
