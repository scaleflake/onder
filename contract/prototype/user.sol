pragma solidity ^0.4.18;

contract User {
	address user;
	address[] sensors; 
	function User() {

	}

	function getSensorCount() public constant returns(uint) {
		return sensors.length;
	}

	function getSensorAddress(uint id) public constant returns(address) {
		if (id < 0 || id > sensors.length) return address(0);
		else return sensors[id];
	}
}