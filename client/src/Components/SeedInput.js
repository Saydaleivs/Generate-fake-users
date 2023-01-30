import React, { useState } from 'react'
import { Button } from '@mui/material'
import useGenerateUsers from '../Hooks/useGenerateUsers'

export const SeedInput = ({
  details,
  setDetails,
  setPageNumber,
  pageNumber,
  isGenerated,
  setIsGenerated,
}) => {
  useGenerateUsers(details, pageNumber)
  const generateUsers = () => {
    setIsGenerated(true)
    setPageNumber(1)
  }

  const handleChange = (e) => {
    setDetails({ ...details, seed: e.target.value })
  }

  return (
    <div className='generate-wrapper'>
      <input
        type='number'
        placeholder='Enter seed'
        onChange={handleChange}
        value={details.seed}
        id='seed-input'
      />
      <Button
        variant='contained'
        disabled={isGenerated}
        onClick={generateUsers}
      >
        Generate
      </Button>
    </div>
  )
}
