import Swiper from "swiper/bundle";
import "swiper/css/bundle";

document.addEventListener("DOMContentLoaded", () => {
	const carousels = document.querySelectorAll(".wp-block-ud-carousel-block");
	if (!carousels.length) return;

	carousels.forEach((carouselEl) => {
		const swiperContainer = carouselEl.querySelector(".swiper");
		if (!swiperContainer) return;

		const uniqueId = Math.random().toString(36).substr(2, 9);

		const nextBtn = carouselEl.querySelector(".swiper-button-next");
		const prevBtn = carouselEl.querySelector(".swiper-button-prev");

		if (nextBtn) nextBtn.dataset.swiperId = uniqueId;
		if (prevBtn) prevBtn.dataset.swiperId = uniqueId;

		const slides = swiperContainer.querySelectorAll(".swiper-slide");
		const spaceBetween = parseInt(carouselEl.dataset.spaceBetween) || 0;
		const baseSlidesPerView =
			parseInt(carouselEl.dataset.slidesPerView) || 1;
		const loopEnabled = carouselEl.dataset.loop === "true";
		const autoplayEnabled = carouselEl.dataset.autoplay === "true";
		const autoplaySpeed =
			parseInt(carouselEl.dataset.autoplaySpeed) || 3000;

		/* =============================================================== *\
   			Breakpoints vorbereiten
		\* =============================================================== */
		const breakpoints = (() => {
			try {
				const bps = JSON.parse(carouselEl.dataset.breakpoints || "[]");
				return bps.reduce((acc, bp) => {
					acc[bp.width] = {
						slidesPerView: bp.slidesPerView,
						slidesPerGroup: 1,
						loop: loopEnabled,
						loopedSlides: slides.length,
					};
					return acc;
				}, {});
			} catch {
				return {};
			}
		})();

		const getCurrentSlidesPerView = () => {
			let current = baseSlidesPerView;
			const viewport = window.innerWidth;
			Object.keys(breakpoints).forEach((bp) => {
				const bpNum = parseInt(bp, 10);
				if (viewport >= bpNum) {
					current = breakpoints[bp].slidesPerView;
				}
			});
			return current;
		};

		/* =============================================================== *\
   			Loop ggf. erzwingen (Duplikate anlegen)
		\* =============================================================== */
		const wrapper = swiperContainer.querySelector(".swiper-wrapper");
		if (loopEnabled && slides.length <= baseSlidesPerView * 2) {
			const clones = [];
			for (let i = 0; i < 2; i++) {
				slides.forEach((s) => {
					const clone = s.cloneNode(true);
					clone.classList.add("swiper-slide-duplicate");
					clones.push(clone);
				});
			}
			clones.forEach((clone) => wrapper.appendChild(clone));
		}

		/* =============================================================== *\
			Swiper initialisieren
		\* =============================================================== */
		const swiper = new Swiper(swiperContainer, {
			watchOverflow: false,
			loop: loopEnabled,
			slidesPerView: baseSlidesPerView,
			slidesPerGroup: 1,
			spaceBetween: spaceBetween,
			speed: parseInt(carouselEl.dataset.speed) || 300,
			loopFillGroupWithBlank: false,

			autoplay: autoplayEnabled
				? {
						delay: autoplaySpeed,
						disableOnInteraction: false,
				  }
				: false,

			navigation:
				nextBtn && prevBtn
					? {
							nextEl: nextBtn,
							prevEl: prevBtn,
					  }
					: false,
			pagination:
				carouselEl.dataset.pagination === "true"
					? {
							el: carouselEl.querySelector(".swiper-pagination"),
							clickable: true,
					  }
					: false,
			breakpoints: breakpoints,
		});

		/* =============================================================== *\
			Autoplay-Fix (manuelles Starten + Hover-Pause)
		\* =============================================================== */
		if (autoplayEnabled && swiper.autoplay) {
			swiper.autoplay.start();
			swiperContainer.addEventListener("mouseenter", () =>
				swiper.autoplay.stop()
			);
			swiperContainer.addEventListener("mouseleave", () =>
				swiper.autoplay.start()
			);
		}

		/* =============================================================== *\
   			Navigation sichtbar / unsichtbar halten
		\* =============================================================== */
		const updateNavigationVisibility = () => {
			if (!nextBtn || !prevBtn) return;
			const current = getCurrentSlidesPerView();
			if (slides.length <= current) {
				nextBtn.classList.add("is-hidden");
				prevBtn.classList.add("is-hidden");
			} else {
				nextBtn.classList.remove("is-hidden");
				prevBtn.classList.remove("is-hidden");
			}
		};

		/* =============================================================== *\
    		Manuelle Disabled-States der Pfeile (wenn loop = false)
		\* =============================================================== */
		const updateButtonDisabledState = () => {
			if (!loopEnabled) {
				prevBtn.classList.toggle(
					"swiper-button-disabled",
					swiper.isBeginning
				);
				nextBtn.classList.toggle(
					"swiper-button-disabled",
					swiper.isEnd
				);
			}
		};

		/* =============================================================== *\
			Gleich hohe Karten
		\* =============================================================== */
		const updateEqualHeights = () => {
			let maxHeight = 0;
			swiper.slides.forEach((slide) => {
				const card = slide.querySelector(".ud-testimonial-card");
				if (card) {
					card.style.height = "auto";
					maxHeight = Math.max(maxHeight, card.offsetHeight);
				}
			});
			swiper.slides.forEach((slide) => {
				const card = slide.querySelector(".ud-testimonial-card");
				if (card) card.style.height = `${maxHeight}px`;
			});
		};

		/* =============================================================== *\
   			Initialzustand prüfen
		\* =============================================================== */
		updateNavigationVisibility();
		updateButtonDisabledState();
		updateEqualHeights();

		/* =============================================================== *\
   			Events
		\* =============================================================== */
		swiper.on("slideChange", () => {
			updateNavigationVisibility();
			updateButtonDisabledState();
			updateEqualHeights();
		});

		swiper.on("resize", () => {
			updateNavigationVisibility();
			updateButtonDisabledState();
			updateEqualHeights();
		});

		nextBtn?.addEventListener("click", updateButtonDisabledState);
		prevBtn?.addEventListener("click", updateButtonDisabledState);
	});
});