'use strict';
document.addEventListener('click', documentClick);
function documentClick(e) {
	const targetItem = e.target;
	if (targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu__open');
	}
}

//?===========================slider===========================

const swiper = new Swiper('.swiper', {
	loop: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	simulateTouch: true,
	grabCursor: true,
	slidesPerView: 5,
	loopedSlides: 5,

	autoplay: {
		delay: 3000,
	},
	speed: 1000,

	breakpoints: {
		320: {
			slidesPerView: 1.5,
			spaceBetween: 5,
		},
		350: {
			slidesPerView: 1.9,
			spaceBetween: 10,
		},

		480: {
			slidesPerView: 2.3,
			spaceBetween: 20,
		},

		540: {
			slidesPerView: 2.6,
			spaceBetween: 30,
		},
		876: {
			slidesPerView: 4,
			spaceBetween: 50,
		},

		1150: {
			slidesPerView: 5,
			spaceBetween: 90,
		},
	},

	freemode: true,
});
