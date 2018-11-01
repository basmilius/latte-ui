/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Writes text to the Clipboard.
 *
 * @param {String} text
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function copy(text)
{
	navigator.clipboard.writeText(text)
		.then(() => console.debug("[Clipboard] Text copied to clipboard!"))
		.catch(err => console.error(err));
}

/**
 * Reads text from the CLipboard.
 *
 * @returns {Promise<String>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function paste()
{
	return navigator.clipboard.readText()
		.catch(err => console.error(err));
}
