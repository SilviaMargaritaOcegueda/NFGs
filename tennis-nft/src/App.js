import { Container, Alert } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import AthleteList from './Athlete/AthleteList';
import AddAthlete from './Athlete/AddAthlete';
import Mint from './Mint/Mint';

function App() {

  const [athletes, setAthletes] = useState([])
  const [accouts, setAccouts] = useState([])
  const [accounts, setAccounts] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // setting isConnceted to 0 for not connected to wallet
    const isConnceted = Boolean(accounts[0]);
    /// Do the Fox work
    async function connectAccount(){
        // check if meta mask is there
        if (window.ethereum) {
            // grab accounts that comes from the meta mask (all of them)
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            // set accounts to accounts from meta mask
            setIsConnected(accounts)
        }
    }
    const connected = true
    return () => {
      
      setAccouts(["test"]);
      setIsConnected(connected)
      console.log(isConnected)
    }
  }, [])

  useEffect(() => {
    const data = []
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
        {isConnceted ? (
            <p>Connected</p>
        ) : (
            <button onClick={connectAccount}>Connected</button>
         )}
      <div style={{textAlign: 'center'}}>Tennis NFT</div>
      <div style={{textAlign: 'center'}}>Problem description</div>
      <Alert variant="danger">Fox is not connected</Alert>
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
