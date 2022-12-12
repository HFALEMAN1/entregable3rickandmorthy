import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorMessage from './components/ErrorMessage'
import LocationFilter from './components/LocationFilter'
import LocationIfo from './components/LocationIfo'
import ResidentList from './components/ResidentList'
import getRandomNumber from './utils/getRandomNumber'

const RESIDENTPERPAGE = 10
function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState("")
  const [showError, setShowError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilter, setResidentsFilter] = useState([])


  const getDataDimension = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then(res => setLocation(res.data))
        .catch(err => {
          //Mensaje de error
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 3000);
          console.log(err)
        })
    } else {
      alert("Ingrese un Valor")
    }
  }




  useEffect(() => {
    const randomDimension = getRandomNumber()
    getDataDimension(randomDimension)

  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    const dimensionSearch = e.target.searchValue.value

    getDataDimension(dimensionSearch)

  }

  const handleChangeInput = (e) => {
    setLocationName(e.target.value)
  }

  const getNewLocation = (URL, name) => {
    setLocationName(name)
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
  }

  //Paginacion

  useEffect(() => {
    if (location) {

      const quantityResidents = location.residents.length
      const quantityPages = Math.ceil(quantityResidents / RESIDENTPERPAGE)
      setLastPage(quantityPages)
      setCurrentPage(1)

    }

  }, [location])

  const getAllPages = () => {
    const arrayPages = []
    for (let i = 1; i <= lastPage; i++) {
      arrayPages.push(i)
    }
    return arrayPages
  }

  useEffect(() => {
    const lastResidentCard = currentPage * RESIDENTPERPAGE
    const firstResidentCut = lastResidentCard - RESIDENTPERPAGE
    const newResidentsFilter = location?.residents.slice(firstResidentCut, lastResidentCard)
    setResidentsFilter(newResidentsFilter)
  }, [location, currentPage])

  return (
    <div className="App">

      <header className='header-principal '     >
        <form onSubmit={handleSubmit} >
          <input className='inp--search'
            id='searchValue'
            value={locationName}
            onChange={handleChangeInput}
            type="text"
            placeholder='Search your Dimension' autoComplete='off' />
          <button className='btn--search' type='submit'  > 🔍Search</button>
        </form>
        <div className='list--location--search'  >

          <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
        </div>
      </header>

      <LocationIfo location={location} />

      {
        showError ? <ErrorMessage /> : ""
      }
      <ul className='ul--green' >{
        getAllPages().map(page => (
          <li className='li--green' onClick={() => setCurrentPage(page)} key={page}   >{page}</li>
        ))
      } </ul>



      <ResidentList residentsFilter={residentsFilter} />


      <ul className='ul--green' >{
        getAllPages().map(page => (
          <li className='li--green' onClick={() => setCurrentPage(page)} key={page}   >{page}</li>
        ))
      } </ul>

      <hr />

      <footer >
        <div className='footer'>
          <p  >    Hecho con Amor <i class='bx bxs-heart'></i> con Academlo por
            <a className='green' target="_blank" href=" https://portfolio-hfaleman.netlify.app/ "> Hector Falcón</a> </p>
        </div>
      </footer>


    </div>


  )
}

export default App
