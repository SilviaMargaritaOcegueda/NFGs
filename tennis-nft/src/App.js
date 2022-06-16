import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ethers } from "ethers";
import { Button } from 'react-bootstrap'
import AthleteList from './Athlete/AthleteList';
import AddAthlete from './Athlete/AddAthlete';
import Mint from './Mint/Mint';
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
    async function getAthletesFromClub() {
      if (window.etherum) {
        const provider = new ethers.providers.Web3Provider(window.etherum);
        console.log("Here are the providers", provider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            clubContract.abi,
            signer
        );
        try {
          const response = await contract.athletes();
          console.log("response: ", response);
        } catch (err) {
          console.log("error: ", err)
        }
      }
    }
    getAthletesFromClub();
    data.push({athleteName: "Gandalf", tournamentsPlayed: 10, numberOfPoints: 300, walletAddress: 'asdasdasdasd', athleteId: '100'})
    data.push({athleteName: "Saruman", tournamentsPlayed: 5, numberOfPoints: 100, walletAddress: 'jhgjgjhgjhgjh', athleteId: '100'})

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
            const response = await contract.registerAthlete(athleteNameBytes32, walletAddress);
            
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
        <div className="text-center">
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
