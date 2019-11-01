<template>

	<div class="be-block-description">
		<Icon :name="block.icon"/>
		<div class="caption">
			<strong>{{ block.name | beTranslate }}</strong>
			<p class="text-muted">{{ block.description | beTranslate }}</p>
		</div>
	</div>

</template>

<script>

	import { Block } from "../core/block/block";

	import Icon from "./Icon";

	export default {

		name: "BlockDescription",

		components: {Icon},

		props: {
			block: {required: true, type: Block}
		}

	}

</script>
