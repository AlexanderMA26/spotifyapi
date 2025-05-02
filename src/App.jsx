import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//import Spotify from './Spotify'
import Code from './code'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <h2>React JSON</h2>
        <Code/>
      </div>
    </>
  )
}

export default App
