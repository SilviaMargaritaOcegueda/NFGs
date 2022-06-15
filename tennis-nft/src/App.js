import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
//import { ethers } from "ethers";
import { Button } from 'react-bootstrap'
import AthleteList from './Athlete/AthleteList';
import AddAthlete from './Athlete/AddAthlete';
import Mint from './Mint/Mint';
//import CONTRACT_ABI from Club.json

function App() {
    

  const [athletes, setAthletes] = useState([])
  const [accouts, setAccouts] = useState([])
  const [accounts, setAccounts] = useState(0)
  // to conncet with meta mask
  const [isConnected, setIsConnected] = useState(false)
  const CONTRACT_ADDRESS = "0xcDCa1E4136ea3992d46a9A293a51eD0C3505115d";

  const isConnceted = Boolean(accounts[0]);
  async function connectAccount(){
    // check if meta mask is there
    if (window.ethereum) {
        // grab accounts that comes from the meta mask (all of them)
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        // set accounts to accounts from meta mask
        setAccounts(accounts)
        //console.log("This are the accounts from meta mask", accounts)
    }
}

  useEffect(() => {
    const data = []
    // const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); //Copy-paste the contract ABI
    // if (window.etherum) {

    // }
    data.push({athleteName: "Gandalf", tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: 'asdasdasdasd', athleteId: '100'})
    data.push({athleteName: "Saruman", tournamentsPlayed: 5, numberOfPoints: 100, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})

    return () => {
      setAthletes(data)
    }
  }, [])

  let addAthlete = (athleteName, walletAddress) => {
    const data = []
    data.push(...athletes) //pushes every single value from athletes to data array
    data.push({athleteName: athleteName, tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: walletAddress, athleteId: '100'})
    setAthletes(data)
  }

  let refreshPlayer = () => {
    const data = []
    data.push({athleteName: "Gandalf", tournamentsPlayed: 11, numberOfPoints: 3000, walletAddress: 'asdasdasdasd', athleteId: '100'})
    data.push({athleteName: "Saruman", tournamentsPlayed: 6, numberOfPoints: 30, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})
    //reload atheletes from fox
    //data.push(fox data)
    setAthletes(data)

  }

  let mintBatch = () => {
    //do the magic
    console.log("Test")
    //refreshPlayer()
  }

  return (
    <Container>
        <div class="text-center">
        {isConnceted ? (
                <p>Connected</p>
                ) : (
                <Button style={{width: '100%'}} onClick={(e) => {
                    connectAccount()}}>Conncet Wallet</Button>
                    )}
        </div>
      <div style={{textAlign: 'center'}}>Tennis NFT</div>
      <div style={{textAlign: 'center'}}>Problem description</div>
      <hr />
      <AthleteList athletes={athletes} refreshPlayer={refreshPlayer} />
      <hr />
      <Mint mintBatch={mintBatch}/>
      <hr />
      <AddAthlete addAthlete={addAthlete} />
      
    </Container>
  );
}

export default App;
