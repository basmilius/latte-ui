<template>

	<span class="latte-moment">{{ formatted_moment }}</span>

</template>

<script>

	export default {

		name: "latte-moment",

		props: {

			format: {
				default: "d MMMM YYYY",
				required: false,
				type: String
			},

			unixTimestamp: {
				default: () => Date.now(),
				required: false,
				type: Number
			}

		},

		computed: {

			formatted_moment()
			{
				return moment(this.unixTimestamp).format(this.format);
			}

		}
	}

</script>
