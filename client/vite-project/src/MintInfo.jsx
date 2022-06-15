import { useState } from 'react';
//ethers package allows you to connect to the blockchain easily
import { ethers, BigNumber } from 'ethers';
//To connect to our TennisNFT contract using the JSON file
import tennisNFT from './TennisNFT.json';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

//Contract Address of TennisNFT
const tennisNFTAddress = "TYPE THE CONTRACT ADDRESS HERE";

const MintInfo = ( { accounts, setAccounts } ) => {
    //To determine the number of NFTs the user has selected to mint
    //useState(0) since the tokenID begins with 0
    const [mintAmount, setMintAmount] = useState(0);
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
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log("response: ", response);
            } catch (err) {
                console.error("error: ", error);
            }
            
        }
    }

    //Function to run when we click the - minus button
    const handleDecrement = () => {
        //If mintAmount is less than 1, we are not gonna do anything
        if(mintAmount < 1) return;
        //Code to run if mintAmount >= 1
        setMintAmount(mintAmount - 1);

    }

    //Function to run when we click the + plus button
     const handleIncrement = () => {
        //If mintAmount is greater than 2, we are not gonna do anything
        if(mintAmount > 2) return;
        //Code to run if mintAmount <= 2
        setMintAmount(mintAmount + 1);
        
    }

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000000">TennisNFT</Text>
                <Text 
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000000"
                    >Encouraging amateur tennis players with NFTs to boost their performance.
                </Text> 
                <Text
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000000"
                    >Mint TennisNFT to reward your players
                </Text>
            </div>
            {isConnected ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"

                            onClick={handleDecrement}>
                            -
                        </Button>
                        <Input 
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type = "number" 
                            value = {mintAmount} />
                        <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            
                            onClick={handleIncrement}>
                                +
                            </Button>
                    </Flex>
                    <Button 
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        marginTop="10px"
                        
                        onClick={handleMint} >
                            Mint Now
                    </Button>
                </div>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000000"
                    color="#D6517D"
                    >You must be connected to Mint
                    </Text>
            )}
            </Box>
        </Flex>
    );
};

export default MintInfo;
