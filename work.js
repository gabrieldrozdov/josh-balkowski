// Switch between filters
let activeFilter = 'all';
function setFilter(filter) {
	activeFilter = filter;

	// Style active filter
	for (let filterBtn of document.querySelectorAll('.work-projects-filters-category')) {
		filterBtn.dataset.active = 0;
		if (filterBtn.dataset.filter == activeFilter) {
			filterBtn.dataset.active = 1;
		}
	}

	// Hide/show projects based on active filter
	if (activeFilter == 'all') {
		for (let projectLink of document.querySelectorAll('.work-projects-link')) {
			projectLink.dataset.active = 1;
		}
	} else {
		for (let projectLink of document.querySelectorAll('.work-projects-link')) {
			let projectTags = projectLink.dataset.tags.split(',');
			if (projectTags.includes(activeFilter)) {
				projectLink.dataset.active = 1;
			} else {
				projectLink.dataset.active = 0;
			}
		}
	}
}

// Show featured image
let workProjectLinks = document.querySelectorAll('.work-projects-link');
for (let workProjectLink of workProjectLinks) {
	workProjectLink.addEventListener('mouseenter', () => {
		for (let workProjectLink of workProjectLinks) {
			workProjectLink.dataset.active = 0;
		}
		workProjectLink.dataset.active = 1;

		// TODO: show featured image
	})
}