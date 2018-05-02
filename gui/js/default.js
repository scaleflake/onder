/*jshint esversion: 6 */

function startFunction(func) {
	startFunctions.push(func);
	console.log(func.name);
}

function checkComponents() {
	if (typeof(web3) == 'undefined') {
		console.error('Web3 not detected!');
		if (getCookie('sensorid') == undefined) {
	    	document.getElementById('setup').style.display = 'block';
		} else {
			DataCollector.start(null, null);
	    }
	} else {
		console.warn('Web3 detected!');
		if (getCookie('sensorid') == undefined) {
	    	document.getElementById('setup').style.display = 'block';
		} else {
			$.get('/ip', function(res) {
				console.log('provider: ' + res);
				// let web3;
				// let contract;
				// try {
				// 	web3 = new Web3(new Web3.providers.HttpProvider('http://' + res + ':8545'));
				// 	contract = web3.eth.contract(interface).at(address);
				// } catch (err) { }
				
				//	contract.getCurrentHour(function(error, result) {
				// 	if (error) {
				// 		console.error('No node!');
				// 		DataCollector.start(web3, null);
				// 	} else {
				// 		console.warn('Current hour: ' + result.toNumber());
				// 		console.warn('Node is ok!');
				// 		DataCollector.start(web3, contract);
				// 	}
				// });
				console.warn('No-blockchain-mode');
				DataCollector.start(null, null);
			});
		}
	}
}

function start() {
	console.log(document.cookie);
	checkComponents();
}