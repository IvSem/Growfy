'use strict';
document.addEventListener('click', documentClick);
function documentClick(e) {
	const targetItem = e.target;
	if (targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu__open');
	}
}

//?===========================slider=====1======================

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
});
//?===========================slider======2=====================
const swiperText = new Swiper('.swipertext', {
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
	slidesPerView: 3,

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 16,
		},
		374.98: {
			slidesPerView: 1.2,
			spaceBetween: 16,
		},

		424.98: {
			slidesPerView: 1.2,
			spaceBetween: 20,
		},
		540: {
			slidesPerView: 1.5,
			spaceBetween: 25,
		},
		690: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		767.98: {
			slidesPerView: 2.2,
			spaceBetween: 30,
		},

		991.98: {
			slidesPerView: 2.8,

			spaceBetween: 38,
		},
		1095: {
			slidesPerView: 3,

			spaceBetween: 48,
		},

		// 540: {
		// 	slidesPerView: 1.5,
		// 	spaceBetween: 28,
		// },
		// 690: {
		// 	slidesPerView: 2,
		// 	spaceBetween: 18,
		// },

		// 991.98: {
		// 	slidesPerView: 2.8,
		// 	spaceBetween: 28,
		// },

		// 1150: {
		// 	slidesPerView: 3,
		// 	spaceBetween: 48,
		// },
	},
});

//?===========================Raiting===========================
const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
	initRatings();
}

function initRatings() {
	let ratingActive, ratingValue;
	// "Бегаем" по всем рейтингам на странице
	for (let index = 0; index < ratings.length; index++) {
		const rating = ratings[index];
		initRating(rating);
	}
	// Инициализируем конкретный рейтинг
	function initRating(rating) {
		initRatingVars(rating);

		setRatingActiveWidth();

		if (rating.classList.contains('rating_set')) {
			setRating(rating);
		}
	}
	// Инициализайция переменных
	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}
	// Изменяем ширину активных звезд
	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
	// Возможность указать оценку
	function setRating(rating) {
		const ratingItems = rating.querySelectorAll('.rating__item');
		for (let index = 0; index < ratingItems.length; index++) {
			const ratingItem = ratingItems[index];
			ratingItem.addEventListener('mouseenter', function (e) {
				// Обновление переменных
				initRatingVars(rating);
				// Обновление активных звезд
				setRatingActiveWidth(ratingItem.value);
			});
			ratingItem.addEventListener('mouseleave', function (e) {
				// Обновление активных звезд
				setRatingActiveWidth();
			});
			ratingItem.addEventListener('click', function (e) {
				// Обновление переменных
				initRatingVars(rating);

				if (rating.dataset.ajax) {
					// "Отправить" на сервер
					setRatingValue(ratingItem.value, rating);
				} else {
					// Отобразить указанную оцнку
					ratingValue.innerHTML = index + 1;
					setRatingActiveWidth();
				}
			});
		}
	}
	async function setRatingValue(value, rating) {
		if (!rating.classList.contains('rating_sending')) {
			rating.classList.add('rating_sending');

			// Отправика данных (value) на сервер
			let response = await fetch('rating.json', {
				method: 'GET',

				//body: JSON.stringify({
				//	userRating: value
				//}),
				//headers: {
				//	'content-type': 'application/json'
				//}
			});
			if (response.ok) {
				const result = await response.json();

				// Получаем новый рейтинг
				const newRating = result.newRating;

				// Вывод нового среднего результата
				ratingValue.innerHTML = newRating;

				// Обновление активных звезд
				setRatingActiveWidth();

				rating.classList.remove('rating_sending');
			} else {
				alert('Ошибка');

				rating.classList.remove('rating_sending');
			}
		}
	}
}
