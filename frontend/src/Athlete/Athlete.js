import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useState } from 'react'

function Athlete(props) {

    const [addTurnamentsPlayed, setAddTurnamentsPlayed] = useState()
    const [addPoints, setAddPoints] = useState()

    let addData = () => {
        //send data to wallet
        // --> addTurnamentsPlayed
        // --> addPoints
        // check if "" is the same as 0 -> if not -> add function emptyStringToZero
        setAddTurnamentsPlayed("")
        setAddPoints("")
        props.refreshPlayer()
    }

    return (
        <div>
            <div><b>{props.athleteData.athleteName}</b></div>
            <Row>
                <Col xs={3}>Turnaments played</Col>
                <Col xs={1}>{props.athleteData.tournamentsPlayed}</Col>
                <Col xs={2}>
                <Form.Control
                    type="number"
                    placeholder="10"
                    id="addTurnaments"
                    aria-describedby="Add Turnaments"
                    value={addTurnamentsPlayed}
                    onChange={(e) => setAddTurnamentsPlayed(e.target.value)}            
                />
                </Col>
            </Row>
            <Row>
                <Col xs={3}>Number of Points</Col>
                <Col xs={1}>{props.athleteData.numberOfPoints}</Col>
                <Col xs={2}>
                    <Form.Control
                        type="number"
                        placeholder="10"
                        id="addPoints"
                        aria-describedby="Add Points"
                        value={addPoints}
                        onChange={(e) => setAddPoints(e.target.value)}            
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={3}>Athlete ID</Col>
                <Col xs={1}>{props.athleteData.athleteId}</Col>
                <Col xs={2}>
                    <Button variant="primary" style={{width: '100%'}} onClick={(e) => addData()}>Add Values</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Athlete
