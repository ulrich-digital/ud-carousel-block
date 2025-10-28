import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		slidesPerView,
		spaceBetween,
		loop,
		navigation,
		pagination,
		autoplay,
		autoplaySpeed,
		speed,
		breakpoints = [],
		customNextArrow,
		arrowWidth,
	} = attributes;

	const blockProps = useBlockProps.save({
		className: "ud-carousel-block",
		style: {
			"--ud-carousel-arrow-width": arrowWidth
				? `${arrowWidth}px`
				: "24px", // Fallback → global verfügbar im ganzen Block
		},
		"data-slides-per-view": slidesPerView,
		"data-space-between": spaceBetween,
		"data-loop": loop,
		"data-navigation": navigation,
		"data-pagination": pagination,
		"data-autoplay": autoplay,
		"data-autoplay-speed": autoplaySpeed,
		"data-speed": speed,
		"data-breakpoints": JSON.stringify(breakpoints),
	});

	const prevClasses = [
		"ud-button-prev",
		"swiper-button-prev",
		customNextArrow ? "has-custom-arrow" : null,
	].filter(Boolean).join(" ");

	const nextClasses = [
		"ud-button-next",
		"swiper-button-next",
		customNextArrow ? "has-custom-arrow" : null,
	].filter(Boolean).join(" ");

	const renderArrow = () => {
		if (!customNextArrow) return null;

		// Inline-SVG
		if (customNextArrow.startsWith("<svg")) {
			return (
				<div
					dangerouslySetInnerHTML={{
						__html: arrowWidth
							? customNextArrow.replace(
									/<svg([^>]*)>/i,
									`<svg$1 width="${arrowWidth}px">`
							  )
							: customNextArrow,
					}}
				/>
			);
		}

		// Fallback IMG
		return (
			<img
				src={customNextArrow}
				alt="Arrow"
				style={arrowWidth ? { width: arrowWidth + "px" } : {}}
			/>
		);
	};

	return (
		<div {...blockProps}>
			<div className="swiper">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
			</div>

			{pagination && <div className="ud-pagination swiper-pagination"></div>}

			{navigation && (
				<>
					{/* Prev */}
					<div className={prevClasses}>{renderArrow()}</div>

					{/* Next */}
					<div className={nextClasses}>{renderArrow()}</div>
				</>
			)}
		</div>
	);
}
