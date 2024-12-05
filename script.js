// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
	el: document.querySelector('#main'),
	smooth: true,
});

// Sync ScrollTrigger with Locomotive Scroll
locoScroll.on('scroll', ScrollTrigger.update);

// Set up ScrollTrigger to use Locomotive Scroll as the scroller
ScrollTrigger.scrollerProxy('#main', {
	scrollTop(value) {
		return arguments.length
			? locoScroll.scrollTo(value, 0, 0)
			: locoScroll.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
	pinType: document.querySelector('#main').style.transform
		? 'transform'
		: 'fixed',
});

// Refresh ScrollTrigger on window updates
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// Initial refresh
ScrollTrigger.refresh();

// Navbar scroll logic
document.addEventListener('DOMContentLoaded', () => {
	const navbar = document.querySelector('.nav-bar');
	let lastScrollY = 0;

	locoScroll.on('scroll', (obj) => {
		const currentScrollY = obj.scroll.y;

		if (currentScrollY > lastScrollY) {
			// Scrolling down
			navbar.style.transform = 'translateY(-100%)';
		} else {
			// Scrolling up
			navbar.style.transform = 'translateY(0)';
		}

		lastScrollY = currentScrollY;
	});
});
