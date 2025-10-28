import { registerBlockType } from "@wordpress/blocks";

// Carousel-Block
import editCarousel from "./carousel/edit";
import saveCarousel from "./carousel/save";

// Slide-Block
import editSlide from "./slide/edit";
import saveSlide from "./slide/save";

// eigenes Icon für Carousel
const carouselIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		role="img"
		aria-hidden="true"
		focusable="false"
		fill="currentColor" // passt sich automatisch an WP-Editor-Farben an
	>
		<path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z" />
		<path d="M0 0h24v24H0z" fill="none" />
	</svg>
);

const slideIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		role="img"
		aria-hidden="true"
		focusable="false"
		fill="currentColor" // passt sich automatisch an WP-Editor-Farben an
	>
		<path d="M0 0h24v24H0z" fill="none"></path>
		<path d="m18 6v11h4v-11h-4z"></path>
		<path d="m2 17h4v-11h-4v11z"></path>
		<path d="m7.0059 4v15.004h9.9902v-15.004h-9.9902zm1.3574 1.3555h7.2773v12.291h-7.2773v-12.291z"></path>
	</svg>
);

/**
 * Registrierung des Carousel-Blocks
 * (Parent-Block)
 */
registerBlockType("ud/carousel-block", {
	icon: carouselIcon, // <- hier dein Custom-SVG
	edit: editCarousel,
	save: saveCarousel,
});

/**
 * Registrierung des Slide-Blocks
 * (Child-Block)
 */
registerBlockType("ud/slide-block", {
	icon: slideIcon, // <- hier dein Custom-SVG
	edit: editSlide,
	save: saveSlide,
});
