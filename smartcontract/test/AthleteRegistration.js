//Mocha is the framework and Chai is the library
const { expect } = require("chai");
const { ethers } = require("hardhat");
// var chai = require('chai');
// const BN = require('bn.js');
// chai.use(require('chai-bn')(BN));

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
    
    //Hook // before each individual test do
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
        it('Initial counter is set to 0', async function () {
            expect((await hardhatAthleteRegistration.getCounter()).toString()).to.equal('0');
            console.log("Entries of getcounter", hardhatAthleteRegistration.getCounter());
        });
    });
    
    describe("Testing the Registration", async function(){
        it("Register event has been emitted when a new Athelte was registered", async function(){
           //   Register 1 new Athelte with Name Teast and address player 

            await expect(hardhatAthleteRegistration.registerAthlete("Test", player.address))
                .to.emit(hardhatAthleteRegistration, "NewAthlete")
                .withArgs(1, "Test");
        });
        

        it("It should check that a walletaddress can't exists two times", async function(){
            await hardhatAthleteRegistration.registerAthlete("Test", player.address);
            await expect(hardhatAthleteRegistration.registerAthlete("Test", player.address)).to.be.reverted;
        });


        it("Test the athlete Struct for one entry", async function(){
            await hardhatAthleteRegistration.registerAthlete("Test", player.address);
            await expect(hardhatAthleteRegistration.structOfAthelte(player.address))
                .to.emit(hardhatAthleteRegistration, "AtheltesToInterface")
                .withArgs(1, player.address,"Test",0,0);
        })
    });
});
