let currentZ = 2000;

export function needsZIndex(fn)
{
	fn(currentZ);
	currentZ++;
}
