<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	export default {

		name: "RTEBasicFormattingPlugin",

		mounted()
		{
			this.$parent.addToolbarAction("basic-bold", "format-bold", "Bold", 0, {groupId: "basic"});
			this.$parent.addToolbarAction("basic-italic", "format-italic", "Italic", 0, {groupId: "basic"});
			this.$parent.addToolbarAction("basic-underline", "format-underline", "Underline", 0, {groupId: "basic"});

			this.$parent.$on("selection-changed", selection => this.onSelectionChanged(selection));
			this.$parent.$on("toolbar-action:basic-bold", () => this.$parent.executeCommand("bold"));
			this.$parent.$on("toolbar-action:basic-italic", () => this.$parent.executeCommand("italic"));
			this.$parent.$on("toolbar-action:basic-underline", () => this.$parent.executeCommand("underline"));

			this.$parent.registerCommand("bold", () => document.execCommand("bold"));
			this.$parent.registerCommand("italic", () => document.execCommand("italic"));
			this.$parent.registerCommand("underline", () => document.execCommand("underline"));
		},

		methods: {

			onSelectionChanged(selection)
			{
				let node = selection.anchorNode;

				if (!(node instanceof HTMLElement))
					node = node.parentElement;

				this.$parent.getToolbarAction("basic-bold").isActive = node.style.fontWeight === "bold";
				this.$parent.getToolbarAction("basic-italic").isActive = node.style.fontStyle === "italic";
				this.$parent.getToolbarAction("basic-underline").isActive = node.style.textDecorationLine === "underline";
				this.$parent.$forceUpdate();
			}

		}

	}

</script>
