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

		name: "RTEAlignmentPlugin",

		mounted()
		{
			this.$parent.addToolbarAction("align-left", "format-align-left", "Left", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-center", "format-align-center", "Center", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-right", "format-align-right", "Right", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-justify", "format-align-justify", "Justify", 0, {groupId: "alignment"});

			this.$parent.$on("toolbar-action:align-left", () => this.$parent.executeCommand("align-left"));
			this.$parent.$on("toolbar-action:align-center", () => this.$parent.executeCommand("align-center"));
			this.$parent.$on("toolbar-action:align-right", () => this.$parent.executeCommand("align-right"));
			this.$parent.$on("toolbar-action:align-justify", () => this.$parent.executeCommand("align-justify"));

			this.$parent.registerCommand("align-left", () => document.execCommand("justifyLeft"));
			this.$parent.registerCommand("align-center", () => document.execCommand("justifyCenter"));
			this.$parent.registerCommand("align-right", () => document.execCommand("justifyRight"));
			this.$parent.registerCommand("align-justify", () => document.execCommand("justifyFull"));
		},

		render(h)
		{
			return h("div");
		}

	}

</script>
