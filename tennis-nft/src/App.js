import { Container, Col, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap'
import AthleteList from './Athlete/AthleteList';
import AddAthlete from './Athlete/AddAthlete';
import Mint from './Mint/Mint';
import './App.css'
import logo from './tennis.png'

// import our contract json to use it for ABI
import clubContract from './Club.json';
const utils = ethers.utils;
const BigNumber = ethers.BigNumber;

function App() {
    

  const [athletes, setAthletes] = useState([])
  const [accouts, setAccouts] = useState([])
  const [accounts, setAccounts] = useState(0)
  // to conncet with meta mask
  const [isConnected, setIsConnected] = useState(false)
  const CONTRACT_ADDRESS = "0x5cd66afD0E38E60Dbfc8e9bBa7fa081A65E208c5";

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
        console.log("This are the accounts from meta mask", accounts)
    }
}

  useEffect(() => {
    const data = []
    const isConnceted = Boolean(accounts[0]);
    // check if meta mask is conncetd
    console.log("Vor der Async FUnction in useeffect")
    async function getAthletesFromClub() {
      console.log("In use effect")
      const {ethereum} = window

      if (ethereum) {
        console.log("In window")
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("Here are the providers", provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            clubContract.abi,
            signer
        );
        try {
          const counterAtheltes = await contract.idCounter();
          console.log("das sien die Athelten im contract:", counterAtheltes);
          for (let i = 0; i < counterAtheltes; i++) {
            const response = await contract.athletes(i);
            let _athelteId = (response[0]).toNumber();
            let _athelteName = utils.parseBytes32String(response[1]);
            let _walletAddress = response[2];
            let _tournaments = response[4];
            let _trainings = response[5];
            data.push({athleteName: _athelteName, tournamentsPlayed: _tournaments, numberOfPoints: _trainings, walletAddress: _walletAddress, athleteId: _athelteId})
            console.log("response: ", response);
          }

          
        } catch (err) {
          console.log("error: ", err)
        }
      }
    }
    const result = getAthletesFromClub()
      .catch(console.error);
    //data.push({athleteName: "Gandalf", tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: 'asdasdasdasd', athleteId: '100'})
    //data.push({athleteName: "Saruman", tournamentsPlayed: 5, numberOfPoints: 100, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})

    //console.log(result)
    return () => {
      setAthletes(data)
    }
  }, [])

  let addAthlete = (athleteName, walletAddress) => {
    const data = []
    //const isConnceted = Boolean(accounts[0]);
    const athleteNameBytes32 = utils.formatBytes32String(athleteName);
    console.log("atehlet name", athleteNameBytes32);
    // check if meta mask is conncetd
    async function setAthletesInClub() {
      console.log("inside async setAthletesInClub");
      // let exampleBignumer = BigNumber.from('2845823');
      // let numberFromexampleBigNumber = exampleBignumer.toNumber();
      // console.log("das ist eine bignumer",  numberFromexampleBigNumber);
      // console.log("inside async setAthletesInClub accounts", accounts);
      const {ethereum} = window
        if (ethereum) {
          console.log("inside if")
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
              CONTRACT_ADDRESS,
              clubContract.abi,
              signer
          );
          const athelteIdFromContract = contract.on("NewAthlete", (athleteId, event) => {
          });
          console.log("This is the formated event number", athelteIdFromContract )
          try {
            const response = await contract.callStatic.registerAthlete(athleteNameBytes32, walletAddress);
            
            await response.wait()
            console.log("response: ", response);
            data.push(...athletes) //pushes every single value from athletes to data array
            data.push({athleteName: athleteName, tournamentsPlayed: 0, numberOfPoints: 0, walletAddress: walletAddress, athleteId: 1})
            setAthletes(data)
          } catch (err) {
            console.log("error: ", err)
          }
        }
    }
    console.log("before async setAthletesInClub");
    setAthletesInClub();
    console.log("after async setAthletesInClub");

    
  }

  let refreshPlayer = () => {

    const data = []
    async function refreshPlayerIncrements() {
      const {ethereum} = window
      console.log("Refresh player wird aufgerufen")
      if (ethereum) {
        console.log("In window")
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log("Here are the providers", provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            clubContract.abi,
            signer
        );
        try {
          const counterAtheltes = await contract.idCounter();
          console.log("das sien die Athelten im contract:", counterAtheltes);
          for (let i = 0; i < counterAtheltes; i++) {
            const response = await contract.athletes(i);
            let _athelteId = (response[0]).toNumber();
            let _athelteName = utils.parseBytes32String(response[1]);
            let _walletAddress = response[2];
            let _tournaments = response[4];
            let _trainings = response[5];
            data.push({athleteName: _athelteName, tournamentsPlayed: _tournaments, numberOfPoints: _trainings, walletAddress: _walletAddress, athleteId: _athelteId})
            console.log("response: ", response);
          }
          console.log(data);
          console.log("Setting data in Frontend: ");
          setAthletes(data)

          
        } catch (err) {
          console.log("error: ", err)
        }
      }
    }
    const result = refreshPlayerIncrements()
      .catch(console.error);

  }

  let mintBatch = () => {
    async function handleMint(){
      // if meta mask wallet is connctected
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            clubContract.abi,
            signer
        );
          try {
              const response = await contract.callStatic.mintAndResetRecords();
              await response.wait()
              console.log('response:', response);
          } catch (err) {
              console.log("error", err )
          }
      }
      
    }
    handleMint();
    //do the magic
    console.log("Test")
    //refreshPlayer()
  }

  return (
    <Container fluid className='App'>
    <Container className='App-container'>
      <Row><Col xs={10}>&nbsp;</Col></Row>
      <Row>
        <Col xs={4}>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
        <Col xs={6}>&nbsp;</Col>
        <Col xs={2}>
       
        {isConnceted ? (
                <p>Connected</p>
                ) : (
                <Button variant="primary" style={{width: '100%', backgroundColor: "#5c2dbf", borderColor: "#303030"}} onClick={(e) => {
                    connectAccount()}}>Conncet Wallet</Button>
                    )}

        </Col>
      </Row>
      <div style={{textAlign: 'center'}}> <h1>AMATEUR ATHLETES NFTs</h1></div>
      <div style={{textAlign: 'center'}}> <h2>Reward athletes like a pro</h2></div>
      <hr />
      <AddAthlete addAthlete={addAthlete} />
      <hr />
      <Mint mintBatch={mintBatch}/>
      <hr />
      <AthleteList athletes={athletes} refreshPlayer={refreshPlayer} />
      </Container>
    </Container>
  );
}

export default App;
