import { InnerBlocks } from "@wordpress/block-editor";

export default function save() {
	return (
		<div className="swiper-slide ud-slide-block">
			<InnerBlocks.Content />
		</div>
	);
}
