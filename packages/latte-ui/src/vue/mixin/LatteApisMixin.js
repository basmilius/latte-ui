/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export default {

	methods: {

		latte()
		{
			return Latte;
		},

		dispatchAction(...args)
		{
			Latte.actions.dispatch(...args);
		}

	}

}
