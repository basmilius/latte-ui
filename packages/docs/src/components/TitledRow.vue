<template>

	<div class="container">
		<div class="row">
			<div class="col-12 mb-4">
				<h4 class="font-weight-normal m-0">{{ title }}</h4>
			</div>
		</div>
		<div class="row">
			<slot></slot>
		</div>
	</div>

</template>

<script>

	export default {

		name: "TitledRow",

		props: {
			title: {default: "Title", type: String}
		}

	}

</script>
