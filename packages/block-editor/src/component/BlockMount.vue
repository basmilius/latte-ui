<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="be-block-mount" :class="{'is-selected': instance.isSelected, 'is-selection-inside': instance.isSelectionInside}">
		<slot></slot>
	</div>

</template>

<script>

	import { BlockInstance } from "../core/block/instance";

	export default {

		name: "BlockMount",

		props: {
			instance: {required: true, type: BlockInstance}
		}

	}

</script>
