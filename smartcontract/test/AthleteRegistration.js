//Mocha is the framework and Chai is the library
const { expect } = require("chai");
const { ethers } = require("hardhat")
// for string converting to use as byte32
const utils = ethers.utils

var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

//Mention the name of the contract here
describe("AthleteRegistration", function(){
     
    let AthleteRegistration;
    let hardhatAthleteRegistration;
    let admin;
    let player;
    let addresses;
    
    //Hook // before each individual test do
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, player, player2, ...addresses] = await ethers.getSigners();
        // admin = await ethers.getSigners();
 
        //Create an instance of our contract
        AthleteRegistration = await ethers.getContractFactory("AthleteRegistration");

        //Deploy this instance
        hardhatAthleteRegistration = await AthleteRegistration.deploy();

        //Retrieving the athletes Id from Contract
        athletesId = await (hardhatAthleteRegistration.connect(admin).idCounter());
        //const minimum = await club.connect(signer1).miminums(1)
        console.log("Show number of athletesID", athletesId);
    });

    //Write your test cases within this sub test-suite
    //Test suite for testing deployment functionalities 
    describe("Checking if contract is deployed to network", function(){
        //Testcase 1 Succesful deployment
        it("Should deploy sucessfully", async function(){
            const address = hardhatAthleteRegistration.address;
            assert.notEqual(address, ethers.constants.AddressZero);
        });
        // Testscase 2 Checks if the intial counter is set to 0
        it('Initial counter is set to 0', async function () {
            expect(await(hardhatAthleteRegistration.connect(admin).idCounter())).to.eql(0);
        });
    });
    
    describe("Testing the Registration", async function(){
        it("Register event has been emitted when a new Athelte was registered", async function(){
            // Test case 3 checks if the paramter in the Event after registration are correct
            // Register 1 new Athelte with Name Test and address player 
            // Checks if the emited event consists of the expected variabls
            const stringInBytes = utils.formatBytes32String("Test")
            await expect(hardhatAthleteRegistration.registerAthlete(stringInBytes, player.address))
            .to.emit(hardhatAthleteRegistration, "NewAthleteRegistered")
            .withArgs(1, Athlete);
            console.log(hardhatAthleteRegistration.Athlete);
        });
        

        it("It should check that a walletaddress can't exists two times", async function(){
            // Error test case 4 Checks if a wallet address can only be registerd one time
            const stringInBytes = utils.formatBytes32String("Test")
            await hardhatAthleteRegistration.registerAthlete(stringInBytes, player.address);
            await expect(hardhatAthleteRegistration.registerAthlete(stringInBytes, player.address)).to.be.reverted;
        });


        it("Tests the if the athlete is added to the athletes Array after registration", async function(){
            // Test 5 checks if the values inside the Atheltes array are set correct after a registration
            const stringInBytes = utils.formatBytes32String("Test")
            await hardhatAthleteRegistration.registerAthlete(stringInBytes, player.address);
            const athletes = await (hardhatAthleteRegistration.connect(admin).athletes(0));
            // eq cause it is Bignumber
            expect(1).to.eq(athletes[0]);
            expect(stringInBytes).to.eql(athletes[1]);
            expect(player.address).to.eql(athletes[2]);
            expect(0).to.eql(athletes[3]);
            expect(0).to.eql(athletes[4]);
            expect(0).to.eql(athletes[5]);
            //console.log("Entries of atheltes after registration", athletes);
        });
    });
});