pragma solidity ^0.4.18;

contract Onder {
    function Onder() public { }

    address[] public users;




    event logRegisteredSensor(address sensor);
    function registerSensor(uint model) public {
        Sensor sensor = new Sensor(uint model);
        logCreatedOrder(sensor);
        sensors.push(order);
    }

    function registerSensor(uint8 category) public returns(uint8) {
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