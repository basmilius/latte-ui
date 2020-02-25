<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<transition name="snackbar">
		<div :class="classes" :style="styles" v-if="isOpen">
			<div class="snackbar-body">
				{{ options.message }}
			</div>

			<template v-if="options.action">
				<latte-ripple as="button" class="btn btn-text" :class="`btn-${options.action.color}`" @click="close(true)">
					<span>{{ options.action.label }}</span>
				</latte-ripple>
			</template>
		</div>
	</transition>

</template>

<script>

	import { locationToClass } from "../../../js/ui/snackbar-shared";
	import { raf } from "../../../js/util/dom";
	import { applyZ } from "../../../js/core/z";
	import { snackbarAnimationDuration } from "../../../js/options";

	export default {

		name: "SnackbarDialog",

		props: {
			options: {required: true, type: Object},
			resolve: {required: true, type: Function}
		},

		data()
		{
			return {
				isOpen: false,
				timer: 0,
				z: 0
			};
		},

		computed: {

			classes()
			{
				return ["snackbar", locationToClass(this.options.location)];
			},

			styles()
			{
				return {zIndex: this.z};
			}

		},

		methods: {

			close(byAction = false)
			{
				this.resolve(byAction);
				raf(() => this.$emit("delete-me"), snackbarAnimationDuration);

				if (this.timer !== 0)
					clearTimeout(this.timer);

				this.isOpen = false;
			},

			open()
			{
				applyZ(z => this.z = z);

				this.isOpen = true;

				if (this.options.duration > 0)
					this.timer = setTimeout(() => this.close(), this.options.duration);
			}

		}

	}

</script>
