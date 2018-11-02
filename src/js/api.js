"use strict";

export function id()
{
	const array = new Uint32Array(3);

	window.crypto.getRandomValues(array);

	return "latte-" + array.join("-");
}

export function request(url, options = {})
{
	let completeOptions = Object.assign({}, {credentials: "include"}, options);

	return fetch(url, completeOptions);
}

export default {

	id,

	request

}
