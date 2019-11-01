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
