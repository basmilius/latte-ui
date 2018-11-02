"use strict";

export function spaceship(a, b)
{
	if ((a === null || b === null) || typeof a !== typeof b)
		return null;

	if (typeof a === "string")
		return a.localeCompare(b);

	if (a > b)
		return 1;
	else if (a < b)
		return -1;

	return 0;
}

export default {

	spaceship

}
