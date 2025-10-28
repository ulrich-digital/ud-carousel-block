import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";



export default function Edit( {clientId} ) {
const blockProps = useBlockProps();

	// Anzahl Top-Level-Blocks im Slide zählen
	const childBlocks = useSelect(
		( select ) => select("core/block-editor").getBlockOrder(clientId),
		[ clientId ]
	);

	const hasChild = childBlocks.length > 0;

	return (
		<div {...blockProps} className="swiper-slide ud-slide-block">
			<InnerBlocks

renderAppender={
					!hasChild ? InnerBlocks.ButtonBlockAppender : false
				}
 />
		</div>
	);
}
