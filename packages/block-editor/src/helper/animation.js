import anime from "../lib/animejs";
import { getElementDimensions } from "./element";

export function swapElements(options, fn)
{
	const {firstElement, scrollingContainer, secondElement, raf} = options;
	const hasWebAnimationsAPI = !!firstElement.animate;

	if (!hasWebAnimationsAPI)
		return fn();

	const duration = 360;
	const easing = "cubicBezier(.55, 0, .1, 1)";

	raf(() =>
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

		anime({targets: firstElement, translateY: firstY, duration, easing});
		anime({targets: secondElement, translateY: secondY, duration, easing});
		anime({targets: scrollingContainer, scrollTop: targetScrollTop, duration, easing}).finished.then(() =>
		{
			firstElement.style.removeProperty("transform");
			secondElement.style.removeProperty("transform");

			fn();
		});
	});
}
