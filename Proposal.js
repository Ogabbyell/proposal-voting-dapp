const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProposalContract", function () {

  let proposalContract;
  let owner;

  beforeEach(async function() {
    const ProposalContract = await ethers.getContractFactory("ProposalContract");
    proposalContract = await ProposalContract.deploy();
    [owner] = await ethers.getSigners();
  });

  it("should set new owner", async function() {
    const newOwner = ethers.Wallet.createRandom().address;
    await proposalContract.connect(owner).setOwner(newOwner);
    expect(await proposalContract.owner()).to.equal(newOwner);
  });

  it("should create new proposal", async function() {
    const title = "Test Proposal";
    const description = "Test description";
    const totalVotes = 100;
    await proposalContract.connect(owner).create(title, description, totalVotes);
    
    const proposal = await proposalContract.getCurrentProposal();
    expect(proposal.title).to.equal(title);
  });

  it("should vote on proposal", async function() {
    await proposalContract.connect(owner).create("Title", "Description", 100);
    await proposalContract.connect(owner).vote(1);
    
    const proposal = await proposalContract.getCurrentProposal();
    expect(proposal.approve).to.equal(1);
  });

  it('should terminate proposal', async () => {
    await proposalContract.create(...);
    await proposalContract.terminateProposal();

    const proposal = await proposalContract.getCurrentProposal();
    expect(proposal.is_active).to.be.false;
  });

  it('should check if address voted', async () => {
    await proposalContract.create(...);
    
    await proposalContract.vote(1, voter1);
    const voted = await proposalContract.isVoted(voter1);

    expect(voted).to.be.true;
  });

  it('should get current proposal', async () => {
    await proposalContract.create(...);
    
    const proposal = await proposalContract.getCurrentProposal();

    expect(proposal.title).to.equal(...);
  });

  it('should get proposal by id', async () => {
    await proposalContract.create(...);
    await proposalContract.create(...);

    const proposal = await proposalContract.getProposal(1);

    expect(proposal.title).to.equal(...); 
  });
});
