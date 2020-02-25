<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<Overlay :is-dismissible="false" :name="id" :opened="isOpen">

		<div class="panel" :style="{width: options.width}">
			<div class="panel-header justify-content-center py-4">
				<Icon :name="icon" class="text-primary" style="font-size: 36px"/>
			</div>
			<div class="panel-body border-0 py-0 text-center" v-html="message"></div>
			<div class="panel-body d-flex flex-column border-0 py-3">
				<template v-for="(button, index) of buttons">

					<latte-ripple as="button" class="btn btn-text btn-primary is-fluid is-large" :key="index" @click="close(button.id)">
						<span>{{ button.label }}</span>
					</latte-ripple>

				</template>
			</div>
		</div>

	</Overlay>

</template>

<script>

	import { Icon, Overlay } from "../index";
	import { id } from "../../../js/core/api";
	import { raf } from "../../../js/util/dom";
	import { overlayAnimationDuration } from "../../../js/options";

	export default {

		components: {Icon, Overlay},

		name: "QuestionDialog",

		props: {
			buttons: {default: () => [], required: true, type: Array},
			icon: {default: "home-outline", type: String},
			message: {default: "", required: true, type: String},
			options: {default: () => ({}), required: true, type: Object},
			resolve: {required: true, type: Function}
		},

		data()
		{
			return {
				id: id(),
				isOpen: true
			};
		},

		methods: {

			close(buttonId)
			{
				this.resolve(buttonId);

				this.isOpen = false;
				raf(() => this.$emit("delete-me"), overlayAnimationDuration);
			}

		}

	}

</script>
