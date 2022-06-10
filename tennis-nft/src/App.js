import { useState } from 'react'
import logo from './tennis.png'
import './App.css'
//import MainMint from './MainMint';
import NavBar from './NavBar';
import MainMint from './MainMint';

const App = () => {
  const [accounts, setAccounts] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <NavBar accounts={accounts} setAccounts = {setAccounts} />
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <div>

        <p>Description from Jo-Ann about our problem and our solution ;)</p>
        <MainMint />
      </div>
      </header>
    </div>
  )
}

export default App
