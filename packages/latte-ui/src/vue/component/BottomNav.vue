<template>

	<nav class="bottom-nav" @click="onClick">
		<slot></slot>
	</nav>

</template>

<script>

	import { closest } from "../../js/util/dom";

	export default {

		name: "latte-bottom-nav",

		props: {

			value: {
				default: 0,
				required: false,
				type: Number
			}

		},

		mounted()
		{
			this.deactivateItems();
			this.activateItem(this.$el.children[this.value]);
		},

		methods: {

			activateItem(item)
			{
				item.classList.add("is-active");
			},

			deactivateItems()
			{
				this.$el.querySelectorAll(".btn-action").forEach(item => item.classList.remove("is-active"));
			},

			onClick(evt)
			{
				const item = closest(evt.target, ".btn-action");

				this.deactivateItems();
				this.activateItem(item);

				this.$emit("input", Array.prototype.indexOf.call(this.$el.children, item));
			}

		},

		watch: {

			value()
			{
				this.deactivateItems();
				this.activateItem(this.$el.children[this.value]);
			}

		}

	}

</script>
