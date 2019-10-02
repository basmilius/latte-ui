<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="overlay" role="dialog" :class="overlayClasses" v-if="isVisible" v-mtm>
		<slot></slot>
	</div>

</template>

<script>

	import { dispatch } from "../../js/core/action";
	import { register, remove } from "../../js/ui/overlay";
	import { applyZ } from "../../js/core/z";
	import { raf } from "../../js/util/dom";
	import { popupClosed, popupOpened } from "../../js/core/popup";
	import { MoveToMainDirective } from "../directive/move-to-main";

	export default {

		name: "latte-overlay",

		directives: {
			mtm: MoveToMainDirective
		},

		props: {
			name: {default: "", required: true, type: String},
			opened: {default: false, type: Boolean},
			responsive: {default: true, type: Boolean}
		},

		data()
		{
			return {
				isOpen: false,
				isVisible: false
			};
		},

		destroyed()
		{
			if (this.isOpen)
				popupClosed();

			remove(this.name);
		},

		mounted()
		{
			register(this.name, this);

			if (this.opened)
				this.open(this.name);
		},

		computed: {

			overlayClasses()
			{
				const classes = [];

				if (this.isOpen)
					classes.push("is-open");

				if (this.responsive)
					classes.push("is-responsive");

				if (this.isVisible)
					classes.push("is-visible");

				return classes;
			}

		},

		methods: {

			close()
			{
				if (!this.isVisible)
					return;

				popupClosed();

				raf(() => this.isOpen = false);
				raf(() => this.isVisible = false, 270);

				dispatch("latte:overlay", {overlay: this, open: false});
				this.$emit("close", this);
			},

			open()
			{
				if (this.isVisible)
					return;

				popupOpened();

				raf(() =>
				{
					this.isVisible = true;

					raf(() =>
					{
						applyZ(z => this.$el.style.setProperty("z-index", z));
						this.isOpen = true;
					});
				});

				dispatch("latte:overlay", {overlay: this, open: true});
				this.$emit("open", this);
			}

		},

		watch: {

			name(n, o)
			{
				remove(o);
				register(n, this);
			},

			opened()
			{
				if (this.opened)
					this.open();
				else
					this.close();
			}

		}

	}

</script>
