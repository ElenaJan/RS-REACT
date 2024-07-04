import { Component } from 'react'

interface Result {
    name: string
    description: string
}

interface ResultsProps {
    results: Result[]
}

class Results extends Component<ResultsProps> {
    render() {
        const { results } = this.props
        console.log(results)

        return (
            <div>
                {results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    results.map((result, index) => (
                        <div key={index}>
                            <h3 className="result__name">{result.name}</h3>
                            <p className="result__description">
                                {result.description}
                            </p>
                        </div>
                    ))
                )}
            </div>
        )
    }
}

export default Results
