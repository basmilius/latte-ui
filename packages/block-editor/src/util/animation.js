import { getElementDimensionsAndOffset } from "./element";

import anime from "animejs";

export const easeSwiftOut = "cubicBezier(.55, 0, .1, 1)";

export function swapBlocks(options, fn)
{
	const {firstElement, scrollingContainer, secondElement} = options;
	const duration = 360;

	const firstDim = getElementDimensionsAndOffset(firstElement);
	const secondDim = getElementDimensionsAndOffset(secondElement);
	const scrollingDim = getElementDimensionsAndOffset(scrollingContainer);

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

	anime({targets: firstElement, translateY: firstY, duration, easing: easeSwiftOut, loop: false});
	anime({targets: secondElement, translateY: secondY, duration, easing: easeSwiftOut, loop: false});
	anime({targets: scrollingContainer, scrollTop: targetScrollTop, duration, easing: easeSwiftOut, loop: false}).finished.then(() =>
	{
		firstElement.style.removeProperty("transform");
		secondElement.style.removeProperty("transform");

		fn();
	});
}
