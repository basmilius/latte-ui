/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Creates the latte-moment component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{
	Vue.component("latte-moment", {

		props: {

			format: {
				default: "d MMMM YYYY",
				required: false,
				type: String
			},

			unixTimestamp: {
				default: () => Date.now(),
				required: false,
				type: Number
			}

		},

		template: `<span class="latte-moment">{{ formatted_moment }}</span>`,

		computed: {

			/**
			 * Returns the formatted moment.
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			formatted_moment()
			{
				return moment(this.unixTimestamp).format(this.format);
			}

		}

	});
}
