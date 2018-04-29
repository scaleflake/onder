/*jshint esversion: 6 */

var DataCollector = {
	contract: null,
	buffer: {
		profiles: {
			generation: [],
			factories: [],
			households: [],
			your: [],
			deficiency: []
		},
		realtime: {
			'generation': 0,
			'factories': 0,
			'households': 0,
			'your': 0,
			'deficiency': 0
		}
	},
	startRandom: function() {
		setInterval(function() {
			
		}, 10000);
		setInterval(function() {
			
		}, 5000);
	},
	start: function(web3, contract) {
		if (web3 == 'salat' && contract == 'picca') {
			return;
		}
		setInterval(function() {
			contract.getProfileByType(0, function(error, result) {
				if (!error) {
					for (var i = 0; i < 48; i++) {
						DataCollector.buffer.profiles.generation[i] = result[i].toNumber() / -1000;
					}
				} else {
					console.error(error);
				}
			});
			contract.getProfileByType(1, function(error, result) {
	            if (!error) {
	                for (var i = 0; i < 48; i++) {
	                    DataCollector.buffer.profiles.factories[i] = result[i].toNumber() / 1000;
	                }
	            } else {
	                console.error(error);
	            }
	        });
	        contract.getProfileByType(2, function(error, result) {
				if (!error) {
					for (var i = 0; i < 48; i++) {
						DataCollector.buffer.profiles.households[i] = result[i].toNumber() / 1000;
					}
				} else {
					console.error(error);
				}
			});
			contract.getProfileById(parseInt(getCookie('sensorid')), function(error, result) {
				if (!error) {
					for (var i = 0; i < 48; i++) {
						DataCollector.buffer.profiles.your[i] = result[i].toNumber() / 1000;
					}
				} else {
					console.error(error);
				}
			});
			for (var i = 0; i < 48; i++) {
				var generation = DataCollector.buffer.profiles.generation[i] * -1;
				var factories = DataCollector.buffer.profiles.factories[i];
				var households = DataCollector.buffer.profiles.households[i];
				DataCollector.buffer.profiles.deficiency[i] = generation + factories + households;
			}
		}, 10000);
		setInterval(function() {
			contract.getEnergyByType(0, function(error, result) {
	            if (!error) {
	                DataCollector.buffer.realtime[`generation`] = result.toNumber() / -1000.0;
	            } else {
	                console.error(error);
	            }
	        });
	        contract.getEnergyByType(1, function(error, result) {
	            if (!error) {
	                DataCollector.buffer.realtime[`factories`] = result.toNumber() / 1000.0;
	            } else {
	                console.error(error);
	            }
	        });
	        contract.getEnergyByType(2, function(error, result) {
	            if (!error) {
	                DataCollector.buffer.realtime[`households`] = result.toNumber() / 1000.0;
	            } else {
	                console.error(error);
	            }
	        });
	        contract.getEnergyById(parseInt(getCookie('sensorid')), function(error, result) {
	            if (!error) {
	                DataCollector.buffer.realtime[`your`] = result.toNumber() / 1000.0;
	            } else {
	                console.error(error);
	            }
	        });
	        var generation = DataCollector.buffer.realtime[`generation`] * -1;
	        var factories = DataCollector.buffer.realtime[`factories`];
	        var households = DataCollector.buffer.realtime[`households`];
	        DataCollector.buffer.realtime[`deficiency`] = generation + factories + households;
		}, 5000);
	},
};