gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
	el: document.querySelector('#main'),
	smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on('scroll', ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy('#main', {
	scrollTop(value) {
		return arguments.length
			? locoScroll.scrollTo(value, 0, 0)
			: locoScroll.scroll.instance.scroll.y;
	}, // we don't have to define a scrollLeft because we're only scrolling vertically.
	getBoundingClientRect() {
		return {
			top: 0,
			left: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
	// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
	pinType: document.querySelector('#main').style.transform
		? 'transform'
		: 'fixed',
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

// gsap.from('img', {
// 	scale: 1,
// 	scrollTrigger: {
// 		trigger: 'img',
// 		scroller: 'body',
// 		markers: true,
// 		start: 'top 50%',
// 		// end: "top 50%",
// 	},
// });

// <!-- ScrollTrigger -->
// 		<script
// 			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/ScrollTrigger.min.js"
// 			integrity="sha512-OzC82YiH3UmMMs6Ydd9f2i7mS+UFL5f977iIoJ6oy07AJT+ePds9QOEtqXztSH29Nzua59fYS36knmMcv79GOg=="
// 			crossorigin="anonymous"
// 			referrerpolicy="no-referrer"></script>
// 		<!-- GSAP -->
// 		<script
// 			src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js"
// 			integrity="sha512-EZI2cBcGPnmR89wTgVnN3602Yyi7muWo8y1B3a8WmIv1J9tYG+udH4LvmYjLiGp37yHB7FfaPBo8ly178m9g4Q=="
// 			crossorigin="anonymous"
// 			referrerpolicy="no-referrer"></script>
// 		<!-- locomotive-scroll script -->
// 		<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.js"></script>

// <!-- LOCOMOTIVE link -->
// 		<link
// rel="stylesheet"
// href="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.css" />
