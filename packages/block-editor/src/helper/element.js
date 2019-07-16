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
		margin: {
			horizontal: marginLeft + marginRight,
			vertical: marginTop + marginBottom,
			top: marginTop,
			left: marginLeft,
			right: marginRight,
			bottom: marginBottom
		},
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

export function querySelector(parent, selector)
{
	return parent.querySelector(selector);
}

export function querySelectorAll(parent, selector)
{
	return Array.from(parent.querySelectorAll(selector));
}
