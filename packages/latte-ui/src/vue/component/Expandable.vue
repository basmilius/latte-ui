<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="expandable">

		<div class="expandable-header" @click="toggle">
			<slot name="header" v-bind="{isOpen}">
				<button class="btn btn-icon btn-text">
					<Icon name="menu-swap"/>
				</button>
			</slot>
		</div>

		<transition name="expandable">

			<div class="expandable-body" :style="{height}" v-if="isOpen">
				<slot></slot>
			</div>

		</transition>

	</div>

</template>

<script>

	import { dispatch, on } from "../../js/core/action";
	import { raf } from "../../js/util/dom";

	import Icon from "./Icon.vue";

	export default {

		components: {Icon},

		name: "latte-expandable",

		props: {
			closeWhenOpen: {default: true, type: Boolean},
			group: {default: null, type: String | null},
			opened: {default: false, type: Boolean}
		},

		created()
		{
			this.subscriptions.push(
				on("latte:expandable:open", expandable => this.onExpandableOpened(expandable))
			);
		},

		data()
		{
			return {
				height: "0",
				isOpen: false,
				subscriptions: []
			};
		},

		destroyed()
		{
			this.subscriptions.forEach(sub => sub.unsubscribe());
		},

		methods: {

			updateBody()
			{
				if (this.isOpen)
				{
					this.height = "auto";

					raf(() =>
					{
						const rect = this.$el.querySelector("div.expandable-body").getBoundingClientRect();
						const height = rect.height;

						this.height = "0";

						raf(() => this.height = height + "px");
					});
				}
				else
				{
					raf(() => this.height = "0");
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
				if (!this.closeWhenOpen && this.isOpen)
					return;

				if (this.isOpen)
					this.close();
				else
					this.open();
			},

			onExpandableOpened(expandable)
			{
				if (this === expandable)
					return;

				if (this.group !== expandable.group)
					return;

				this.close();
			},

			onOpenChanged()
			{
				if (this.isOpen && this.group !== null)
					dispatch("latte:expandable:open", this);

				this.$emit(this.isOpen ? "open" : "close");
				this.updateBody();
			},

			onOpenedChanged()
			{
				raf(() =>
				{
					if (this.opened)
						this.open();
					else
						this.close();
				});
			}

		},

		watch: {

			isOpen: {
				immediate: true,
				handler: "onOpenChanged"
			},

			opened: {
				immediate: true,
				handler: "onOpenedChanged"
			}

		}

	}

</script>
