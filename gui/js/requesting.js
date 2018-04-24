/*jshint esversion: 6 */
const begin = document.getElementById('begin');

const end = document.getElementById('end');

const energy = document.getElementById('energy');
const energyDiv = document.getElementById('energy-div');
energy.addEventListener("input", function() {
    energyDiv.innerHTML = energy.value;
});

const price = document.getElementById('price');

console.log(document);

const input = document.getElementById('create-order-input');
const request = document.getElementById('request-button');

const confirmation = document.getElementById('create-order-confirmation');
const confirm = document.getElementById('confirm-button');
const notsure = document.getElementById('notsure-button');

request.addEventListener('click', function() {
	input.style.marginLeft = '-100%';
});

confirm.addEventListener('click', function() {
	
});

notsure.addEventListener('click', function() {
	input.style.marginLeft = '0%';
});

var historyOrders = [{
	id: 215,
	beginning: 1526918400,
	ending: 1526932800,
	total: 130,
	covered: 82,
	price: 180,
	state: 0
}, {
	id: 221,
	beginning: 1527004800,
	ending: 1527019200,
	total: 100,
	covered: 56,
	price: 180,
	state: 0
}];

function startRequesting() {
	historyOrders.forEach(function(e) {
		addOrderToPage(e, 'requesting-orders');
	});
	getRandomOrder(0, function(order) {
		addOrderToPage(order, 'requesting-orders');
	});
}

startFunctions.push(startRequesting);