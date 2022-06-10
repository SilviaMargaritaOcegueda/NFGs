import { useState } from 'react'
import logo from './tennis.png'
import './App.css'
//import MainMint from './MainMint';
import { NavBar, MainMint} from './components';

const App = () => {
  const [accounts, setAccounts] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <NavBar accounts={accounts} setAccounts = {setAccounts} />
          <MainMint />
        </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Description from Jo-Ann about our problem and our solution ;)</p>
        {/*  */}
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        
      </header>
    </div>
  )
}

export default App
