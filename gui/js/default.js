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
			DataCollector.startRandom();
	    }
	} else {
		console.warn('Web3 detected!');
		if (getCookie('sensorid') == undefined) {
	    	document.getElementById('setup').style.display = 'block';
		} else {
			$.get('/ip', function(res) {
				console.log('provider: ' + res);
				const web3 = new Web3(new Web3.providers.HttpProvider('http://' + res + ':8545'));
		        const contract = web3.eth.contract(interface).at(address);
		        const options = {
		            from: account, 
		            gas: 300000, 
		            gasPrice: String(1 * 1000 * 1000 * 1000)
		        };
		        DataCollector.start(web3, contract);
			});
		}
	}
}

function start() {
	console.log(document.cookie);
	checkComponents();
}