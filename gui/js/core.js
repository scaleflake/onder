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
	let blockSettingsToggler = $(`<div class="block-settings-toggler">⚙</div>`);
	blockHeader.append(blockSettingsToggler);

	let settings = false;
	blockSettingsToggler.on('click', function() {
		blockLabel.css('margin-top', `${settings ? '0px' : '-37px'}`);
		settings = !settings;
	});
}