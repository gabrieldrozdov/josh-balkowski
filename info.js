// Copy info email
function copyEmail() {
	navigator.clipboard.writeText('joshbalkowski@gmail.com');
}

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

// Heroes
let heroIndex = 0;
let heroes = document.querySelectorAll('.work-hero');
setInterval(() => {
	heroIndex++;
	if (heroIndex >= heroes.length) {
		heroIndex = 0;
	}
	for (let hero of heroes) {
		hero.dataset.active = 0;
	}
	let currentHero = heroes[heroIndex];
	currentHero.dataset.active = 1;
}, 4000)