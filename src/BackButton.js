import { Button } from '@mui/material'
import React from 'react'

export default function BackButton() {
  return (
    <div>
        <Button sx={{position: 'absolute' }}><img className='back' src="/img/back.png"  /></Button>
    </div>
  )
}
