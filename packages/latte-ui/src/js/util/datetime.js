/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { currentOptions } from "../core";

let dateFormatterOptions = {
	day: "numeric",
	month: "long",
	weekday: "long",
	year: "numeric"
};

/**
 * Formats a datetime.
 *
 * @param {Date} date
 * @param {Object} options
 *
 * @returns {String}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function formatDateTime(date, options = dateFormatterOptions)
{
	const f = new Intl.DateTimeFormat(currentOptions.locale, options);

	return f.format(date);
}

export default {
	formatDateTime
}
