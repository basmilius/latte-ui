let currentZ = 2000;

/**
 * Generates a z-value to be used with z-index.
 *
 * @param {Function} fn
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function needsZIndex(fn)
{
	fn(currentZ);
	currentZ++;
}
