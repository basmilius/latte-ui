export function first(arr)
{
	return arr[0];
}

export function last(arr)
{
	return arr[arr.length - 1];
}

export function includes(haystack, needle)
{
	return haystack.indexOf(needle) > -1;
}

export function entriesAreDifferent(base, other)
{
	for (let k in other)
		if (other[k] !== base[k])
			return true;

	return false;
}

export function range(from, to, fn = undefined)
{
	return Array(to - from)
		.fill(undefined)
		.map((_, index) => index + from)
		.map(fn);
}
