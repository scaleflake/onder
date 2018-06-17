pragma solidity ^0.4.18;

contract Sensor {
    address sensor;
    uint8 id;

    int128 measure;

    int128[48] profile;

    function Sensor(uint8 category) public {

    }

    function openChannel() public {
        
    }
    

    function getCategory() public constant returns(bool) {
        
    }

    function getId() public constant returns(bool category) {
        
    }
    
    function getClass() public constant returns(bool category) {
        
    }

    function getLastRecord() public constant returns(int128) {
        return measure;
    }
}


contract Prosumer is Sensor {
    function Prosumer() public {
        
    }
}


contract Consumer is Sensor {
    function Prosumer() public {
        
    }
}

contract Provider is Sensor {
    function Provider() public {
        
    }
}