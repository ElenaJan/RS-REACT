import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Pagination from './Pagination'
import Loader from './Loader'
import Details from './Details'

interface Result {
    name: string
    description: string
}

const Results: React.FC = (props) => {
    const [results, setResults] = useState<Result[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [selectedResult, setSelectedResult] = useState<Result | null>(null)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const page = parseInt(searchParams.get('page') || '1', 10)
        const fetchResults = (page: number) => {
            setLoading(true)
            let url: string = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`

            if (props.search) {
                url = `https://pokeapi.co/api/v2/pokemon/${props.search}`
            }

            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error('No cards available!')
                        } else {
                            throw new Error(
                                'Something went wrong! Network response was not ok!',
                            )
                        }
                    }
                    return response.json()
                })
                .then((data) => {
                    if (!props.search) {
                        const results = data.results.map(
                            (item: { name: string; url: string }) => ({
                                name: item.name,
                                description: item.url,
                            }),
                        )
                        setResults(results)
                        setTotalPages(Math.ceil(data.count / 20))
                    } else {
                        const results = [
                            {
                                name: data.name,
                                description: data.description,
                            },
                        ]
                        setResults(results)
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setError(error)
                    setLoading(false)
                })
        }
        if (props.search) {
            fetchResults(1)
        } else {
            fetchResults(page)
        }
    }, [location, props])

    const handleResultClick = (result: Result) => {
        setSelectedResult(result)
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('details', result.name)
        navigate({ search: searchParams.toString() })
    }

    const handleCloseDetails = () => {
        setSelectedResult(null)
        const searchParams = new URLSearchParams(location.search)
        searchParams.delete('details')
        navigate({ search: searchParams.toString() })
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <p>Error loading results: {error.message}</p>
            ) : (
                <>
                    <div className="results">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                onClick={() => handleResultClick(result)}
                            >
                                <h3 className="result__name">{result.name}</h3>
                                <p className="result__description">
                                    {result.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    {results.length > 1 && (
                        <Pagination
                            currentPage={parseInt(
                                new URLSearchParams(location.search).get(
                                    'page',
                                ) || '1',
                            )}
                            totalPages={totalPages}
                        />
                    )}
                    {selectedResult && (
                        <Details
                            itemName={selectedResult.name}
                            onClose={handleCloseDetails}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default Results
