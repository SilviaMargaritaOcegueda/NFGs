//Mocha is the framework and Chai is the library
const { expect } = require("chai");
const { ethers } = require("hardhat");
var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

//Mention the name of the contract here
describe("AthleteRegistration", function(){
     
    let AthleteRegistration;
    let hardhatAthleteRegistration;
    let admin;
    let player;
    let addresses;
    let athletesId;
    //let bronzeId;
    //let silverId;
    //let goldId;
    
    //Hook
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, player, player2, ...addresses] = await ethers.getSigners();
        // admin = await ethers.getSigners();
 
        //Create an instance of our contract
        AthleteRegistration = await ethers.getContractFactory("AthleteRegistration");

        //Deploy this instance
        hardhatAthleteRegistration = await AthleteRegistration.deploy();

        //Retrieving the tokenID from Contract
        athletesId = await hardhatAthleteRegistration.idCounter;
    });

    //Write your test cases within this sub test-suite
    //Test suite for testing deployment functionalities 
    describe("Checking if conract is deployed to network", function(){
        //Mention the test case here - Test Case 1
        it("Should should deploy sucessfully", async function(){
            const address = hardhatAthleteRegistration.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
    });
    
    describe("Testing the Registration", async function(){
        it("Should register a new Athelte", async function(){
           //Register 1 new Athelte with
            await hardhatAthleteRegistration.registerAthlete("Test", player.address)
            const mappingAthleteWallet = hardhatAthleteRegistration.athleteWalletToAthleteId;
            assert.notEqual(mappingAthleteWallet, '' || null || 0x0 || undefined);
            //expect(await hardhatAthleteRegistration.athleteWalletToAthleteId(player.address).to.equal(1));
        });
    });
    // describe('Minting of new token', async () => {
    //     it('creates new token', async () => {
    //     });
    //     it('mints tokens from 0x0 address', async () => {
    //     });
    //     it('send tokens to minter', async () => {
    //     });
    //     it('token total supply is updated', async () => {
    //     });
    // });
});
