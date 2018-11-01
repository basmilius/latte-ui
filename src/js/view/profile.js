/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { forObject } from "../i18n.js";
import { request } from "../util/api.js";
import { handleError } from "../sdk.js";
import { timeout } from "../util/core.js";

/**
 * Creates the latte-view-user-profile view.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createView()
{

	const USER_CACHE = {};

	Vue.component("latte-profile-popover", {

		template: `	<div ref="dropdown" :class="dropdownClasses" class="panel" :style="dropdownStyle" v-click-away="closeByClickAway">
						<div class="dropdown-content profile-popover" v-if="!isLoading">

							<div class="panel-header">
								<img :src="user.photo.thumb_128" :alt="user.name" class="avatar mr-3" style="font-size: 36px"/>
								<span class="panel-title">{{ user.name }}</span>
							</div>

							<nav class="nav latte-nav-list">
								<a href="#" class="nav-link"><i class="mdi mdi-phone"></i><span>Call {{ user.firstname }}</span></a>
								<a href="#" class="nav-link"><i class="mdi mdi-email"></i><span>Email {{ user.firstname }}</span></a>
								<a href="#" class="nav-link"><i class="mdi mdi-account-card-details"></i><span>View profile</span></a>
							</nav>

						</div>
						<div class="dropdown-content px-5 py-3" v-else>
							<span class="spinner spinner-primary"></span>
						</div>
					</div>`,

		data()
		{
			return {
				associatedElement: null,
				associatedElementPosition: {x: 0, y: 0},
				dropdownPosition: {x: 0, y: 0},
				isCloseByClickAwayAvailable: false,
				isLoading: true,
				isOpen: false,
				user: null
			};
		},

		mounted()
		{
			Latte.actions.on("latte:profile:popover:open", ({userId}, el) => this.open(el, parseInt(userId)));

			// setTimeout(() => Latte.actions.dispatch("latte:profile:popover:open", {userId: 1}, document.querySelectorAll(`[data-user-id="1"]`)[0]), 500);
		},

		computed: {

			dropdownClasses()
			{
				let aboveUnder = this.associatedElementPosition.y > (window.innerHeight / 2) ? "above" : "under";
				let position = this.associatedElementPosition.x > (window.innerWidth / 2) ? "right" : "left";
				let classes = ["dropdown", "dropdown-at-root", `dropdown-${position}-${aboveUnder}`];

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			dropdownStyle()
			{
				return {
					transform: `translate3d(${this.dropdownPosition.x}px, ${this.dropdownPosition.y}px, 0)`,
					width: "240px"
				};
			},

			dropdown()
			{
				return this.$refs.dropdown;
			},

			profileUrl()
			{
				if (this.user === null)
					return "#";

				return `/admin/user/${this.user.id}`;
			}

		},

		methods: {

			calculatePosition()
			{
				const associatedElementRect = this.associatedElement.getBoundingClientRect();
				const dropdownElementRect = this.dropdown.getBoundingClientRect();
				const px = this.associatedElementPosition.x > (window.innerWidth / 2) ? "right" : "left";
				const py = this.associatedElementPosition.y > (window.innerHeight / 2) ? "above" : "under";

				let x = associatedElementRect.left - (associatedElementRect.width / 2);
				let y = associatedElementRect.top + associatedElementRect.height;

				if (px === "right")
					x = (associatedElementRect.left + associatedElementRect.width) - (dropdownElementRect.width - (associatedElementRect.width / 2));

				if (py === "above")
					y = associatedElementRect.top - dropdownElementRect.height;

				const margin = {
					x: 6,
					y: 8 + (this.isOpen ? 0 : 24)
				};

				this.dropdownPosition.x = Math.round(x + (px === "left" ? -margin.x : margin.x));
				this.dropdownPosition.y = Math.round(y + (py === "under" ? margin.y : -margin.y));
			},

			close()
			{
				this.isCloseByClickAwayAvailable = false;
				this.isOpen = false;

				this.calculatePosition();
			},

			closeByClickAway()
			{
				if (!this.isCloseByClickAwayAvailable)
					return;

				this.close();
			},

			open(el, userId)
			{
				const {x, y, width, height} = el.getBoundingClientRect();

				this.associatedElement = el;
				this.associatedElementPosition = {x: x + width / 2, y: y + height / 2};
				this.isCloseByClickAwayAvailable = false;
				this.isLoading = true;
				this.isOpen = true;

				timeout(300, () => this.isCloseByClickAwayAvailable = true);
				this.calculatePosition();

				if (userId in USER_CACHE)
				{
					this.onReceivedUser({data: USER_CACHE[userId]});
				}
				else
				{
					request(`/api/users/${userId}`)
						.then(r => r.json())
						.then(r => this.onReceivedUser(r))
						.catch(err => handleError(err));
				}
			},

			onReceivedUser(response)
			{
				this.isLoading = false;

				if (response.data && response.data.id)
				{
					USER_CACHE[response.data.id] = this.user = response.data;
					this.$nextTick(() => this.calculatePosition());
				}
				else
				{
					this.close();
				}
			}

		},

		watch: {}

	});

}
