<script>

	import { BlockEntry } from "./api";
	import { getLatte } from "./utils";

	import BEInserterExpanded from "./BEInserterExpanded";
	import BEBlockMount from "./BEBlockMount";

	const L = getLatte();

	export default {

		name: "BEBlocks",

		props: {
			entry: {required: true, type: BlockEntry}
		},

		data()
		{
			return {
				blocks: this.entry.children || []
			};
		},

		render(h)
		{
			return h(
				"div",
				{class: "be-blocks"},
				this.blocks && this.blocks.length > 0 ? this.renderBlocks(h) : this.renderEmptyInserter(h)
			);
		},

		methods: {

			renderBlocks(h)
			{
				return this.blocks.map(entry => h(BEBlockMount, {
					key: entry.hash,
					props: {entry}
				}));
			},

			renderEmptyInserter(h)
			{
				return [
					h(BEInserterExpanded, {
						on: {
							select: id =>
							{
								this.entry.insertBlock(id, undefined, {}, {}, this.entry);
								this.$forceUpdate();
							}
						}
					})
				];
			},

			updateBlocks()
			{
				this.blocks = this.entry.children || [];
			}

		}

	}

</script>
