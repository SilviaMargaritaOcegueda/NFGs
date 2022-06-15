import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
// import AthleteList from './Athlete/AthleteList';
// import AddAthlete from './Athlete/AddAthlete';
import NavBar from './Components/NavBar';
import MainMint from './Components/MainMint';
// import Mint from './Mint/Mint';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
//import 'mdbreact/dist/css/mdb.css';
import './App.css';


function App() {

  const [accounts, setAccounts] = useState([])
  // const [athletes, setAthletes] = useState([])
  // const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    /// Do the Fox work

    // const connected = true
    return () => {
      
      setAccounts(["test"]);
      // setIsConnected(connected)
      // console.log(isConnected)
    }
  }, [])

  // useEffect(() => {
  //   const data = []
  //   data.push({athleteName: "Gandalf", tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: 'asdasdasdasd', athleteId: '100'})
  //   data.push({athleteName: "Saruman", tournamentsPlayed: 5, numberOfPoints: 100, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})

  //   return () => {
  //     setAthletes(data)
  //   }
  // }, [])

  // let addAthlete = (athleteName, walletAddress) => {
  //   const data = []
  //   data.push(...athletes) //pushes every single value from athletes to data array
  //   data.push({athleteName: athleteName, tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: walletAddress, athleteId: '100'})
  //   setAthletes(data)
  // }

  // let refreshPlayer = () => {
  //   const data = []
  //   data.push({athleteName: "Gandalf", tournamentsPlayed: 11, numberOfPoints: 3000, walletAddress: 'asdasdasdasd', athleteId: '100'})
  //   data.push({athleteName: "Saruman", tournamentsPlayed: 6, numberOfPoints: 30, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})
  //   //reload atheletes from fox
  //   //data.push(fox data)
  //   setAthletes(data)

  // }

  // let mintBatch = () => {
  //   //do the magic
  //   console.log("Test")
  //   //refreshPlayer()
  // }

  return (
    <Container>
      <div className="text-area">
          <NavBar accounts = {accounts} setAccounts = {setAccounts} />
          <MainMint accounts = {accounts} setAccounts = {setAccounts} />
          {/* <div style={{textAlign: 'center'}}>Tennis NFT</div>
          <div style={{textAlign: 'center'}}>Problem description</div>
          <Alert variant="danger">Fox is not connected</Alert>
          <hr />
          {isConnected && <AthleteList athletes={athletes} refreshPlayer={refreshPlayer} />}
          <hr />
          <Mint mintBatch={mintBatch}/>
          <hr />
          <AddAthlete addAthlete={addAthlete} /> */}

          <div className="moving-background"></div>
      </div>
    </Container>
  );
}

export default App;
