import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Spotify from './Spotify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h2>React JSON</h2>
        <h1> <Spotify/> </h1>
      </div>
    </>
  )
}

export default App
