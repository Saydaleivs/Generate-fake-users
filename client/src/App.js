import { useState } from 'react'
import ErrorSlider from './Components/ErrorSlider'
import Radios from './Components/Radios'
import { SeedInput } from './Components/SeedInput'
import BasicTable from './Components/TheTable'
import './App.css'

function App() {
  const [isGenerated, setIsGenerated] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [details, setLimits] = useState({
    seed: 1,
    locale: 'en',
    pageNumber,
    error: 0,
  })

  const setDetails = (info) => {
    setIsGenerated(false)
    setLimits(info)
  }

  return (
    <>
      <SeedInput
        setDetails={setDetails}
        details={details}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        isGenerated={isGenerated}
        setIsGenerated={setIsGenerated}
      />
      <div className='flex'>
        <Radios setDetails={setDetails} details={details} />
        <ErrorSlider setDetails={setDetails} details={details} />
      </div>
      <BasicTable
        details={details}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  )
}

export default App
