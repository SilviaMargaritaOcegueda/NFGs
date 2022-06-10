import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
//import MainMint from './MainMint';
//import NavBar from './NavBar';

function App() {
  const [accounts, setAccounts] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        
      </header>
    </div>
  )
}

export default App
