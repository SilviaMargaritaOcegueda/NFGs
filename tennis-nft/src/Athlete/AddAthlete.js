import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useState } from 'react'

function AddAthlete(props) {

    const [athleteName, setAthleteName] = useState("")
    const [walletAddress, setWalletAddress] = useState("")

    return (
        <div>
            <Row>
                <Col xs={3}>
                <Form.Label htmlFor="athleteName">Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the name of the athlete"
                    id="athleteName"
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                />
                <Form.Text id="athleteNameText" muted>
                </Form.Text>
                </Col>
                <Col xs={4}>
                <Form.Label htmlFor="walletAddress">Wallet address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter athlete's Metamask wallet address"
                    id="walletAddress"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}            
                />
                <Form.Text id="walletAddressText" muted>
                </Form.Text>
                </Col>
                <Col xs={3}>&nbsp;</Col>
                <Col xs={2}>
                <Button variant="primary" style={{width: '100%', backgroundColor: "#5c2dbf" , borderColor: "#303030"}} onClick={(e) => {
                    props.addAthlete(athleteName, walletAddress)
                    setAthleteName("")
                    setWalletAddress("")
                }}>Add Athlete</Button>
                </Col>
            </Row>
        </div>
    )
}

export default AddAthlete
