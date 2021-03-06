import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { ethers } from 'ethers';
import clubContract from '../Club.json';
const BigNumber = ethers.BigNumber;

function Athlete(props) {

    const [addTurnamentsPlayed, setAddTurnamentsPlayed] = useState()
    const [addPoints, setAddPoints] = useState()

    const CONTRACT_ADDRESS = "0x5cd66afD0E38E60Dbfc8e9bBa7fa081A65E208c5";

    let addData = () => {
        //send data to wallet
        console.log("Value of ID", props.athleteData.athleteId);
        const _id = BigNumber.from(props.athleteData.athleteId);
        const _addTurnamentsPlayed = addTurnamentsPlayed;
        const _addPoints = addPoints;
        async function incrementRecords() {
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
                const athelteIdFromContract = contract.on("AthleteRecordsUpdated", (athleteId, event) => {
                });
                console.log("This is the formated event number", athelteIdFromContract )
                try {
                  const response = await contract.incrementRecords(_id, _addTurnamentsPlayed, _addPoints);                 
                  await response.wait()
                  props.refreshPlayer()
                  console.log("response: ", response);
                } catch (err) {
                  console.log("error: ", err)
                }
              }
          }
        // --> addTurnamentsPlayed
        // --> addPoints
        incrementRecords();
        // check if "" is the same as 0 -> if not -> add function emptyStringToZero
        setAddTurnamentsPlayed("")
        setAddPoints("")
        
    }

    return (
        <div>
            <Row>
                <Col xs={3}><b>{props.athleteData.athleteName}</b></Col>
                <Col xs={2}></Col>
                <Col xs={3}>Increase attendance records</Col>
            </Row>
            <Row>
                <Col xs={3}>Tournaments played</Col>
                <Col xs={2}>{props.athleteData.tournamentsPlayed}</Col>
                <Col xs={3}>
                <Form.Control
                    type="number"
                    placeholder="Add value"
                    id="addTurnaments"
                    aria-describedby="Add Turnaments"
                    value={addTurnamentsPlayed}
                    onChange={(e) => setAddTurnamentsPlayed(e.target.value)}            
                />
                </Col>
            </Row>
            <Row>
                <Col xs={3}>Training Sessions</Col>
                <Col xs={2}>{props.athleteData.numberOfPoints}</Col>
                <Col xs={3}>
                    <Form.Control
                        type="number"
                        placeholder="Add value"
                        id="addPoints"
                        aria-describedby="Add Points"
                        value={addPoints}
                        onChange={(e) => setAddPoints(e.target.value)}            
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={3}>ID</Col>
                <Col xs={2}>{props.athleteData.athleteId}</Col>
                <Col xs={3}>
                    <Button variant="primary" style={{width: '100%', backgroundColor: "#5c2dbf" , borderColor: "#303030"}} onClick={(e) => addData()}>Save</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Athlete
