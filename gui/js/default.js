/*jshint esversion: 6 */
var startFunctions = [];

function checkComponents() {
	setTimeout(function() {
		var web3Ready = false;
		var sensoridReady = false;

		// check web3
	    if (typeof web3 !== 'undefined') {  
	      	web3Ready = true;
	    } else {
	        console.error('Web3 not detected');
	    }

	    // check sensorid
	    if (getCookie('sensorid') !== undefined) {
			sensoridReady = true;
		} else {
			document.getElementById('setup').style.display = 'block';
		}

		if (web3Ready && sensoridReady) {
			var request = new XMLHttpRequest();
            request.open('GET', '/ip', false);
            request.send();

          	var provider;
            if (request.status != 200) {
                console.error('Cant get IP');
            } else {
                provider = request.responseText;
                console.log('provider: ' + provider);
            }
			const web3 = new Web3(new Web3.providers.HttpProvider('http://' + provider + ':8545'));
	        const contract = web3.eth.contract(interface).at(address);
	        const options = {
	            from: account, 
	            gas: 300000, 
	            gasPrice: String(1 * 1000 * 1000 * 1000)
	        };
			for (var i = 0; i < startFunctions.length; i++) {
	        	startFunctions[i](web3, contract);
	        }
		}
	}, 2000);
}

function start() {
	console.log(document.cookie);
	$(document).ready(checkComponents);
}

function ModuleToggler(moduleName) {
	this.hidden = false;
	this.module = document.getElementById(moduleName);
	this.toggle = function() {
		if (this.hidden) {
			this.module.classList.remove('hidden');
			this.hidden = false; 
		} else {
			this.module.classList.add('hidden');
			this.hidden = true; 
		}
	};
}