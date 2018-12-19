<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
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

			this.$parent.$on("toolbar-action:basic-bold", () => this.onBoldClick());
			this.$parent.$on("toolbar-action:basic-italic", () => this.onItalicClick());
			this.$parent.$on("toolbar-action:basic-underline", () => this.onUnderlineClick());

			this.$parent.registerCommand("bold", () => document.execCommand("bold"));
			this.$parent.registerCommand("italic", () => document.execCommand("italic"));
			this.$parent.registerCommand("underline", () => document.execCommand("underline"));
		},

		methods: {

			onBoldClick()
			{
				this.$parent.executeCommand("bold");
			},

			onItalicClick()
			{
				this.$parent.executeCommand("italic");
			},

			onUnderlineClick()
			{
				this.$parent.executeCommand("underline");
			}

		}

	}

</script>
