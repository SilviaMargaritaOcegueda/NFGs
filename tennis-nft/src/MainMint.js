import { useState } from 'react'
// import { ethers, Bignumber } from 'ethers';
// import Club from './Club.json'

// // which we got back when deployed contract
// const clubContratcAddress = "";
// strating 45:12

// function for BatchMint and Transfer Button
const MainMint = () => {
    // check it account is connceted
    // const isConnceted = Boolean(accounts[0]);

    // asynchron function to handle min
    // async function handleMint(){
    //     // if meta mask wallet is connctected
    //     if (window.ethereum) {
    //         // create a way for ethers to conncet to the chain
    //         const provider = new ethers.provider.Web3Provider(window.etherum);
    //         // we need a signer for our transaction 
    //         const signer = provider.getSigner()
    //         // create avariable for the contract we want to access
    //         // based on the imported contract and the json
    //         // now we can access functions
    //         const contract = new ethers.Contract(
    //             clubContratcAddress,
    //             Club.abi,
    //             signer
    //         );
    //         try {
    //             // here we can call the function for minting 
    //             //(name of the function used in our contract!! 
    //             //including parameters we dont have for mint and transfer)
    //             //to receive a respones
    //             // if we have numer as input it must be of kind bignumber
    //             const respone = await contract.mint();
    //             console.log('response: ', response);
    //         } catch (err) {
    //             console.log("error", err )
    //         }
    //     }
    // }
    return (
        <h1>TESTE MICH</h1>
    )
}
export default MainMint;