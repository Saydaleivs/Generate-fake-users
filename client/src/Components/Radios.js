import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function Radios({ details, setDetails }) {
  const handleChange = (e) => {
    setDetails({ ...details, locale: e.target.value })
  }

  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'>Region</FormLabel>
      <RadioGroup
        aria-labelledby='demo-radio-buttons-group-label'
        defaultValue='female'
        value={details.locale}
        onChange={handleChange}
        name='radio-buttons-group'
        style={{ display: 'block' }}
      >
        <FormControlLabel value='en' control={<Radio />} label='English' />
        <FormControlLabel value='ru' control={<Radio />} label='Russian' />
        <FormControlLabel value='ar' control={<Radio />} label='Arabic' />
      </RadioGroup>
    </FormControl>
  )
}
