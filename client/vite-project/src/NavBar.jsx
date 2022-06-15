import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from './/assets/social-media-icons/facebook_32x32.png'; 
import Twitter from './/assets/social-media-icons/twitter_32x32.png'; 
import Email from './/assets/social-media-icons/email_32x32.png'; 


//Prop-drilling - Passing in state from the Top Component
const NavBar = ( { accounts, setAccounts } ) => {
    //accounts[0] will be the connected wallet's address
    //This will detect when we are connected vs. when we are not connected
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        //When using Metamask, Metamask injects the application with window.ethereum
        if(window.ethereum) {
            //Check and grab the accounts that come from Metamask
            const accounts = await window.ethereum.request( {
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px" >
            {/* Left Side of Navbar - Social Media Icons */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://www.twitter.com">
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://www.gmail.com">
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>
            
            {/* Right Side of Navbar - Sections and ConnectWallet*/}
            <Flex
                justify="space-around"
                align="center"
                width="40%"
                padding="30px">
                
                <Link href="./about.jsx">
                    <Box margin="0 15px">About</Box>
                    <Spacer />
                </Link>
                <Link href="./mint.jsx">
                    <Box margin="0 15px">Mint</Box>
                    <Spacer />
                </Link>
                <Link href="./team.jsx">
                    <Box margin="0 15px">Team</Box>
                    <Spacer />
                </Link>

                {/* ConnectWallet button */}
                {/* Check if the wallet is connected */}
                { isConnected ? (
                    <Box margin="0 15px">Connected</Box>
                ) : (
                    <Button 
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        margin="0 15px"
                        onClick={ connectAccount }>Connect to Metamask</Button>
                )}

            </Flex>
            
           

        </Flex>
    );


};

export default NavBar;