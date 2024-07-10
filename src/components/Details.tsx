import React, { useEffect, useState } from 'react'

interface DetailsProps {
    itemName: string
}

const Details: React.FC<DetailsProps> = ({ itemName, onClose }) => {
    const [item, setItem] = useState({ name: itemName })
    const fetchInfo = async () => {
        const url: string = `https://pokeapi.co/api/v2/pokemon/${itemName}`

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
                setItem({
                    name: data.name,
                    height: data.height,
                    weight: data.weight,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        fetchInfo()
    }, [itemName])

    const closeInfo = () => {
        onClose()
    }
    return (
        <div className="details">
            <h2>Details for {item.name}</h2>
            {item?.height && <p>Height: {item?.height}</p>}
            {item?.weight && <p>Weight: {item?.weight}</p>}
            <button onClick={closeInfo}>Close</button>
        </div>
    )
}

export default Details
