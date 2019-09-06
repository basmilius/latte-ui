import anime from "../lib/animejs";
import { getElementDimensions } from "./element";
import { getLatte } from "../utils";

export const easeSwiftOut = "cubicBezier(.55, 0, .1, 1)";

export function swapBlocks(options, fn)
{
	const {firstElement, scrollingContainer, secondElement} = options;
	const duration = 360;

	getLatte().util.dom.raf(() =>
	{
		const firstDim = getElementDimensions(firstElement);
		const secondDim = getElementDimensions(secondElement);
		const scrollingDim = getElementDimensions(scrollingContainer);

		let firstY;
		let secondY;

		if (firstDim.offset.top > secondDim.offset.top)
		{
			firstY = -secondDim.outer.height;
			secondY = firstDim.outer.height;
		}
		else
		{
			firstY = secondDim.outer.height;
			secondY = -firstDim.outer.height;
		}

		const targetScrollTop = Math.max(0, ((firstDim.offset.top - scrollingDim.offset.top) + scrollingContainer.scrollTop + firstY) + (firstDim.dimensions.height / 2) - (scrollingDim.dimensions.height / 2));

		anime({targets: firstElement, translateY: firstY, duration, easing: easeSwiftOut});
		anime({targets: secondElement, translateY: secondY, duration, easing: easeSwiftOut});
		anime({targets: scrollingContainer, scrollTop: targetScrollTop, duration, easing: easeSwiftOut}).finished.then(() =>
		{
			firstElement.style.removeProperty("transform");
			secondElement.style.removeProperty("transform");

			fn();
		});
	});
}
