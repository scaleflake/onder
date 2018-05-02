const account = "0xDbFd00026d905da7615035d0A429add1b9F19864";
const address = "0x77311DE6757B27b5334b1CFdCf4F1819541013D5";
const interface = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "hour",
                "type": "uint8"
            }
        ],
        "name": "recalcProfiles",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x3d2f4160"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "category",
                "type": "uint8"
            }
        ],
        "name": "getEnergyByType",
        "outputs": [
            {
                "name": "",
                "type": "int128"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x4ab105ce"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "id",
                "type": "uint8"
            },
            {
                "name": "watts",
                "type": "int128"
            }
        ],
        "name": "process",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x5f160d5a"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getGeneration",
        "outputs": [
            {
                "name": "",
                "type": "int128"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x694db4e3"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "category",
                "type": "uint8"
            }
        ],
        "name": "getProfileByType",
        "outputs": [
            {
                "name": "",
                "type": "int128[48]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x7cd9677a"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getSensorsCount",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x840ef573"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint8"
            }
        ],
        "name": "getEnergyById",
        "outputs": [
            {
                "name": "",
                "type": "int128"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x877ce083"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getConsumption",
        "outputs": [
            {
                "name": "",
                "type": "int128"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8a5cb1b6"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "category",
                "type": "uint8"
            }
        ],
        "name": "addSensor",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x90eeabd8"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentHour",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xb63589a1"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint8"
            }
        ],
        "name": "getProfileById",
        "outputs": [
            {
                "name": "",
                "type": "int128[48]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xc1145eda"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    }
]