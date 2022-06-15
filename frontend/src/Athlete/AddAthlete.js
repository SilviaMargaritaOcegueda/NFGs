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
                    placeholder="Hans Wurst"
                    id="athleteName"
                    aria-describedby="Name of Athlete"
                    value={athleteName}
                    onChange={(e) => setAthleteName(e.target.value)}
                />
                <Form.Text id="athleteNameText" muted>
                    Enter the name of an athlete.
                </Form.Text>
                </Col>
                <Col xs={3}>
                <Form.Label htmlFor="walletAddress">Wallet address of athlete</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="1bZUbklDGhuilHUliWZseasAhKhASAZ"
                    id="walletAddress"
                    aria-describedby="Wallet Adresse"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}            
                />
                <Form.Text id="walletAddressText" muted>
                    Enter the Wallet-Address
                </Form.Text>
                </Col>
                <Col xs={4}>&nbsp;</Col>
                <Col xs={2}>
                <Button variant="primary" style={{width: '100%'}} onClick={(e) => {
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
