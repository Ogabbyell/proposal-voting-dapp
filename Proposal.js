contract ProposalContractTest {

    ProposalContract proposalContract;

    address owner;
    address voter1;
    address voter2;

    function setUp() public {
        proposalContract = new ProposalContract();
        owner = proposalContract.owner();
        voter1 = address(1); 
        voter2 = address(2);
    }

    function testCreateProposal() public {
        string memory title = "Test Proposal";
        string memory description = "Description for test proposal";
        uint256 totalVotes = 100;

        proposalContract.create(title, description, totalVotes);
        
        Proposal memory proposal = proposalContract.getCurrentProposal();

        assertEq(proposal.title, title);
        assertEq(proposal.description, description);
        assertEq(proposal.total_vote_to_end, totalVotes);
    }

    function testVote() public {
        proposalContract.create("Title", "Description", 100);
        
        proposalContract.vote(1, {from: voter1});
        
        Proposal memory proposal = proposalContract.getCurrentProposal();
        
        assertEq(proposal.approve, 1);
        assertTrue(proposalContract.isVoted(voter1));
    }

    function testCalculateCurrentState() public {
        // test cases for different vote counts
        proposalContract.create("Title", "Description", 100);
        
        // approve > reject + pass
        proposalContract.vote(1, {from: voter1}); 
        bool state = proposalContract.calculateCurrentState();
        assertTrue(state);
        
        // reject > approve
        proposalContract.vote(2, {from: voter2});
        state = proposalContract.calculateCurrentState();        
        assertFalse(state);
    }

    function testSetOwner() public {
      address newOwner = address(3);
      
      proposalContract.setOwner(newOwner);
      
      assertEq(proposalContract.owner(), newOwner);
    }

    function testTerminateProposal() public {
    
      proposalContract.create("Title", "Description", 100);
      
      proposalContract.teminateProposal();
      
      Proposal memory proposal = proposalContract.getCurrentProposal();
    
      assertFalse(proposal.is_active);
    }

    function testGetProposal() public {
      proposalContract.create("Title 1", "Desc 1", 100);
      
      proposalContract.create("Title 2", "Desc 2", 200);
    
      Proposal memory proposal = proposalContract.getProposal(1);
    
      assertEq(proposal.title, "Title 1");
      assertEq(proposal.description, "Desc 1");
      assertEq(proposal.total_vote_to_end, 100);  
    }

    function testIsVoted() public {
    
      proposalContract.create("Title", "Description", 100);
      
      proposalContract.vote(1, {from: voter1});
      
      bool isVoted = proposalContract.isVoted(voter1);  
    
      assertTrue(isVoted);
    }
}
