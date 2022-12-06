import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({ location }) => {
    return (
        <div>
            <section className='listResidents' >    {
                location?.residents?.map(urlResident => (
                    <ResidentCard key={urlResident} urlResident={urlResident} />
                ))
            }
            </section>
        </div>
    )
}

export default ResidentList