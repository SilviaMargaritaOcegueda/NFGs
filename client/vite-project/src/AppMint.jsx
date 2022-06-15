//To use different elements of state in our Components
import React,{ useState } from 'react';
import './App.css';
import MintInfo from './MintInfo';
import NavBar from './NavBar';

function AppMint() {
  //useState is a hook in React
  //useState tells React whenever accounts/setAccounts value changes, to render the appropriate element
  //Any visual element that change anything, that updates in the UI due to some button-click
  //* or some info. update 
  const [accounts, setAccounts] = useState([])

  return (
    <div className="overlay">
      <div className="App">
        <NavBar accounts = {accounts} setAccounts = {setAccounts} />
        <MintInfo accounts = {accounts} setAccounts = {setAccounts} />
      </div>
      <div className="moving-background"></div>
    </div>
  )
}

export default AppMint
