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
function setToggle(option) {
	const options = document.querySelectorAll('.toggle-options');
	const individualprice = document.querySelector('#individual-price');
	const businessprice = document.querySelector('#business-price');
	options.forEach((opt, index) =>
		opt.classList.toggle(
			'active',
			option === (index === 0 ? 'monthly' : 'yearly')
		)
	);
	option === 'monthly'
		? ((individualprice.innerText = '$18/m'),
		  (businessprice.innerText = '$30/m'))
		: ((individualprice.innerText = '$172.8/y'),
		  (businessprice.innerText = '$288/y'));
}
function setPack(option) {
	const options = document.querySelectorAll('.price-card');

	// Determine the position of the active background slider
	let position = 0;
	if (option === 'starter') position = 0;
	if (option === 'individual') position = 1;
	if (option === 'business') position = 2;
	// Update the slider position
	options.forEach((opt, index) =>
		opt.classList.toggle('active', index === position)
	);
}
function setComp(option) {
	const options = document.querySelectorAll('.test-logo-image');

	let position = 0;
	if (option === 'capsule') position = 0;
	if (option === 'spherule') position = 1;
	if (option === 'galileo') position = 2;
	if (option === 'segment') position = 3;
	// Update the slider position
	options.forEach((opt, index) =>
		opt.classList.toggle('active', index === position)
	);
}
document.querySelectorAll('.faqs-ques').forEach((ques) => {
	ques.addEventListener('click', () => {
		const ans = ques.nextElementSibling;
		const icon = ques.querySelector('img');

		const isVisible = !ans.classList.contains('hidden');

		document.querySelectorAll('.faqs-ans').forEach((answers) => {
			answers.classList.add('hidden');
		});
		document.querySelectorAll('.faqs-ques img').forEach((plus) => {
			plus.classList.remove('cross');
		});

		if (!isVisible) {
			ans.classList.remove('hidden');
			icon.classList.add('cross');
		}
	});
});

// let arrofblogs = [
// 	{ blogid: 1, heading: 'xyz', content: 'abcde', related: [2, 3] },
// 	{ blogid: 2, heading: 'xjfjf', content: 'dkjhc', related: [3, 4, 5] },
// 	{ blogid: 3, heading: 'dzcjhos', content: 'dkjhd', related: [4, 5, 6] },
// ];

const blogsCardsArr = [
	{
		imgSrc: './resources/blog-card-img-1.png',
		category: 'Business',
		date: 'Jan 11, 2024',
		readTime: '5 min read',
		title: 'Aimate transforms customer support experiences with AI',
	},
	{
		imgSrc: './resources/blog-card-img-2.png',
		category: 'Business',
		date: 'Jan 11, 2024',
		readTime: '10 min read',
		title: 'Shaping future of seamless customer interactions with AI',
	},
	{
		imgSrc: './resources/blog-card-img-3.png',
		category: 'Experience',
		date: 'Jan 11, 2024',
		readTime: '5 min read',
		title: 'How Aimate is revolutionizing overall customer experience',
	},
	{
		imgSrc: './resources/blog-card-img-4.png',
		category: 'Business',
		date: 'Jan 11, 2024',
		readTime: '6 min read',
		title: 'Understanding the impact of Aimate on business for conversion',
	},
	{
		imgSrc: './resources/blog-card-img-5.png',
		category: 'Experience',
		date: 'Jan 11, 2024',
		readTime: '8 min read',
		title: 'The growing demand for AI-powered customer support solutions',
	},
	{
		imgSrc: './resources/blog-card-img-6.png',
		category: 'Business',
		date: 'Jan 11, 2024',
		readTime: '5 min read',
		title: 'How AI chatbots are reshaping the customer service landscape',
	},
	{
		imgSrc: './resources/blog-card-img-7.png',
		category: 'Growth',
		date: 'Jan 11, 2024',
		readTime: '5 min read',
		title: 'Navigating compliance challenges in the AI customer support sector',
	},
	{
		imgSrc: './resources/blog-card-img-8.png',
		category: 'Business',
		date: 'Jan 11, 2024',
		readTime: '8 min read',
		title: 'Exploring the latest innovations in AI customer service niche',
	},
	{
		imgSrc: './resources/blog-card-img-9.png',
		category: 'Market',
		date: 'Jan 11, 2024',
		readTime: '5 min read',
		title: 'Shift towards AI-powered customer service experiences',
	},
];

