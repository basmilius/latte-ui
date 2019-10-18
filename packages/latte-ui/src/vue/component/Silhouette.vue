<script>

	export default {

		name: "latte-silhouette",

		props: {
			as: {default: "div", type: String}
		},

		render(h)
		{
			return h(this.as, {
				class: "silhouette"
			});
		}

	}

</script>
