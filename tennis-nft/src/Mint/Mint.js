import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

function Mint(props) {
    return (
        <Row>
            <Col xs={10}>Mint all NFTs and reset records to start the new season</Col>
            <Col xs={2}>
            <Button variant="primary" style={{width: '100%', backgroundColor: "#5c2dbf" , borderColor: "#303030"}} onClick={(e) => props.mintBatch()}>Mint and Reset</Button>
            </Col>
        </Row>
    )
}

export default Mint
