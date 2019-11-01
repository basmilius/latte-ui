<template>

	<latte-popup ref="popup" class="bg-inserter-quick" :animate-transform="false" :margin-x="-27" :margin-y="15">
		<nav class="nav nav-list" v-if="blocks.length > 0">

			<template v-for="(block, index) of blocks">

				<latte-ripple as="button" class="nav-link" :class="{'is-active': selectedIndex === index}" @mousedown="select(block)">
					<Icon :name="block.icon"/>
					<span>{{ block.name | beTranslate }}</span>
				</latte-ripple>

			</template>

		</nav>
		<div class="m-2" style="max-width: 240px" v-else>
			<Notice style="grid-column: span 3">
				<p>{{ "No blocks found matching your search term." | beTranslate }}</p>
			</Notice>
		</div>
	</latte-popup>

</template>

<script>

	import Icon from "../ui/Icon";
	import Notice from "../ui/Notice";

	export default {

		name: "InserterQuick",

		components: {Icon, Notice},

		data()
		{
			return {
				blocks: [],
				fn: undefined,
				selectedIndex: 0
			};
		},

		computed: {

			isOpen()
			{
				return this.popup.isOpen;
			},

			popup()
			{
				return this.$refs.popup;
			}

		},

		methods: {

			close()
			{
				if (!this.isOpen)
					return;

				this.popup.close();
			},

			handleKeyDown(evt)
			{
				switch (evt.key)
				{
					case "ArrowDown":
						this.selectedIndex = (this.selectedIndex + 1) % this.blocks.length;
						evt.preventDefault();
						break;

					case "ArrowUp":
						this.selectedIndex = this.selectedIndex === 0 ? this.blocks.length - 1 : this.selectedIndex - 1;
						evt.preventDefault();
						break;

					case "Enter":
					case "Tab":
						if (this.blocks.length > 0)
							this.select(this.blocks[this.selectedIndex]);
						evt.preventDefault();
						break;
				}
			},

			open(rect, blocks, fn)
			{
				this.blocks = blocks;
				this.fn = fn;
				this.selectedIndex = 0;
				this.popup.rect = rect;
				this.popup.open();
			},

			select(block)
			{
				if (this.fn)
					this.fn(block);

				this.close();
			}

		}

	}

</script>
