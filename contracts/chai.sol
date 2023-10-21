//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract chai {
    struct memo {
        string name;
        string messg;
        uint256 timestamp;
        address from;
    }
    memo[] memos; //dynamic array to push donators information

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    } // one who deploy this contract will become owner

    function buyChai(string memory name, string memory messg) public payable {
        require(msg.value > 0, "please pay more than 0 ethers");
        owner.transfer(msg.value);
        memos.push(memo(name, messg, block.timestamp, msg.sender));
    }

    function getMemo() public view returns (memo[] memory) {
        return memos;
    }
}
