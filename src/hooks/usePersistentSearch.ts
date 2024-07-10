import { useState, useCallback } from 'react'

const usePersistentSearch = (key: string, defaultValue: string = '') => {
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem(key) || defaultValue
    })

    localStorage.setItem('searchTerm', searchTerm)

    const updateSearchTerm = useCallback(
        (newTerm: string) => {
            localStorage.setItem('searchTerm', searchTerm)
            setSearchTerm(newTerm)
        },
        [searchTerm],
    )

    return [searchTerm, updateSearchTerm] as const
}

export default usePersistentSearch
