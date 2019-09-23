<template>

	<section class="titled my-5" id="just-in" :style="sectionStyles">
		<h2 :style="titleStyles">{{ title }}</h2>
		<slot></slot>
	</section>

</template>

<script>

	export default {

		name: "FrontpageSection",

		props: {
			color: {required: true, type: String},
			title: {required: true, type: String}
		},

		computed: {

			sectionStyles()
			{
				return {
					"--btn-background": `var(${this.color})`
				};
			},

			titleStyles()
			{
				return {
					color: `rgba(var(${this.color}), 1)`
				};
			}

		}

	}

</script>
