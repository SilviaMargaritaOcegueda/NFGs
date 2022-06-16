//Mocha is the framework and Chai is the library
const { expect } = require("chai");
const { ethers } = require("hardhat");
var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

// for string converting to use as byte32
const utils = ethers.utils

//Mention the name of the contract here
describe("Club", function(){
     
    let Club;
    let hardhatClub;
    let admin;
    let athlete;
    let addresses;
    let trainingsPerYear;
    let pointsPerTournament;
        
    //Hook
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, athlete, athlete2, ...addresses] = await ethers.getSigners();
        // admin = await ethers.getSigners();
 
        // Create an instance of our contract
        Club = await ethers.getContractFactory("Club");
        
        // Deploy this instance
        hardhatClub = await Club.deploy(240,6);

        // Register the first athlete 
        const nameInBytes = utils.formatBytes32String("Alan")
        await hardhatClub.registerAthlete(nameInBytes,athlete.address);
        
    });
    
    //Write your test cases within this sub test-suite
    //Test suite for testing deployment functionalities 
    describe("Deployment", function(){
        it("Should should deploy sucessfully", async function(){
            const address = hardhatClub.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
            console.log("Club contract deployed");
        });
        //Mention the test case here - Test Case 1
        it("Should set the right trainings per year", async function(){
            expect(await hardhatClub.trainingsPerYear()).to.equal(240);
            console.log("Trainings per year 240");
        });
        
        //Test Case 2
        it("Should set the right points per tournament", async function(){
            expect(await hardhatClub.pointsPerTournament()).to.equal(6);
            console.log("Points per tournament 6");
        });
        
        //Test Case 3
        it("Should set the right minimum number of attendances for each sort of NFT", async function(){

            
            //Check the right number of trainnings set for each sort of NFT
            //Checking if the calculation of minimums is right
            const goldMinimum = await (hardhatClub.connect(admin).minimums(3));
            expect(goldMinimum).to.equal(216);
            console.log("Gold NFT -> min. of trainings attendance is 90%: ", goldMinimum);
            
            const silverMinimum = await (hardhatClub.connect(admin).minimums(2));
            expect(silverMinimum).to.equal(168);
            console.log("Silver NFT -> min. of trainings attendance is 70%: ", silverMinimum);
            
            const bronzeMinimum = await (hardhatClub.connect(admin).minimums(1));
            expect(bronzeMinimum).to.equal(144);
            console.log("Bronze NFT -> min. of trainings attendance is 60%", bronzeMinimum);

        });
    });
    
    //Test suite to check increments
    describe("Testing the records increment function", async function(){
        //Test Case 4
        it("Should increment the right tournements and trainings attended", async function(){
            // Increment 1 tournament and 5 trainings to athlete with id 1
            await hardhatClub.incrementRecords(1, 1, 5);
            const firstAthleteInc = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc[4]).to.equal(1);
            expect(firstAthleteInc[5]).to.equal(5);
        });
        //Test Case 5
        it("Should update the NFT sort of an athlete depending on his records", async function(){
            //Increment 3 tournament3 and 100 trainings to athlete with id 1 and update NFT sort to white.
            await hardhatClub.incrementRecords(1, 3, 100);
            const firstAthleteInc1 = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc1[3]).to.equal(0);
            console.log("Updated to white");

            await hardhatClub.incrementRecords(1, 1, 20);
            const firstAthleteInc2 = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc2[3]).to.equal(1);
            console.log("Updated to bronze");

            await hardhatClub.incrementRecords(1, 2, 12);
            const firstAthleteInc3 = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc3[3]).to.equal(2);
            console.log("Updated to silver");

            await hardhatClub.incrementRecords(1, 0, 68);
            const firstAthleteInc4 = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc4[3]).to.equal(3);
            console.log("Updated to gold");
        });
    });

    //Test suite to check minting and reseting records
    describe("Testing the mint and reset records function", async function(){
        //Test Case 6
        it("Should emit the Minted event", async function(){
            // Register the first athlete 
            const nameInBytes2 = utils.formatBytes32String("Saul")
            await hardhatClub.registerAthlete(nameInBytes2,athlete2.address);
            // Checks if the emited event consists of the expected variables
            await expect(hardhatClub.mintAndResetRecords())
                .to.emit(hardhatClub, "Minted")
                .withArgs(2);
            console.log("All NFT minted");
        });
        //Test Case 7
        it("Should reset athlete records and set NFT sort to white", async function(){
            // Checks if the records are set to zero and whit NFT after minting 
            await hardhatClub.incrementRecords(1, 8, 150);
            await hardhatClub.mintAndResetRecords();
            const firstAthleteInc = await (hardhatClub.connect(admin).athletes(0));
            expect(firstAthleteInc[3]).to.equal(0);
            expect(firstAthleteInc[4]).to.equal(0);
            expect(firstAthleteInc[5]).to.equal(0);
            console.log("All records are zero and NFT sort is white");
       });
        //Test Case 8: Error test case
        it("Should revert transaction when no athletes have been registered", async function(){
            // Checks if the transaction is reverted
            await hardhatClub.mintAndResetRecords();
            expect(hardhatClub.mintAndResetRecords()).to.be.reverted;
        });
    });    
});