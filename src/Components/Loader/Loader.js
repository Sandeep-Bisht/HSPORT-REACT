import React, { useState } from 'react'
import { Waveform } from '@uiball/loaders'

function Loader() {
    const [isLoading,setIsLoading]=useState(true);
  return (
    <div aria-live="polite" aria-busy={isLoading}>
    <Waveform />
    </div>
  )
}

export default Loader