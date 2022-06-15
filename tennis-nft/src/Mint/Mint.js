import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

function Mint(props) {
    return (
        <Row>
            <Col xs={10}>&nbsp;</Col>
            <Col xs={2}>
            <Button variant="primary" style={{width: '100%'}} onClick={(e) => props.mintBatch()}>Mint Batch</Button>
            </Col>
        </Row>
    )
}

export default Mint
