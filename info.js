// Copy info email
function copyEmail() {
	navigator.clipboard.writeText('joshbalkowski@gmail.com');
}

// Toggle info on mobile
function toggleInfo() {
	let btn = document.querySelector('.info-main-desc-toggle');
	let desc = document.querySelector('.info-main-desc-mobile');
	if (parseInt(desc.dataset.active) == 0) {
		desc.dataset.active = 1;
		btn.dataset.active = 1;
	} else {
		desc.dataset.active = 0;
		btn.dataset.active = 0;
	}
}