// Switch between dark and light mode
function toggleMode() {
	let mode = localStorage.getItem('mode');
	if (mode) {
		if (mode == "light") {
			mode = 'dark';
			localStorage.setItem('mode', 'dark');
		} else {
			mode = 'light';
			localStorage.setItem('mode', 'light');
		}
	} else {
		mode = 'light';
		localStorage.setItem('mode', 'light');
	}
	document.body.classList = [];
	document.body.classList.add(mode);
}
function detectMode() {
	let mode = localStorage.getItem('mode');
	if (!mode) {
		mode = 'light';
		localStorage.setItem('mode', 'light');
	}
	document.body.classList = [];
	document.body.classList.add(mode);
}
detectMode();