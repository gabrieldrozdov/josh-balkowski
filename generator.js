const fs = require('fs');
const projects = require('./projects.json');

const currentYear = new Date().getFullYear();

const meta = `
	<meta name="author" content="Josh Balkowski">
	<meta name="keywords" content="Branding, Art Direction, Design, Treatments">
	<meta name="description" content="Josh Balkowski is a Toronto based Art Director and Designer.">
	<meta property="og:url" content="https://joshbalkowski.com/">
	<meta name="og:title" property="og:title" content="Josh Balkowski">
	<meta property="og:description" content="Josh Balkowski is a Toronto based Art Director and Designer.">
	<meta property="og:image" content="/assets/meta/opengraph.jpg">
	<link rel="icon" type="png" href="/assets/meta/favicon.png"></link>
`;

function generateHTML() {

	// Generate work and project pages
	let workIndex = "";
	let workHeroes = "";
	let projectIndex = 0;
	for (let project of projects) {

		// Add to work index
		workIndex += `
			<a class="work-projects-link" href="/work/${project['slug']}/" data-filters="${project['filters']}" data-project="${project['slug']}">
				<span class="work-projects-link-client">${project['display-name']}</span>
				<span class="work-projects-link-desc">${project['project']}</span>
				<span class="work-projects-link-tags">${project['tags']}</span>
				<span class="work-projects-link-date">${project['year']}</span>
			</a>
		`;

		// Project links
		let projectLinks = "";
		if (Object.keys(project['links']).length > 0) {
			for (let linkName in project['links']) {
				projectLinks += `<a href="${project['links'][linkName]}" target="_blank">${linkName}</a>`;
			}
			projectLinks = `
				<div class="project-animate project-header-client-links">
					${projectLinks}
				</div>
			`;
		}

		// Project tags
		let projectTags = "";
		if (Object.keys(project['info-categories']).length > 0) {
			for (let sectionName of Object.keys(project['info-categories'])) {
				let projectTagsSection = "";
				for (let tag of project['info-categories'][sectionName]) {
					projectTagsSection += `<p class="project-animate project-header-tags-item">${tag}</p>`;
				}
				projectTags += `
					<div class="project-header-tags-section">
						<h2 class="project-animate project-header-tags-heading">${sectionName}</h2>
						${projectTagsSection}
					</div>
				`;
			}
		}

		// Project media
		let projectMedia = '';
		for (let row of project['media']) {
			let rowHTML = '';
			for (let mediaData of row) {
				if (mediaData['video'] != "") {
					rowHTML += `
						<video autoplay muted loop playsinline disableRemotePlayback class="project-animate project-main-item-video" poster="${mediaData['image-normal']}" data-desktop="${mediaData['desktop']}" data-mobile="${mediaData['mobile']}">
							<source src="${mediaData['video']}">
						</video>
					`;
				} else if (mediaData['image-hover'] != "") {
					rowHTML += `
						<div class="project-animate project-main-item-hover" data-desktop="${mediaData['desktop']}" data-mobile="${mediaData['mobile']}">
							<img src="${mediaData['image-normal']}" class="project-main-item-hover-img1">
							<img src="${mediaData['image-hover']}" class="project-main-item-hover-img2">
						</div>
					`;	
				} else {
					rowHTML += `<img class="project-animate project-main-item-img" src="${mediaData['image-normal']}" data-desktop="${mediaData['desktop']}" data-mobile="${mediaData['mobile']}">`;
				}
			}
			projectMedia += `
				<div class="project-main-row">
					${rowHTML}
				</div>
			`;
		}

		// Hero
		let projectHeroDesktop = "";
		let projectHeroMobile = "";
		if (project['hero-desktop']['video'].length > 0) {
			projectHeroDesktop = `
				<video autoplay muted loop playsinline disableRemotePlayback class="project-header-thumbnail-desktop" poster="${project['hero-desktop']['image']}"">
					<source src="${project['hero-desktop']['video']}">
				</video>
			`;
		} else {
			projectHeroDesktop = `
				<img class="project-header-thumbnail-desktop" src="${project['hero-desktop']['image']}">
			`;
		}
		if (project['hero-mobile']['video'].length > 0) {
			projectHeroMobile = `
				<video autoplay muted loop playsinline disableRemotePlayback class="project-header-thumbnail-mobile" poster="${project['hero-mobile']['image']}"">
					<source src="${project['hero-mobile']['video']}">
				</video>
			`;
		} else {
			projectHeroMobile = `
				<img class="project-header-thumbnail-mobile" src="${project['hero-mobile']['image']}">
			`;
		}

		// Work and info heroes
		let workHeroDesktop = "";
		let workHeroMobile = "";
		let workHeroActive = 0;
		if (projectIndex == 0) {
			workHeroActive = 1;
		}
		if (project['hero-desktop']['video'].length > 0) {
			workHeroDesktop = `
				<video autoplay muted loop playsinline disableRemotePlayback class="work-hero-media work-hero-desktop" poster="/work/${project['slug']}/${project['hero-desktop']['image']}"">
					<source src="/work/${project['slug']}/${project['hero-desktop']['video']}">
				</video>
			`;
		} else {
			workHeroDesktop = `
				<img class="work-hero-media work-hero-desktop" src="/work/${project['slug']}/${project['hero-desktop']['image']}">
			`;
		}
		if (project['hero-mobile']['video'].length > 0) {
			workHeroMobile = `
				<video autoplay muted loop playsinline disableRemotePlayback class="work-hero-media work-hero-mobile" poster="/work/${project['slug']}/${project['hero-mobile']['image']}"">
					<source src="/work/${project['slug']}/${project['hero-mobile']['video']}">
				</video>
			`;
		} else {
			workHeroMobile = `
				<img class="work-hero-media work-hero-mobile" src="/work/${project['slug']}/${project['hero-mobile']['image']}">
			`;
		}
		workHeroes += `
			<div class="work-hero" data-project="${project['slug']}" data-active="${workHeroActive}">
				${workHeroDesktop}
				${workHeroMobile}
			</div>
		`;

		// Next project
		projectIndex++;
		if (projectIndex >= projects.length) {
			projectIndex = 0;
		}
		let nextProject = projects[projectIndex]['slug'];

		// Put it all together
		let projectContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Josh Balkowski | ${project['client']}</title>
				${meta}
				<link rel="stylesheet" href="/style.css">
				<style>
					.dark {
						--primary: ${project['primary-color']};
						--secondary: ${project['secondary-color']};
					}
				</style>
				<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
				<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
			</head>
			<body class="light">
				<div class="project">
					<div class="logo">Josh Balkowski</div>
					<nav class="nav">
						<a href="/work">Work</a>
						<a href="/info">Info</a>
					</nav>
					<button class="mode-toggle mode-toggle-alt" onclick="toggleMode();"></button>
					<a class="project-next" href="/work/${nextProject}/">Next ></a>
			
					<header class="project-header">
						<div class="project-header-thumbnail">
							${projectHeroDesktop}
							${projectHeroMobile}
						</div>
						<div class="project-header-content">
							<div class="project-header-client">
								<div class="project-animate project-header-client-label">${project['display-name']}</div>
								<h1 class="project-animate project-header-client-heading">${project['heading']}</h1>
								${projectLinks}
							</div>
							<button class="project-header-toggle" onclick="toggleProjectMobile();" data-active="0">
								<svg viewBox="0 0 15 9">
									<path d="M7.5,9c-.28,0-.54-.12-.73-.32L.27,1.68C-.11,1.28-.09.64.32.27c.4-.38,1.04-.35,1.41.05l5.77,6.21L13.27.32c.37-.41,1.01-.43,1.41-.05.4.38.43,1.01.05,1.41l-6.5,7c-.19.2-.45.32-.73.32Z"/>
								</svg>
							</button>
							<div class="project-header-info" data-active="0">
								<h2 class="project-animate project-header-info-heading">${project['project']}</h2>
								<p class="project-animate project-header-info-desc">
									${project['desc']}
								</p>
							</div>
							<div class="project-header-tags" data-active="0">
								${projectTags}
							</div>
							<div class="project-animate project-header-date">${project['year']}</div>
						</div>
					</header>
			
					<main class="project-main">
						${projectMedia}
					</main>
				</div>
				
				<script src="/script.js"></script>
				<script src="/project.js"></script>
			</body>
			</html>
		`;

		// Create project file
		fs.writeFile(`./work/${project['slug']}/index.html`, projectContent, err => {
			if (err) {
				console.error(err);
			}
		});
	}

	let workContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Josh Balkowski | Work</title>
			${meta}
			<link rel="stylesheet" href="/style.css">
		</head>
		<body class="light">
			<div class="work">
				<div class="logo">Josh Balkowski</div>
				<nav class="nav">
					<a href="/" data-active="1">Work</a>
					<a href="/info">Info</a>
				</nav>
				<button class="mode-toggle mode-toggle-alt" onclick="toggleMode();"></button>
				<p class="copyright">© ${currentYear}</p>

				<main class="work-projects">
					<div class="work-projects-filters">
						<div class="work-projects-filters-categories">
							<button class="work-projects-filters-category" data-category="Branding" onclick="setFilter('Branding')">Branding</button>
							<button class="work-projects-filters-category" data-category="Art Direction" onclick="setFilter('Art Direction')">Art Direction</button>
							<button class="work-projects-filters-category" data-category="Design" onclick="setFilter('Design')">Design</button>
							<button class="work-projects-filters-category" data-category="Treatments" onclick="setFilter('Treatments')">Treatments</button>
						</div>
						<button class="work-projects-filters-category" data-category="All" onclick="setFilter('All')" data-active="1">All</button>
					</div>

					<div class="work-projects-divider"></div>

					<div class="work-projects-links">
						${workIndex}
					</div>
				</main>

				<div class="work-heroes">
					${workHeroes}
				</div>
			</div>
			
			<script src="/script.js"></script>
			<script src="/work.js"></script>
		</body>
		</html>
	`;

	// Create work file
	fs.writeFile(`./work/index.html`, workContent, err => {
		if (err) {
			console.error(err);
		}
	});

	// Generate info page
	let infoContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Josh Balkowski | Info</title>
			${meta}
			<link rel="stylesheet" href="/style.css">
		</head>
		<body class="light">
			<div class="info">
				<div class="logo">Josh Balkowski</div>
				<nav class="nav">
					<a href="/work">Work</a>
					<a href="/" data-active="1">Info</a>
				</nav>
				<button class="mode-toggle mode-toggle-alt" onclick="toggleMode();"></button>
				<p class="copyright">© ${currentYear}</p>

				<main class="info-main" data-active="0">
					<header class="info-main-header">
						<h1 class="info-main-desc">
							Josh Balkowski is a Toronto based Art&nbsp;Director and Designer.
						</h1>
						<button class="info-main-email" onclick="copyEmail();">
							<span>joshbalkowski@gmail.com</span>
							<svg viewBox="0 0 29 29">
								<path class="cls-2" d="M20.99,6h-8c-1.1,0-2,.9-2,2v2h-3c-1.1,0-2,.9-2,2v9c0,1.1.9,2,2,2h8c1.1,0,2-.9,2-2v-2h3c1.1,0,2-.9,2-2v-9c0-1.1-.9-2-2-2ZM15.99,21H7.99v-9s0,0,0,0h8v9ZM20.99,17h-3v-5c0-1.1-.9-2-2-2h-3v-2s0,0,0,0h8v9Z"/>
							</svg>
						</button>
					</header>

					<button class="info-main-desc-toggle" onclick="toggleInfo();">
						<svg viewBox="0 0 15 9">
							<path d="M7.5,9c-.28,0-.54-.12-.73-.32L.27,1.68C-.11,1.28-.09.64.32.27c.4-.38,1.04-.35,1.41.05l5.77,6.21L13.27.32c.37-.41,1.01-.43,1.41-.05.4.38.43,1.01.05,1.41l-6.5,7c-.19.2-.45.32-.73.32Z"/>
						</svg>
					</button>

					<div class="info-main-body info-main-col1">
						<h2>About</h2>
						<p>
							I’ve led creative teams, co-founded a modest design agency, and collaborated with brands, production companies, startups, studios, and clients, of all shapes and sizes.
						</p>
						<p>
							Whether building brand identities, designing systems processes, researching for presentations, or developing campaigns, my approach is always the same; align concepts with business strategy, to connect thoughtful ideas to tangible outcomes.
						</p>
						<p>
							I like helping ideas find their shape. I love clarity. I care about making work that’s both thoughtful and impactful to brands, people, and their communities.
						</p>

						<div class="info-main-body-break"></div>

						<h2>Recently</h2>
						<p>
							Made a fun website for a friend’s band. Designed some packaging for incense sticks. Just wrapped work on a disclosed project with an incredible team as a Sr. Designer for Apple.
						</p>

						<div class="info-main-body-break"></div>

						<h2>Currently</h2>
						<p>
							Consulting for a mental-health clinic to create systems that encourage inter-organization communication and establish new processes, that increase efficiency around time consuming practices. Also, I’m updating my onboarding materials for new clients.
						</p>

						<div class="info-main-body-break"></div>

						<h2>Open to</h2>
						<p>
							Art direction, brand identity, and senior design roles or contracts within agencies or studios. But, always open to chat about interesting projects and ideas in other categories.
						</p>
					</div>
					
					<div class="info-main-body info-main-col2">
						<h2>Services</h2>
						<ul>
							<li>Art Direction</li>
							<li>Branding</li>
							<li>Web Design</li>
							<li>Packaging Design</li>
							<li>Presentation Design</li>
							<li>Apparel Design</li>
						</ul>

						<div class="info-main-body-break"></div>

						<h2>Website</h2>
						<p>
							<a href="https://noreplica.com/" target="_blank">No Replica ↗</a>
						</p>
					</div>

					<div class="info-main-body info-main-col3">
						<h2>Free ideas</h2>
						<p>
							Some half-baked ideas from my notes app:
						</p>
						<p>
							→ Oh Goooogle!<br>
							<em>Show people doing things Google already handles to highlight how seamless life becomes when the small stuff just works. Examples: manually navigating with a map sprawled open in the car, running to change the temp on a thermostat when your roommate asks no matter what you were in the middle of, having a local translating when buying flowers and they follow you - making an intimate moment awkward.</em>
						</p>
						<p>
							→ Aritzia: Worth an Audience<br>
							<em>A campaign centred on the plush lounge area within Aritzia, (now with its own coffee shop). The looks are so good, they deserve an audience, so we made an stage for them - where friends get to enjoy being a spectator to style.</em>
						</p>
						<p>
							→ GPS Walking Tours<br>
							<em>Google maps has a powerful understanding of where you have been and where you are exploring for the first time. Imagine an option on google maps for a self guided walking tour where ambient audio, historical facts and parking memory or transit directions pose as a conversation on a solo discovery day in new city. Real-world interactive assistive layer.</em>
						</p>
						<p>
							→ Physical Savings<br>
							<em>A savings system that turns impulse buying into impulse saving. Imagine a sealed “mystery savings box” at grocery stores priced at $5, $10, or $25. You buy the box, get a small item or two inside, and the remaining value is automatically deposited into your savings account. Designed to add a tactile, game-like layer to everyday financial habits.</em>
						</p>
						<p>
							→ Tinder “Can’t start a fire without a spark”<br>
							<em>Romantic montage of fire-lit first dates: candles, campfires, cooking dinner, and fireworks—set to the soundtrack “Dancing in the Dark” by Bruce Springsteen</em>
						</p>
						<p>
							→ Spotify Bins<br>
							<em>An algorithm-free record bin inside Spotify. Browse by cover art. Great for VR, or just crate-digging nostalgia.</em>
						</p>
						<p>
							→ “The Chair” gets vertical<br>
							<em>Wall-mounted laundry hamper with an edge zone where stuff can hang in between clean and dirty. Functioning like the famous ’bedroom chair’ without the needed floor space. Just tip it in when it’s past the point of no return and needs a cycle.</em>
						</p>
						<p>
							If you want to build one of these, or something like it, send a message. Or just steal it, I'd rather see it out there.
						</p>
					</div>
				</main>

				<div class="info-background">
					${workHeroes}
				</div>
			</div>
			
			<script src="/script.js"></script>
			<script src="/info.js"></script>
		</body>
		</html>
	`;

	// Create info file
	fs.writeFile(`./info/index.html`, infoContent, err => {
		if (err) {
			console.error(err);
		}
	});

	// Generate homepage
	let homeHeroes = '';
	let homeHeroIndex = 0;
	for (let project of projects) {
		let heroData = project['home-hero'];
		if (heroData['desktop-image'].length > 0) {
			let active = false;
			if (homeHeroIndex == 0) {
				active = true;
			}
			homeHeroes += `
				<div class="home-background-hero" id="${project['slug']}" data-active="${active}">
					<img src="/work/${project['slug']}/${heroData['desktop-image']}" class="home-background-hero-image home-background-hero-image-desktop">
					<img src="/work/${project['slug']}/${heroData['mobile-image']}" class="home-background-hero-image home-background-hero-image-mobile">
					<p class="home-background-hero-caption">${heroData['caption']}</p>
				</div>
			`;
			homeHeroIndex++;
		}
	}

	let homeContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Josh Balkowski</title>
			${meta}
			<link rel="stylesheet" href="/style.css">
			<style>
				.light .logo {
					color: var(--secondary);
				}
				.light .nav a {
					color: var(--secondary);
				}
				.light .copyright {
					color: var(--secondary);
				}
				.dark .mode-toggle {
					background-color: var(--primary);
				}
				.dark .home-background-hero-caption {
					color: var(--primary);
				}
			</style>
		</head>
		<body class="light">
			<div class="home">
				<h1 class="logo">Josh Balkowski</h1>
				<nav class="nav">
					<a href="/work">Work</a>
					<a href="/info">Info</a>
				</nav>
				<button class="mode-toggle mode-toggle-home" onclick="toggleMode();"></button>
				<p class="copyright">© ${currentYear}</p>
		
				<main class="home-background">
					${homeHeroes}
				</main>
			</div>
			
			<script src="/script.js"></script>
			<script src="/home.js"></script>
		</body>
		</html>
	`;

	// Create homepage file
	fs.writeFile(`index.html`, homeContent, err => {
		if (err) {
			console.error(err);
		}
	});
}
generateHTML();