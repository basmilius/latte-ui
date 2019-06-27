/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Returns TRUE if str is valid json.
 *
 * @param {String} str
 *
 * @returns {Boolean}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function isJson(str)
{
	try
	{
		JSON.parse(str);

		return true;
	}
	catch (err)
	{
		return false;
	}
}

export default {
	isJson
}
