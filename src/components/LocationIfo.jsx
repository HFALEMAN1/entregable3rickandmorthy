import React from 'react'

const LocationIfo = ({ location }) => {

    return (
        <article className='container--infoDimension' >
            <div className='prueba' >
                <h2 className='tittle--location'>{location?.name} </h2>
            </div>
            <ul className='lista--location' >
                <li className='listfloat' >Type: <span> {location?.type}  </span>  </li>
                <li className='listfloat--dimen' >Dimension: <span> {location?.dimension} </span>  </li>
                <li className='listfloat' >Population: <span> {location?.residents?.length}  </span>  </li>
            </ul>
        </article>
    )
}

export default LocationIfo