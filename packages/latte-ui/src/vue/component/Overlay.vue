<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<transition name="overlay">
		<div role="dialog" :class="overlayClasses" :style="overlayStyles" v-if="isOpen" v-mtm>
			<slot></slot>
		</div>
	</transition>

</template>

<script>

	import { dispatch } from "../../js/core/action";
	import { register, remove } from "../../js/ui/overlay";
	import { applyZ } from "../../js/core/z";
	import { popupClosed, popupOpened } from "../../js/core/popup";
	import { MoveToMainDirective } from "../directive";

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
				z: 0
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
				const classes = ["overlay"];

				if (this.responsive)
					classes.push("is-responsive");

				return classes;
			},

			overlayStyles()
			{
				return {
					zIndex: this.z
				};
			}

		},

		methods: {

			close()
			{
				if (!this.isOpen)
					return;

				popupClosed();

				this.isOpen = false;

				dispatch("latte:overlay", {overlay: this, open: false});
				this.$emit("close", this);
			},

			open()
			{
				if (this.isOpen)
					return;

				popupOpened();

				applyZ(z => this.z = z);
				this.isOpen = true;

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
