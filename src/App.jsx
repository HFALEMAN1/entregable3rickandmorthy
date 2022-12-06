import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationFilter from './components/LocationFilter'
import LocationIfo from './components/LocationIfo'
import ResidentList from './components/ResidentList'
import getRandomNumber from './utils/getRandomNumber'


function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState("")

  const getDataDimension = (idDimension) => {
    if (!idDimension) alert("ingrese un valor")
    const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => {
        console.log(err)
        alert("Esta dimencion aun no existe ")//cambiar alert 
      })
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





  return (
    <div className="App">

      <header className='header-principal'     >
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
      <ResidentList location={location} />


      {/* <div className='container--bubble'>
        <div className='bubbles'>
          <span style={'--i:13'}></span>
          <span style={'--i:24'}></span>
          <span style={'--i:18'}></span>
          <span style={'--i:16'}></span>

        </div>
      </div> */}

      <hr />


      <footer className='footer'>
        <div>

        </div>
      </footer>







    </div>
  )
}

export default App
