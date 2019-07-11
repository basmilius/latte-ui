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
