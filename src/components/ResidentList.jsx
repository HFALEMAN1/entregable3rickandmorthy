import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({ residentsFilter }) => {
    return (
        <div className=' container--residents      '    >
            <section className='listResidents ' >    {
                residentsFilter?.map(urlResident => (
                    <ResidentCard key={urlResident} urlResident={urlResident} />
                ))
            }
            </section>
        </div>
    )
}

export default ResidentList