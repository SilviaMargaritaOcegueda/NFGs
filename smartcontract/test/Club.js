//Mocha is the framework and Chai is the library
const { expect } = require("chai");
const { ethers } = require("hardhat");
var assert = require('assert');
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

//Mention the name of the contract here
describe("Club", function(){
     
    let Club;
    let hardhatClub;
    let admin;
    let athlete;
    let addresses;
    let trainingsPerYear;
    let pointsPerTournament;
    let whiteCounter;
    let bronzeCounter;
    let silverCounter;
    let goldCounter;
        
    //Hook
    beforeEach(async function(){
        // If you need to send a transaction from an account other than the default one
        [admin, athlete, athlete2, ...addresses] = await ethers.getSigners();
        // admin = await ethers.getSigners();
 
        //Create an instance of our contract
        Club = await ethers.getContractFactory("Club");
        
        //Deploy this instance
        hardhatClub = await Club.deploy(240,6);
        
        // Retrieve the NFT sort
        console.log("this is the gold nft");
        // const goldNft = await hardhatClub.nftSorts(3);
        // const silverNft = await hardhatClub.nftSorts(2);
        // const bronzeNft = await hardhatClub.nftSorts(1);
        // const whiteNft = await hardhatClub.nftSorts(0);
    });
    
    //Write your test cases within this sub test-suite
    //Test suite for testing deployment functionalities 
    describe("Deployment", function(){
        it("Should should deploy sucessfully", async function(){
            const address = hardhatClub.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
        });
        //Mention the test case here - Test Case 1
        it("Should set the right trainings per year", async function(){
            expect(await hardhatClub.trainingsPerYear()).to.equal(240);
        });
        
        //Test Case 2
        it("Should set the right points per tournament", async function(){
            expect(await hardhatClub.pointsPerTournament()).to.equal(6);
        });
        
        //Test Case 3
        it("Should set the right minimum number of attendances for each sort of NFT", async function(){

            console.log("To earn the golden NFT the min. of trainings attendance is 90%");
            console.log("To earn the silver NFT the min. of trainings attendance is 70%");
            console.log("To earn the golden NFT the min. of trainings attendance is 60%");

            //Checking the number of trainnings each sort of NFT set
            const goldMinimum = await hardhatClub.minimums.goldNft;
            console.log("To earn the golden NFT the min. of trainings attendance is: ", goldMinimum);
            const silverMinimum = await hardhatClub.minimums.silverNft;
            console.log("To earn the golden NFT the min. of trainings attendance is: ", silverMinimum);
            const bronzeMinimum = await hardhatClub.minimums.bronzeNft;
            console.log("To earn the golden NFT the min. of trainings attendance is: ", bronzeMinimum);

            //Checking if the calculation of minimums is right
            expect(goldMinimum).to.equal(216);
            expect(silverMinimum).to.equal(168);
            expect(bronzeMinimum).to.equal(144);
        });
    });
    
    //Test suite to check increments
    describe("Testing the records increment function", async function(){
        //Test Case 4
        it("Should increment the right tournements and trainings attended", async function(){
            //Increment 1 tournament and 5 trainings to athlete with id 1
            await hardhatClub.incrementRecords(1, 1, 5)
            expect(await hardhatClub.athletes[0].tournaments()).to.equal(1);
            expect(await hardhatClub.athletes[0].trainings()).to.equal(5);
        });

        it("Should update the NFT sort of an athlete depending on his records", async function(){
            // Register the first athlete 
            await hardhatClub.registerAthlete("Alan",athlete.address);
            //Increment 3 tournament and 100 trainings to athlete with id 1 and update NFT sort.
            await hardhatClub.incrementRecords(1, 3, 100);
            await hardhatClub.updateNftSort();
            expect(await hardhatClub.athletes[0].tournaments()).to.equal(1);
            expect(await hardhatClub.athletes[0].trainings()).to.equal(5);
            expect(await hardhatClub.athletes[0].nftSort()).to.equal(whiteNft);
        });
    });
});