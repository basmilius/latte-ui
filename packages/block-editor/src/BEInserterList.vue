<template>

	<latte-popup class="be-inserter be-inserter-list" ref="popup" :animate-transform="false" :margin-x="-27" :margin-y="15">
		<nav class="nav nav-list" v-if="blocks.length > 0">

			<template v-for="(block, index) of blocks">

				<latte-ripple as="button" class="nav-link" :class="{'is-active': selectedIndex === index}" @mousedown="select(block.id)">
					<i class="mdi" :class="`mdi-${block.icon}`"></i>
					<span>{{ block.name }}</span>
				</latte-ripple>

			</template>

		</nav>
		<div class="p-3 text-center" v-else>

			<i>{{ "No blocks found matching your search term." | i18n("latte-ui") }}</i>

		</div>
	</latte-popup>

</template>

<script>

	export default {

		name: "BEInserterList",

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
							this.select(this.blocks[this.selectedIndex].id);
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

			select(id)
			{
				if (this.fn)
					this.fn(id);

				this.close();
			}

		}

	}

</script>
