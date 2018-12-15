/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

export function isJson(str)
{
	try
	{
		JSON.parse(str);

		return true;
	}
	catch(err)
	{
		return false;
	}
}

export default {

	isJson

}
