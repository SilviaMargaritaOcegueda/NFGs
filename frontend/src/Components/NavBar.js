import React from "react";
import { Button } from "react-bootstrap";
import Facebook from '../assets/social-media-icons/facebook_32x32.png'; 
import Twitter from '../assets/social-media-icons/twitter_32x32.png'; 
import Email from '../assets/social-media-icons/email_32x32.png'; 
import '../App.css';
//To connect to our TennisNFT contract using the JSON file
import tennisNFT from '../artifacts/contracts/TennisNFT.sol/TennisNFT.json';

const {ethers} = require("ethers");
//import { MDBBtn } from "mdbreact";

//Contract Address of TennisNFT
const tennisNFTAddress = "0xeabde8c2cE3B0894E32CeC1d12126ec03399ade0";


//Prop-drilling - Passing in state from the Top Component
const NavBar = ( { accounts, setAccounts } ) => {
    //accounts[0] will be the connected wallet's address
    //This will detect when we are connected vs. when we are not connected
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        //When using Metamask, Metamask injects the application with window.ethereum
        if(!window.ethereum) {
            //Check and grab the accounts that come from Metamask
            const accounts = await window.ethereum.request( {
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-around">
                <div className="p-2 col-example text-left">
                    <a href="https://www.facebook.com">
                            <img src={Facebook} alt="Facebook Icon"/>
                    </a>
                </div>
                <div className="p-2 col-example text-left">
                    <a href="https://www.twitter.com">
                            <img src={Twitter} alt="Twitter Icon"/>
                    </a>
                </div>
                <div className="p-2 col-example text-left">
                    <a href="https://www.gmail.com">
                        <img src={Email} alt="Gmail Icon"/>
                    </a>
                </div>
                <div className="p-2 col-example text-left">
                    <a href="./About.js"> About</a>
                </div>
                <div className="p-2 col-example text-left">
                    <a href="./MainMint.js"> Mint</a>
                </div>
                <div className="p-2 col-example text-left">
                    <a href="./Team.js"> Team</a>
                </div>
                <div className="p-2 col-example text-left">
                    {/* ConnectWallet button */}
                    {/* Check if the wallet is connected */}
                    { isConnected ? (
                        <a href="./MainMint.js"> Connected</a>
                        
                    ) : (
                        <Button id="connectButton" onclick= { connectAccount } >Connect to Metamask</Button>
                                                                         
                    )}

                </div>
            </div>
                
         </div>   
         
);


};

export default NavBar;



