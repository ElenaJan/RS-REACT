// src/components/Pagination.tsx
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface PaginationProps {
    currentPage: number
    totalPages: number
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const handlePageChange = (page: number) => {
        const searchParams = new URLSearchParams(location.search)
        searchParams.set('page', page.toString())
        navigate({ search: searchParams.toString() })
    }

    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1
                return (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={page === currentPage}
                        className={page === currentPage ? 'active' : ''}
                    >
                        {page}
                    </button>
                )
            })}
        </div>
    )
}

export default Pagination
