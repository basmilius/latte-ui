/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Adds text to the clipboard.
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
 * Gets text from the clipboard.
 *
 * @returns {Promise<*>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function paste()
{
	return navigator.clipboard.readText()
		.catch(err => console.error(err));
}

export default {
	copy,
	paste
}
