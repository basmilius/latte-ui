/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { rootElement } from "../ui/root.js";
import { timeout } from "../util/core.js";
import { dispatch } from "../actions.js";

/**
 * Creates our latte-button-dropdown component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{
	Vue.component("latte-button-dropdown", {

		props: {

			appendToRoot: {
				default: true,
				type: Boolean
			},

			ariaLabel: {
				default: "",
				type: String
			},

			buttonClass: {
				default: "btn-icon btn-dark",
				required: false,
				type: String
			},

			icon: {
				default: "",
				required: false,
				type: String
			},

			iconAfter: {
				default: "",
				required: false,
				type: String
			},

			iconBefore: {
				default: "",
				required: false,
				type: String
			},

			isLoading: {
				default: false,
				required: false,
				type: Boolean
			},

			label: {
				default: "",
				required: false,
				type: String
			},

			openAtStart: {
				default: false,
				required: false,
				type: Boolean
			},

			small: {
				default: false,
				required: false,
				type: Boolean
			},

			type: {
				default: 'list',
				type: String,
				validator: value => ["grid", "list", "custom"].indexOf(value) > -1
			}

		},

		template: `	<button class="btn" :class="buttonClasses" :data-tooltip="ariaLabel" data-tooltip-class="tooltip-bottom tooltip-contain" :aria-label="ariaLabel" @pointerup.passive="toggle($event)" v-click-away="closeByClickAway">
						<img v-if="icon.substr(0, 6) === 'avatar'" class="avatar avatar-in-button" :src="icon.substr(7)" :alt="ariaLabel" />
						<i v-if="icon !== ''" :class="iconClasses"></i>
						<i v-if="iconBefore !== ''" :class="iconBeforeClasses"></i>
						<span v-if="label !== ''">{{ label }}</span>
						<i v-if="iconAfter !== ''" :class="iconAfterClasses"></i>

						<div :class="dropdownClasses">
							<div class="dropdown-content">
								<slot></slot>
							</div>
						</div>
					</button>`,

		/**
		 * Provides the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				isClickAwayAvailable: true,
				isOpen: this.openAtStart,
				popup: null,
				popupPosition: {
					x: 0,
					y: 0
				},
				x: 0,
				y: 0
			}
		},

		/**
		 * Invoked before our Vue Component is destroyed.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		beforeDestroy()
		{
			if (!this.popup)
				return;

			// Component is removed from DOM for some reason, kill the popup instance :)!
			this.popup.remove();
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			let rect = this.$el.getBoundingClientRect();
			this.x = rect.left;
			this.y = rect.top;

			document.addEventListener("latte:context-menu", () => this.close());
			document.addEventListener("latte:overlay", () => this.close());

			if (this.appendToRoot)
			{
				timeout(10, () =>
				{
					this.popup = this.$el.querySelector(":scope > div.dropdown");
					this.$el.removeChild(this.popup);
					rootElement.appendChild(this.popup);

					window.addEventListener("resize", () => this.shouldUpdate(), {passive: true});
					window.addEventListener("scroll", () => this.shouldUpdate(), {passive: true});

					this.calculatePosition();
				})
			}
		},

		computed: {

			/**
			 * Computes the button classes.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			buttonClasses()
			{
				const classes = this.buttonClass.split(" ");

				if (this.small)
					classes.push("btn-sm");

				if (this.isOpen)
					classes.push("is-open", "tooltip-disabled");

				return classes;
			},

			/**
			 * Computes the dropdown classes.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			dropdownClasses()
			{
				let classes = ['dropdown'];

				if (this.appendToRoot)
					classes.push("dropdown-at-root");

				let aboveUnder = this.y > (window.innerHeight / 2) ? 'above' : 'under';
				let position = this.x > (window.innerWidth / 2) ? 'right' : 'left';

				classes.push(`dropdown-${position}-${aboveUnder}`);
				classes.push(`dropdown-${this.type}`);

				if (this.isOpen === true)
					classes.push("is-open");

				return classes;
			},

			/**
			 * Computes the icon classes.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			iconClasses()
			{
				return ['mdi', `mdi-${this.icon}`];
			},

			/**
			 * Computes the icon classes for icon after.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			iconAfterClasses()
			{
				return ['mdi', `mdi-${this.iconAfter}`];
			},

			/**
			 * Computes the icon classes for icon before.
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			iconBeforeClasses()
			{
				return ['mdi', `mdi-${this.iconBefore}`];
			}

		},

		methods: {

			/**
			 * Calculates the new position of the dropdown.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			calculatePosition()
			{
				if (!this.appendToRoot)
					return;

				if (this.popup === null)
					return;

				const margin = this.buttonClasses.contains("btn-icon") ? this.small ? 22 : 18 : 13;
				const bcr = this.$el.getBoundingClientRect();
				const pcr = this.popup.getBoundingClientRect();
				const px = this.x > (window.innerWidth / 2) ? "right" : "left";
				const py = this.y > (window.innerHeight / 2) ? "above" : "under";

				let x = bcr.left - margin;
				let y = bcr.top + bcr.height;

				if (px === "right")
					x = (bcr.left + bcr.width) - (pcr.width - margin);

				if (py === "above")
					y = bcr.top - (pcr.height);

				this.popupPosition.x = Math.round(x);
				this.popupPosition.y = Math.round(y + (this.isOpen ? 0 : py === "above" ? -24 : 24));
			},

			/**
			 * Updates calculations.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			shouldUpdate()
			{
				if (!this.appendToRoot)
					return;

				let rect = this.$el.getBoundingClientRect();
				this.x = rect.left;
				this.y = rect.top;

				this.calculatePosition();
			},

			/**
			 * Closes the dropdown.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			close()
			{
				this.isClickAwayAvailable = false;
				this.isOpen = false;

				this.$emit("close");
				this.calculatePosition();

				dispatch("latte:tooltip:hide");
			},

			/**
			 * Closes the dropdown by click-away directive.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			closeByClickAway()
			{
				if (this.isClickAwayAvailable === false)
					return;

				this.close();
			},

			/**
			 * Opens the dropdown.
			 *
			 * @param {MouseEvent} e
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			open(e)
			{
				this.isOpen = true;
				this.$nextTick(() => this.isClickAwayAvailable = true);

				if (e)
				{
					this.x = e.clientX;
					this.y = e.clientY;
				}

				this.$emit("open");
				this.calculatePosition();

				dispatch("latte:tooltip:hide");
			},

			/**
			 * Toggles the dropdown.
			 *
			 * @param {MouseEvent} e
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggle(e)
			{
				if (this.isOpen)
					this.close();
				else
					this.open(e);
			}

		},

		watch: {

			/**
			 * Invoked when dropdownClasses have changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			dropdownClasses()
			{
				if (this.popup === null)
					return;

				const classes = [];
				this.popup.classList.forEach(className => classes.push(className));
				this.popup.classList.remove(...classes);
				this.popup.classList.add(...this.dropdownClasses);
			},

			/**
			 * Invoked when popupPosition is changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			popupPosition: {

				deep: true,

				handler()
				{
					this.popup.style.transform = `translate3d(${this.popupPosition.x}px, ${this.popupPosition.y}px, 0)`;
				}

			}


		}

	});
}
