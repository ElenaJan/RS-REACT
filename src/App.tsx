import React from 'react'
import Search from './components/Search'
import Results from './components/Results'
import ErrorBoundary from './components/ErrorBoundary'
import NotFound from './components/NotFound'
import './App.css'
import usePersistentSearch from './hooks/usePersistentSearch'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = usePersistentSearch('searchTerm')

    const handleSearch = (searchTerm: string) => {
        console.log(searchTerm)
        setSearchTerm(searchTerm)
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
                </div>
                <div style={{ flex: '1 1 80%', padding: '10px' }}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Results search={searchTerm} />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default App
