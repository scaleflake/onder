/*jshint esversion: 6 */

// CORE

class Module {
	constructor(m) {
		this.hidden = false;

		let module = $(`<div class="module" id="${name}"></div>`);

		let header = $(`<div class="module-header"><div>${label}</div></div>`);
		header.on('click', function() {
			
		});
		module.append(header);

		let content = $(`<div class="module-content"><ul class="row"></ul></div>`);


		
		let list = 4;
		Sortable.create(list, { handle: '.block-dragging-button' });
	}
	toggle() {
		if (this.hidden) {
			this.module.removeClass('hidden');
			this.hidden = false; 
		} else {
			this.module.addClass('hidden');
			this.hidden = true; 
		}
	}
}

class Block {
	constructor(b) {
		this.settings = false;

	}
}

class ModuleBlock {
	constructor() {

	}
}

function ModuleToggler(moduleName) {
	this.module = $('#' + moduleName);
	this.hidden = this.module.hasClass('hidden');
	this.toggle = function() {
		if (this.hidden) {
			this.module.removeClass('hidden');
			this.hidden = false; 
		} else {
			this.module.addClass('hidden');
			this.hidden = true; 
		}
	};
}

function SettingsToggler(id, label) {
	let blockHeader = $('#' + id);
	let blockLabel = $(`<div class="block-label">${label}</div>`);
	blockHeader.append(blockLabel);
	let blockSettings = $(`<div class="block-settings">soon</div>`);
	blockHeader.append(blockSettings);
	let blockDraggerButton = $(`<div class="block-dragging-button"><img src="./assets/move.svg"></div>`); //⬌
	blockHeader.append(blockDraggerButton);
	let blockSettingsToggler = $(`<div class="block-settings-toggler"><img src="./assets/settings.svg"></div>`); // ⚙
	blockHeader.append(blockSettingsToggler);
	let blockDraggingHint = $(`<div class="block-dragging-hint">Drag blocks to swap them</div>`);
	blockHeader.append(blockDraggingHint);

	let settingsToggled = false;
	blockSettingsToggler.on('click', function() {
		blockLabel.css('margin-top', `${settingsToggled ? '0px' : '-37px'}`);
		settingsToggled = !settingsToggled;
	});
}