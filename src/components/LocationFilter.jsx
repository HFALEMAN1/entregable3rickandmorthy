import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({ locationName, getNewLocation }) => {

    const [locationOptions, setLocationOptions] = useState()


    useEffect(() => {

        const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`
        if (!locationName) return setLocationOptions()
        axios.get(URL)
            .then(res => setLocationOptions(res.data.results))
            .catch(err => console.log(err))
    }, [locationName])

    return (
        <ul className='results' >
            {
                locationOptions?.map((locationOption) =>
                    <li onClick={() => getNewLocation(locationOption.url, locationOption.name)}
                        key={locationOption.url}
                    >{locationOption.name} </li>)
            }

        </ul>
    )
}

export default LocationFilter