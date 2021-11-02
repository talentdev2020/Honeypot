//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HoneyPot {
    function log(address _caller, uint _amount, string memory _action) public pure{
        if (equal(_action, "Withdraw")) {
            revert("It's a tap");
        }
    }
    fallback() external payable {
        console.log("fallbalck");
    }
    function equal(string memory _a, string memory _b)  public pure returns(bool){
        return keccak256(abi.encode(_a)) == keccak256(abi.encode(_b));
    }
}