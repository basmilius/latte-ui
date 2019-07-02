export function replaceIndex(arr, index, obj)
{
	arr.splice(index, 1, obj);

	return arr;
}
