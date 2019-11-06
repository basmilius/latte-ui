export function first(arr)
{
	return arr[0];
}

export function last(arr)
{
	return arr[arr.length - 1];
}

export function flatten(arr)
{
	let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);

	return depth ? Array.prototype.reduce.call(arr, function (acc, cur)
	{
		if (Array.isArray(cur))
			acc.push.apply(acc, flatten.call(cur, depth - 1));
		else
			acc.push(cur);

		return acc;
	}, []) : Array.prototype.slice.call(this);
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
