var predefined = [{
	id: 215,
	beginning: 1526918400,
	ending: 1526932800,
	total: 130,
	covered: 82,
	price: 180,
	state: 'open'
}, {
	id: 221,
	beginning: 1527004800,
	ending: 1527019200,
	total: 100,
	covered: 56,
	price: 180,
	state: 'open'
}, {
	id: 232,
	beginning: 1527163200,
	ending: 1527170400,
	total: 80,
	covered: 52,
	price: 185,
	state: 'open'
}, {
	id: 235,
	beginning: 1527253200,
	ending: 1527256800,
	total: 70,
	covered: 70,
	price: 200,
	state: 'open'
}, {
	id: 249,
	beginning: 1527292800,
	ending: 1527465600,
	total: 200,
	covered: 60,
	price: 175,
	state: 'open'
}];

function signOrder(id) {
	console.log(id);
}

function startResponding() {
	predefined.forEach(function(e) {
		addOrderToPage(e, 'responding-orders');
	});
	getRandomOrder(0, function(order) {
		addOrderToPage(order, 'responding-orders');
	});
}

startFunctions.push(startResponding);