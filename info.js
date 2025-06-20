// Toggle info on mobile
function toggleInfo() {
	let btn = document.querySelector('.info-main-desc-toggle');
	let infoMain = document.querySelector('.info-main');
	if (parseInt(infoMain.dataset.active) == 0) {
		infoMain.dataset.active = 1;
		btn.dataset.active = 1;
	} else {
		infoMain.dataset.active = 0;
		btn.dataset.active = 0;
	}
}