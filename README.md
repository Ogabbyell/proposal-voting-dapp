# proposal-voting-dapp
## Proposal Contract
This is a solidity smart contract that allows creating governance proposals and voting on them.

## Contract Details
The owner can create new proposals by calling the create() function.
 A proposal has a title, description, and total_vote_to_end which specifies the number of total votes required to end the voting.
 Anyone can vote on an active proposal that they haven't already voted on.
 Votes are registered as approve (Indicates a vote in favor of the proposal), reject (Indicates a vote against the proposal) or pass (Indicates an abstention - the voter does not approve or reject the proposal).
 The proposal's current_state is calculated based on the vote counts.
 When the total votes reaches total_vote_to_end, voting ends.
 The owner can terminate a proposal to end voting early

## Testing
Unit tests are included for core functionality like:
Creating proposals,
Voting,
Calculating proposal state,
Checking previous votes.

## Future Improvements
Access control roles beyond a single owner.
 Use of Upgradeable contract pattern.
