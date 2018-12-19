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

		name: "RTEAlignmentPlugin",

		mounted()
		{
			this.$parent.addToolbarAction("align-left", "format-align-left", "Left", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-center", "format-align-center", "Center", 0, {groupId: "alignment"});
			this.$parent.addToolbarAction("align-right", "format-align-right", "Right", 0, {groupId: "alignment"});
		}

	}

</script>
