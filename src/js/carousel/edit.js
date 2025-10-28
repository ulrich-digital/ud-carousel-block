import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	Button,
	TextControl,
	FormFileUpload,
} from "@wordpress/components";

import { trash } from "@wordpress/icons";

import { useState } from "@wordpress/element";
import { uploadMedia } from "@wordpress/media-utils";

async function fetchInlineSVG(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) return null;
		const text = await response.text();
		const match = text.match(/<svg[\s\S]*<\/svg>/i);
		return match ? match[0] : null;
	} catch (err) {
		console.error("SVG laden fehlgeschlagen:", err);
		return null;
	}
}

export default function Edit({ attributes, setAttributes }) {
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
	} = attributes;

	// Dynamische Klasse bauen
	const slideCountClass = slidesPerView
		? `ud-shows-${slidesPerView}-slides`
		: "";

	// Breakpoint hinzufügen
	const addBreakpoint = () => {
		setAttributes({
			breakpoints: [...breakpoints, {}],
		});
	};

	// Breakpoint ändern
	const updateBreakpoint = (index, key, value) => {
		const newBps = [...breakpoints];
		newBps[index][key] = value;
		setAttributes({ breakpoints: newBps });
	};

	// Breakpoint löschen
	const removeBreakpoint = (index) => {
		const newBps = [...breakpoints];
		newBps.splice(index, 1);
		setAttributes({ breakpoints: newBps });
	};

	const blockProps = useBlockProps({
		className: ["ud-carousel-block", slideCountClass]
			.filter(Boolean)
			.join(" "),
	});

	const HasImageControl = typeof ImageControl !== "undefined";

	// Pfeil: → zentraler onSelect: speichert SVG inline (wenn SVG) oder URL (Raster)
	const onSelectArrow = async (media) => {
		if (!media?.url) return;
		if (media.url.endsWith(".svg")) {
			const svgMarkup = await fetchInlineSVG(media.url);
			setAttributes({ customNextArrow: svgMarkup });
		} else {
			setAttributes({ customNextArrow: media.url });
		}
	};

	// Upload-Button: echte Datei-Uploads (ohne Mediathek-Modal)
	const handleUpload = (event) => {
		const files = event?.target?.files;
		if (!files?.length) return;

		uploadMedia({
			filesList: files,
			onFileChange: ([file]) => onSelectArrow(file),
			onError: (msg) => console.error("Upload fehlgeschlagen:", msg),
			allowedTypes: ["image"],
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Carousel Einstellungen", "carousel-block-ud")}
					initialOpen={true}
				>
					<RangeControl
						label={__("Slides pro View", "carousel-block-ud")}
						value={slidesPerView}
						onChange={(value) =>
							setAttributes({ slidesPerView: value })
						}
						min={1}
						max={6}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__(
							"Abstand zwischen Slides (px)",
							"carousel-block-ud"
						)}
						value={spaceBetween}
						onChange={(value) =>
							setAttributes({ spaceBetween: value })
						}
						min={0}
						max={100}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<RangeControl
						label={__("Animation Speed (ms)", "carousel-block-ud")}
						value={speed}
						onChange={(value) => setAttributes({ speed: value })}
						min={100}
						max={5000}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__("Loop aktivieren", "carousel-block-ud")}
						checked={loop}
						onChange={(value) => setAttributes({ loop: value })}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__("Navigation anzeigen", "carousel-block-ud")}
						checked={navigation}
						onChange={(value) =>
							setAttributes({ navigation: value })
						}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__("Pagination anzeigen", "carousel-block-ud")}
						checked={pagination}
						onChange={(value) =>
							setAttributes({ pagination: value })
						}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					<ToggleControl
						label={__("Autoplay aktivieren", "carousel-block-ud")}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
					{autoplay && (
						<RangeControl
							label={__(
								"Autoplay Speed (ms)",
								"carousel-block-ud"
							)}
							value={autoplaySpeed}
							onChange={(value) =>
								setAttributes({ autoplaySpeed: value })
							}
							min={1000}
							max={10000}
							__next40pxDefaultSize={true}
							__nextHasNoMarginBottom={true}
						/>
					)}
				</PanelBody>

				<PanelBody
					title={__("Breakpoints", "carousel-block-ud")}
					initialOpen={false}
				>
					{breakpoints.map((bp, index) => (
						<div
							key={index}
							style={{
								marginBottom: "1em",
								borderBottom: "1px solid #ddd",
								paddingBottom: "0.5em",
							}}
						>
							<TextControl
								label={__("Breite (px)", "carousel-block-ud")}
								type="number"
								value={bp.width}
								onChange={(value) =>
									updateBreakpoint(
										index,
										"width",
										parseInt(value)
									)
								}
								__next40pxDefaultSize={true}
								__nextHasNoMarginBottom={true}
							/>
							<RangeControl
								label={__(
									"Slides pro View",
									"carousel-block-ud"
								)}
								value={bp.slidesPerView}
								onChange={(value) =>
									updateBreakpoint(
										index,
										"slidesPerView",
										value
									)
								}
								min={1}
								max={6}
								__next40pxDefaultSize={true}
								__nextHasNoMarginBottom={true}
							/>
							<Button
								variant="destructive"
								size="small"
								onClick={() => removeBreakpoint(index)}
							>
								{__("Löschen", "carousel-block-ud")}
							</Button>
						</div>
					))}

					<Button variant="primary" onClick={addBreakpoint}>
						{__("Breakpoint hinzufügen", "carousel-block-ud")}
					</Button>
				</PanelBody>

				<PanelBody
					title={__("Navigations-Pfeile", "ud-plugin")}
					initialOpen={true}
				>
					{/* Wenn noch kein Pfeil gesetzt ist → Upload + Mediathek */}
					{!attributes.customNextArrow ? (
						<div className="ud-carousel-arrow-controls">
							<MediaUploadCheck>
								<MediaUpload
									title={__(
										"Pfeil auswählen oder hochladen",
										"ud-plugin"
									)}
									onSelect={async (media) => {
										if (!media?.url) return;
										if (media.url.endsWith(".svg")) {
											const svgMarkup =
												await fetchInlineSVG(media.url);
											setAttributes({
												customNextArrow: svgMarkup,
											});
										} else {
											setAttributes({
												customNextArrow: media.url,
											});
										}
									}}
									allowedTypes={["image"]}
									multiple={false}
									render={({ open }) => (
										<>
											<Button
												onClick={open}
												variant="primary"
												size="compact"
												className="ud-carousel-arrow-upload"
												__next40pxDefaultSize={true}
												__nextHasNoMarginBottom={true}
											>
												{__(
													"Hochladen / Mediathek",
													"ud-plugin"
												)}
											</Button>
											<p className="ud-help-text">
												{__(
													"Nur den rechten Pfeil hochladen – der linke wird automatisch gespiegelt.",
													"ud-plugin"
												)}
											</p>
										</>
									)}
								/>
							</MediaUploadCheck>
						</div>
					) : (
						// Wenn bereits ein Pfeil gewählt wurde → Ändern + Vorschau + Entfernen
						<div className="ud-carousel-arrow-existing">
							<div className="ud-carousel-arrow-preview">
								{String(attributes.customNextArrow)
									.trim()
									.startsWith("<svg") ? (
									<span
										className="ud-carousel-arrow-svg"
										dangerouslySetInnerHTML={{
											__html: attributes.customNextArrow,
										}}
									/>
								) : (
									<img
										src={attributes.customNextArrow}
										alt=""
										className="ud-carousel-arrow-image"
									/>
								)}
							</div>

							<div className="ud-carousel-arrow-actions">
								<MediaUploadCheck>
									<MediaUpload
										title={__("Pfeil ändern", "ud-plugin")}
										onSelect={async (media) => {
											if (!media?.url) return;
											if (media.url.endsWith(".svg")) {
												const svgMarkup =
													await fetchInlineSVG(
														media.url
													);
												setAttributes({
													customNextArrow: svgMarkup,
												});
											} else {
												setAttributes({
													customNextArrow: media.url,
												});
											}
										}}
										allowedTypes={["image"]}
										multiple={false}
										render={({ open }) => (
											<Button
												onClick={open}
												variant="secondary"
												size="small"
												className="ud-carousel-arrow-change"
												__next40pxDefaultSize={true}
												__nextHasNoMarginBottom={true}
											>
												{__("Ändern", "ud-plugin")}
											</Button>
										)}
									/>
								</MediaUploadCheck>

								<Button
									onClick={() =>
										setAttributes({ customNextArrow: null })
									}
									iconPosition="left"
									isDestructive={true}
									variant="secondary"
									size="small"
									__next40pxDefaultSize={true}
									__nextHasNoMarginBottom={true}
								>
									{__("Entfernen", "ud-plugin")}
								</Button>
							</div>
						</div>
					)}

					<TextControl
						label={__("Pfeil-Breite (px)", "ud-plugin")}
						type="number"
						value={attributes.arrowWidth}
						onChange={(value) =>
							setAttributes({
								arrowWidth: parseInt(value) || null,
							})
						}
						min={8}
						max={36}
						__next40pxDefaultSize={true}
						__nextHasNoMarginBottom={true}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={["ud/slide-block"]}
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
