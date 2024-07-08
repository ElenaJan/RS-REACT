import React, { useState, useEffect, useCallback } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import ErrorBoundary from './components/ErrorBoundary'
import Loader from './components/Loader'
import usePersistentSearch from './hooks/usePersistentSearch'
import './App.css'

interface Result {
    name: string
    description: string
}

const App: React.FC = () => {
    const [results, setResults] = useState<Result[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [searchTerm, setSearchTerm] = usePersistentSearch('searchTerm')
    const [testError, setTestError] = useState<boolean>(false)

    const fetchResults = useCallback((searchTerm: string) => {
        setLoading(true)
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
                    setResults([
                        {
                            name: data.name,
                            description: `Height: ${data.height}, Weight: ${data.weight}`,
                        },
                    ])
                } else {
                    const results = data.results.map(
                        (item: { name: string; url: string }) => ({
                            name: item.name,
                            description: item.url,
                        }),
                    )
                    setResults(results)
                }
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetchResults(searchTerm)
    }, [searchTerm, fetchResults])

    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm)
    }

    const throwError = () => {
        setTestError(true)
        throw new Error('This is a test error!')
    }

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
                    <Search onSearch={handleSearch} />
                    <button className="error-btn" onClick={throwError}>
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

export default App
