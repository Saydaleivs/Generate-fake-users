import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { FormLabel } from '@mui/material'

export default function ErrorSlider({ details, setDetails }) {
  const handleChange = (e) => {
    setDetails({ ...details, error: e.target.value })
  }

  return (
    <>
      <Box sx={{ width: 300 }} id='demo-radio-buttons-group-label'>
        <FormLabel id='demo-radio-buttons-group-label'>Errors</FormLabel>
        <Slider
          aria-label='Small steps'
          defaultValue={0}
          value={details.error}
          onChange={handleChange}
          step={0.5}
          marks
          min={0}
          max={10}
          valueLabelDisplay='auto'
        />
      </Box>
    </>
  )
}
