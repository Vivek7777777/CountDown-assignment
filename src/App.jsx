import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Countdown from 'react-countdown'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>hi</h1>
      <Countdown date={Date.now() + 100000} />
    </>
  )
}

export default App
