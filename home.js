let heroIndex = 0;
let heroes = document.querySelectorAll('.home-background-hero');
setInterval(() => {
	heroIndex++;
	if (heroIndex >= heroes.length) {
		heroIndex = 0;
	}
	for (let hero of heroes) {
		hero.dataset.active = false;
	}
	let currentHero = heroes[heroIndex];
	currentHero.dataset.active = true;
}, 2000)