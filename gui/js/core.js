/*jshint esversion: 6 */

// CORE

class Module {
	constructor() {
		
	}
}

class Block {
	constructor() {
		
	}
}

function ModuleToggler(moduleName) {
	// let blockHeader = $('#' + id);
	this.module = document.getElementById(moduleName);
	this.hidden = this.module.classList.contains('hidden');
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

	let settings = false;
	blockSettingsToggler.on('click', function() {
		blockLabel.css('margin-top', `${settings ? '0px' : '-37px'}`);
		settings = !settings;
	});
}