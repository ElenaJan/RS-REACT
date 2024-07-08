import { useState, useEffect, useCallback } from 'react'

const usePersistentSearch = (key: string, defaultValue: string = '') => {
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem(key) || defaultValue
    })

    useEffect(() => {
        return () => {
            localStorage.setItem(key, searchTerm)
        }
    }, [key, searchTerm])

    const updateSearchTerm = useCallback((newTerm: string) => {
        setSearchTerm(newTerm)
    }, [])

    return [searchTerm, updateSearchTerm] as const
}

export default usePersistentSearch
