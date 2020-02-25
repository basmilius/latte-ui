/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export const Locations = {
	BOTTOM: 1,
	BOTTOM_LEFT: 2,
	BOTTOM_RIGHT: 4,
	TOP: 8,
	TOP_LEFT: 16,
	TOP_RIGHT: 32
};

export function locationToClass(location)
{
	switch (location)
	{
		case Locations.BOTTOM:
			return "snackbar-bottom";

		case Locations.BOTTOM_LEFT:
			return "snackbar-bottom-left";

		case Locations.BOTTOM_RIGHT:
			return "snackbar-bottom-right";

		case Locations.TOP:
			return "snackbar-top";

		case Locations.TOP_LEFT:
			return "snackbar-top-left";

		case Locations.TOP_RIGHT:
			return "snackbar-top-right";

		default:
			return "snackbar-no-location";
	}
}
