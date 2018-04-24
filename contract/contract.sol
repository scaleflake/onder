pragma solidity ^0.4.18;

contract Onder {
    uint8 currentHour;
    uint8 sensorsCount;

    function Onder() public {
        currentHour = 40;
        sensorsCount = 0;
    }

    struct Sensor {
        bool prosumer;
        uint8 id;
        uint8 category;
        int128 current;
        int128 buffer;
        uint8 bufferSize;
        int128[48] profile;
    }

    mapping (uint8 => Sensor) sensors;
    mapping (address => uint8) sensorOwners;

    function addSensor(uint8 category) public returns(uint8) {
        int128[48] memory buffer = [
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0)
        ];
        bool prosumer = false;
        if (category == 0) {
            prosumer = true;
        }
        sensors[sensorsCount] = Sensor(prosumer, sensorsCount, category, 0, 0, 0, buffer);
        sensorsCount += 1;
        sensorOwners[msg.sender] = sensorsCount - 1;
        return sensorsCount - 1;
    }

    function getSensorsCount() public constant returns(uint8) {
        return sensorsCount;
    }

    function process(uint8 id, int128 watts) public {
        sensors[id].current = watts;
        sensors[id].buffer += watts;
        sensors[id].bufferSize += 1;
    }

    function recalcProfiles(uint8 hour) public {
        currentHour = hour;
        uint8 targetHour = 0;
        if (currentHour != 0) {
            targetHour = currentHour - 1;
        } else {
            targetHour = 47;
        }
        for (uint8 i = 0; i < sensorsCount; i++) {
            uint8 bufferSize = sensors[i].bufferSize;
            if (bufferSize == 0) {
                sensors[i].profile[targetHour] -= sensors[i].profile[targetHour] / 2;
            } else {
                sensors[i].profile[targetHour] += (sensors[i].buffer / bufferSize - sensors[i].profile[targetHour]) / 2;
            }
            sensors[i].buffer = 0;
            sensors[i].bufferSize = 0;
        }
    }

    function getCurrentHour() public constant returns(uint8) {
        return currentHour;
    }

    // function myFunction () returns(bool res) internal {
    //     return function myFunction () returns(bool res) internal {
            
    //     }
    //     {};
    // }
    

    // open 1
    // active 2
    // closed 3

    // struct Order {
    //     uint64 beginning;
    //     uint64 ending;
    //     uint128 watts;
    //     uint256 wei;
    //     uint8 state;
    // }

    // uint32 ordersCount;
    // Order[] public orders;

    // mapping (address => Order) o;
        
    // function addOrder(uint64 beginning, uint64 ending, uint128 watts, uint256 wei) public returns(int32) {
    //     if (beginning > uint64(now)) {
    //         if (ending > beginning) {
    //             ordersCount++;
    //             orders[ordersCount - 1].beginning = beginning;
    //             orders[ordersCount - 1].ending = ending;
    //             orders[ordersCount - 1].watts = watts;
    //             orders[ordersCount - 1].wei = wei;
    //             orders[ordersCount - 1].state = 1;
    //             return ordersCount;
    //         }
    //         return -1;
    //     }
    //     return -2;
    // }
    
    // function getOrdersCount() public constant returns(uint32) {
    //     return ordersCount;
    // }

    // function getOpenOrders() {
        
    // }

    // function getMyOrders() public constant returns(bool) {
        
    // }
    
    // function getOrderInfo(uint id) public constant returns(uint64, uint64, uint128, uint256, uint8) {
    //     return (orders[id].beginning, orders[id].ending, orders[id].watts, orders[id].wei, orders[id].state);
    // }
    
    
    


    function getConsumption() public constant returns(int128) {
        int128 energy = 0;
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (!sensors[i].prosumer) {
                energy += sensors[i].current;
            }
        }
        return energy;
    }

    function getGeneration() public constant returns(int128) {
        int128 energy = 0;
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (sensors[i].prosumer) {
                energy += sensors[i].current;
            }
        }
        return energy;
    }
    
    function getEnergyByType(uint8 category) public constant returns(int128) {
        int128 energy = 0;
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (sensors[i].category == category) {
                energy += sensors[i].current;
            }
        }
        return energy;
    }

    function getEnergyById(uint8 id) public constant returns(int128) {
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (sensors[i].id == id) {
                return sensors[i].current;
            }
        }
    }
    
    function getProfileByType(uint8 category) public constant returns(int128[48]) {
        int128[48] memory profile = [
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0)
        ];
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (sensors[i].category == category) {
                for (uint8 j = 0; j < 48; j++) {
                    profile[j] += sensors[i].profile[j];
                }
            }
        }
        return profile;
    }
    
    function getProfileById(uint8 id) public constant returns(int128[48]) {
        int128[48] memory profile = [
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0),
            int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0), int128(0)
        ];
        for (uint8 i = 0; i < sensorsCount; i++) {
            if (sensors[i].id == id) {
                for (uint8 j = 0; j < 48; j++) {
                    profile[j] += sensors[i].profile[j];
                }
            }
        }
        return profile;
    }  
}