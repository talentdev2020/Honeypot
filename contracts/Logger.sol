//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Logger {
    event Log(address _caller, uint _amount, string _action);

    function log(address _caller, uint _amount, string memory _action) public{
        emit Log(_caller, _amount, _action);
    }
}