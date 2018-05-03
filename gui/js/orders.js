/*jshint esversion: 6 */

function getRandomFloat(min, max) {
    return (Math.random() * (max - min)) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomOrder(id, callback) {
	var order = {};
	order.id = getRandomInt(200, 300);
	order.beginning = Date.now() / 1000 - getRandomInt(0, 24 * 12) * 5 * 60;
	order.ending = Date.now() / 1000 + getRandomInt(0, 24 * 12) * 5 * 60;
	//order.duration = ((order.end - order.beg) / (60 * 60)).toFixed(3);
	order.total = getRandomInt(40, 300);
	order.covered = getRandomInt(0, order.total);
	order.price = getRandomInt(100, 220);
	var state = getRandomInt(0, 2);
	if (state == 0) {
		order.state = 'open';
	} else if (state == 1) {
		order.state = 'active';
	} else if (state == 2) {
		order.state = 'closed';
	}
	callback(order);
}

function signOrder(id) {
	console.log(id);
}

function addOrderToPage(order, list) {
	var b = new Date(order.beginning * 1000);
	var bD = b.getDate();
	var bM = b.getMonth();
	var bY = b.getFullYear();
	var bH = b.getHours();
	var bm = (b.getMinutes() < 10 ? '0' : '') + b.getMinutes();

	var e = new Date(order.ending * 1000);
	var eD = e.getDate();
	var eM = e.getMonth();
	var eY = e.getFullYear();
	var eH = e.getHours();
	var em = (e.getMinutes() < 10 ? '0' : '') + e.getMinutes();

	var percentage = (order.covered / order.total * 100).toFixed(1);

	let orders = $('#' + list);

	if (list == 'responding-orders') {
		// 2.0
		let html = `<div class="item" id="order-${order.id}">
	<div class="id">#${order.id}</div>
	<label>Beginning</label>
	<div class="time">${bD}.${bM}.${bY} ${bH}:${bm}</div>
	<label>Ending</label>
	<div class="time">${eD}.${eM}.${eY} ${eH}:${em}</div>
	<label>Duration</label>
	<div class="duration">${((order.ending - order.beginning) / (60 * 60)).toFixed(3)} hours</div>
	<label>Watts</label>
	<div class="watts">
		<div class="my-progress-bar">
			<div class="progress" style="width: ${percentage}%"></div>
			<div class="progress-info">
				<div class="covered">${order.covered} kW</div><div class="percentage">${percentage}%</div><div class="total">${order.total} kW</div>
			</div>
		</div>
	</div>
	<label>Unit price</label>
	<div class="price">${order.price} gwei/kW</div>
	<label>State</label>
	<div class="state">${order.state}</div>
	${(function() { if (list == 'responding-orders') { return '<button class="btn">Take part</button>'; } else { return ''; } })()}
</div>
<div style="display: inline-block; width: 0.5em;"></div>`;

		let item = $(html);
		orders.append(item);
		item.on('click', function() {
	        signOrder(order.id);
	    });
	} else if (list == 'responding-orders-alt') {
		// 1.0
    	let html = `<div class="item" id="order-${order.id}">
	<div class="id">#${order.id}</div>
	<div class="time">${bD}.${bM}.${bY} ${bH}:${bm}</div>
	<div class="time">${eD}.${eM}.${eY} ${eH}:${em}</div>
	<div class="duration">${((order.ending - order.beginning) / (60 * 60)).toFixed(3)} hours</div>
	<div class="watts">
		<div class="my-progress-bar">
			<div class="progress" style="width: ${percentage}%"></div>
			<div class="progress-info">
				<div class="covered">${order.covered} kW</div><div class="percentage">${percentage}%</div><div class="total">${order.total} kW</div>
			</div>
		</div>
	</div>
	<div class="price">${order.price} gwei/kW</div>
	<div class="state">${order.state}</div>
</div>`;

		let item = $(html);
		orders.append(item);
		item.on('click', function() {
	        signOrder(order.id);
	    });
	} else if (list == 'requesting-orders') {
		// 2.0
		let html = `<div class="item" id="order-${order.id}">
	<div class="id">#${order.id}</div>
	<label>Beginning</label>
	<div class="time">${bD}.${bM}.${bY} ${bH}:${bm}</div>
	<label>Ending</label>
	<div class="time">${eD}.${eM}.${eY} ${eH}:${em}</div>
	<label>Duration</label>
	<div class="duration">${((order.ending - order.beginning) / (60 * 60)).toFixed(3)} hours</div>
	<label>Watts</label>
	<div class="watts">
		<div class="my-progress-bar">
			<div class="progress" style="width: ${percentage}%"></div>
			<div class="progress-info">
				<div class="covered">${order.covered} kW</div><div class="percentage">${percentage}%</div><div class="total">${order.total} kW</div>
			</div>
		</div>
	</div>
	<label>Unit price</label>
	<div class="price">${order.price} gwei/kW</div>
	<label>State</label>
	<div class="state">${order.state}</div>
	${(function() { if (list == 'responding-orders') { return '<button class="btn">Take part</button>'; } else { return ''; } })()}
</div>
<div style="display: inline-block; width: 0.5em;"></div>`;

		let item = $(html);
		orders.append(item);
		item.on('click', function() {
	        signOrder(order.id);
	    });
	}
	
}

function horizontalScroll(element) {
	var scroller = document.getElementById(element);

	function scrollHorizontally(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		scroller.scrollLeft -= (delta * 40);
		e.preventDefault();
	}

	if (scroller.addEventListener) {
		// IE9, Chrome, Safari, Opera
		scroller.addEventListener("mousewheel", scrollHorizontally, false);
		// Firefox
		scroller.addEventListener("DOMMouseScroll", scrollHorizontally, false); 
	} else {
		// IE 6/7/8
		scroller.attachEvent("onmousewheel", scrollHorizontally); 
	}
}