import { includes } from "./array";

export function getElementDimensions(elm)
{
	const {height, width, top, left} = elm.getBoundingClientRect();
	let {marginTop, marginLeft, marginRight, marginBottom} = window.getComputedStyle(elm);

	marginTop = parseInt(marginTop);
	marginLeft = parseInt(marginLeft);
	marginRight = parseInt(marginRight);
	marginBottom = parseInt(marginBottom);

	return {
		offset: {top, left},
		dimensions: {height, width},
		outer: {
			height: height + marginTop + marginBottom,
			width: width + marginLeft + marginRight
		}
	};
}

export function isInputOrTextarea(elm)
{
	return includes(["INPUT", "TEXTAREA"], elm.tagName)
}
