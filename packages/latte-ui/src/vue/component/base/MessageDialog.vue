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

		<div class="panel" style="width: 540px">
			<div class="panel-header">
				<span class="panel-title">{{ title }}</span>
			</div>
			<div class="panel-body">
				<p v-html="message"></p>

				<label class="form-group" v-if="prompt">
					<input type="text" class="form-control" v-model="promptResult" @keydown.enter="onEnter" ref="input"/>
				</label>
			</div>
			<div class="panel-footer justify-content-end">
				<template v-for="(button, index) of buttons">

					<latte-ripple as="button" :key="index" :class="['btn', ...button.classes, (index === 0 ? 'ml-0' : 'ml-2')]" @click="close(button.id)">
						<Icon :name="button.icon" v-if="button.icon"/>
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

		name: "MessageDialog",

		props: {
			buttons: {default: () => [], required: true, type: Array},
			message: {default: "", required: true, type: String},
			prompt: {default: false, required: true, type: Boolean},
			resolve: {required: true, type: Function},
			title: {default: "", required: true, type: String}
		},

		data()
		{
			return {
				id: id(),
				isOpen: true,
				promptResult: ""
			};
		},

		mounted()
		{
			if (this.prompt)
				raf(() => this.$refs.input.focus());
		},

		methods: {

			close(buttonId)
			{
				this.resolve({
					button: buttonId,
					input: this.promptResult
				});

				this.isOpen = false;
				raf(() => this.$emit("delete-me", overlayAnimationDuration));
			},

			onEnter()
			{
				if (this.promptResult.trim() === "")
					return;

				this.close(this.buttons[this.buttons.length - 1].id);
			}

		}

	}

</script>
