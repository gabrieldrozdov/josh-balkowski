// Switch between filters
let activeFilter = 'All';
function setFilter(filter) {
	if (activeFilter == filter) {
		activeFilter = "All";
	} else {
		activeFilter = filter;
	}

	// Style active filter
	for (let filterBtn of document.querySelectorAll('.work-projects-filters-category')) {
		filterBtn.dataset.active = 0;
		if (filterBtn.dataset.category == activeFilter) {
			filterBtn.dataset.active = 1;
		}
	}

	// Hide/show projects based on active filter
	if (activeFilter == 'All') {
		for (let projectLink of document.querySelectorAll('.work-projects-link')) {
			projectLink.dataset.hidden = false;
		}
	} else {
		for (let projectLink of document.querySelectorAll('.work-projects-link')) {
			let projectTags = projectLink.dataset.filters.split(',');
			if (projectTags.includes(activeFilter) || projectTags.includes(activeFilter + " ") || projectTags.includes(" " + activeFilter)) {
				projectLink.dataset.hidden = false;
			} else {
				projectLink.dataset.hidden = true;
			}
		}
	}
}

// Show featured image
let workProjectLinks = document.querySelectorAll('.work-projects-link');
let imageDelay;
for (let workProjectLink of workProjectLinks) {
	workProjectLink.addEventListener('mouseenter', () => {
		clearTimeout(imageDelay);
		for (let workProjectLink of workProjectLinks) {
			workProjectLink.dataset.active = 0;
		}
		workProjectLink.dataset.active = 1;

		for (let workHero of document.querySelectorAll('.work-hero')) {
			workHero.dataset.active = 0;
		}
		let featuredHero = document.querySelector(`.work-hero[data-project="${workProjectLink.dataset.project}"]`);
		featuredHero.dataset.active = 1;
	})
	workProjectLink.addEventListener('mouseleave', () => {
		imageDelay = setTimeout(() => {
			for (let workProjectLink of workProjectLinks) {
				workProjectLink.dataset.active = 1;
			}
		}, 250)
	})
}