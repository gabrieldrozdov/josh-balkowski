// Toggle info on mobile
function toggleProjectMobile() {
	let projectHeaderToggle = document.querySelector('.project-header-toggle');
	let projectHeaderInfo = document.querySelector('.project-header-info');
	let projectHeaderTags = document.querySelector('.project-header-tags');
	if (parseInt(projectHeaderToggle.dataset.active) == 1) {
		projectHeaderToggle.dataset.active = 0;
		projectHeaderInfo.dataset.active = 0;
		projectHeaderTags.dataset.active = 0;
	} else {
		projectHeaderToggle.dataset.active = 1;
		projectHeaderInfo.dataset.active = 1;
		projectHeaderTags.dataset.active = 1;
	}
}

// GSAP animations
ScrollTrigger.batch(".project-animate", {
  onEnter: (batch) => {
    gsap.to(batch, {
      opacity: 1,
      stagger: 0.03, // delay between items in the same viewport batch
      duration: .75,
	  delay: .15,
      ease: "power2.out"
    });
  },
//   start: "top 80%",
  once: true // only animate the first time they enter
});