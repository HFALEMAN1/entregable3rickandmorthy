import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'




const ResidentCard = ({ urlResident }) => {

    const [resident, setResident] = useState()


    useEffect(() => {

        axios.get(urlResident)
            .then(res => {

                setResident(res.data)

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <article className='cards--Residenst' >



            <header className='cards--resident_header' >
                <img src={resident?.image} alt="" />
                <div className='cards--resident_status'>

                    <div className={`circle ${resident?.status}`} >

                    </div>
                    <span>{resident?.status} </span>


                </div>
            </header>
            <section className='cards--resident_body' >
                <h2 className='title--card'>{resident?.name} </h2>
                <hr className={` linea ${resident?.status}`} />
                <ul>
                    <li>Specie: {resident?.species}  </li>
                    <li>Origin: {resident?.origin.name}  </li>
                    <li>Episodes: {resident?.episode.length} </li>
                </ul>
            </section>




        </article>
    )
}

export default ResidentCard