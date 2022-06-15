import React from 'react'
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap'
//To connect to our TennisNFT contract using the JSON file
import tennisNFT from '../artifacts/contracts/TennisNFT.sol/TennisNFT.json';

//ethers package allows you to connect to the blockchain easily
const {ethers} = require("ethers");


//Contract Address of TennisNFT
const tennisNFTAddress = "0xeabde8c2cE3B0894E32CeC1d12126ec03399ade0";

const MainMint = ( { accounts, setAccounts } ) => {
    //To determine the number of NFTs the user has selected to mint
    //useState(0) since the tokenID begins with 0
    const mintAmount = useState(0);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if(window.ethereum) {
            //If the user is connected
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //Whenever we need to do a transaction, we need a signer to sign the transactions
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                tennisNFTAddress,
                tennisNFT.abi,
                signer
            );
            try {
                //Call the mint() function of your TennisNFT contract
                //const response = await contract.mint(BigNumber.from(mintAmount));
               // console.log("response: ", response);
            } catch (err) {
                console.error("error", err);
            }
            
        }
    }

      
    return (
        <div>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}>
                     <p>Encouraging amateur tennis players with NFTs to boost their performance.</p>
                </Col>
                <Col xs={2}></Col>
            </Row>
            <br />
            
            {isConnected ? (
                <div>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={8}>
                            <p>Enter the tokenID and the number of tokens you want to mint</p>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    
                    <br />
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={2}>White NFT - 0</Col>
                        <Col xs={2}>Bronze NFT - 1</Col>
                        <Col xs={2}>Silver NFT - 2</Col>
                        <Col xs={2}>Gold NFT - 3</Col>
                        <Col xs={2}></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={2}>
                            <p>TokenID: </p>
                        </Col>
                        <Col xs={2}>
                            <input type="number" id="tokenID" style={{width: '100%'}}/>
                        </Col>
                        
                        <Col xs={2}>
                            <p>Amount</p>
                        </Col>
                        <Col xs={2}>
                            <input type="number" id="amount" style={{width: '100%'}}/>
                        </Col>
                        <Col xs={2}></Col>
                    </Row>
                    <Row>
                        <Col xs={3}></Col>
                        <Col xs={6}>
                            <Button variant="danger" style={{width: '100%'}} onClick={ handleMint }>Mint Now</Button>
                        </Col>
                        <Col xs={3}></Col>
                    </Row>
                </div>
            
            ) : (
                <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                    <p>You must be connected to mint</p>
                </Col>
                <Col xs={3}></Col>
            </Row>  
            )}
                
         </div>
                 
    )};

export default MainMint;
