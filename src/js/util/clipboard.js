/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

export function copy(text)
{
	navigator.clipboard.writeText(text)
		.then(() => console.debug("[Clipboard] Text copied to clipboard!"))
		.catch(err => console.error(err));
}

export function paste()
{
	return navigator.clipboard.readText()
		.catch(err => console.error(err));
}

export default {

	copy,

	paste

}
