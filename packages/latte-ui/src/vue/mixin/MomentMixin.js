/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import moment from "moment";

export default {

	methods: {

		moment(...args)
		{
			return moment(...args);
		},

		momentDuration(...args)
		{
			return moment.duration(...args);
		},

		momentUtc(...args)
		{
			return moment.utc(...args);
		}

	}

}
