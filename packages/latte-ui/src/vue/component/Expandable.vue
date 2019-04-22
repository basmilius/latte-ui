<template>

	<div class="expandable">

		<div class="expandable-header" @click="toggle">
			<slot name="header" v-bind:isOpen="isOpen">
				<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-menu-swap"></i></button>
			</slot>
		</div>

		<div class="expandable-body" :style="bodyStyle">
			<slot></slot>
		</div>

	</div>

</template>

<script>

	import { dispatch, on } from "../../js/core/action";
	import { raf } from "../../js/util/dom";

	export default {

		name: "latte-expandable",

		props: {

			group: {
				default: null,
				required: false,
				type: String | null
			},

			opened: {
				default: false,
				required: false,
				type: Boolean
			}

		},

		created()
		{
			on("latte:expandable:open", expandable => this.onExpandableOpened(expandable));
		},

		data()
		{
			return {
				bodyStyle: {
					height: "0",
					overflow: "hidden",
					transition: "height 210ms var(--ease-swift-out)"
				},
				isOpen: false
			};
		},

		mounted()
		{
			if (this.opened)
				this.open();
		},

		methods: {

			onExpandableOpened(expandable)
			{
				if (this === expandable)
					return;

				if (this.group !== expandable.group)
					return;

				raf(() => this.close());
			},

			updateBody()
			{
				if (this.isOpen)
				{
					this.bodyStyle.height = "auto";

					raf(() =>
					{
						const rect = this.$el.querySelector("div.expandable-body").getBoundingClientRect();
						const height = rect.height;

						this.bodyStyle.height = "0";

						raf(() => this.bodyStyle.height = height + "px");
					});
				}
				else
				{
					this.bodyStyle.height = "0";
				}
			},

			close()
			{
				this.isOpen = false;
			},

			open()
			{
				this.isOpen = true;
			},

			toggle()
			{
				if (this.isOpen)
					this.close();
				else
					this.open();
			}

		},

		watch: {

			isOpen()
			{
				if (this.isOpen)
					dispatch("latte:expandable:open", this);

				this.$emit(this.isOpen ? "open" : "close");
				this.updateBody();
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
