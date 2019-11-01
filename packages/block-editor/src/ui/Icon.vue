<script>

	export default {

		name: "Icon",

		props: {
			name: {required: true, type: String}
		},

		render(h)
		{
			return h("i", {class: ["mdi", `mdi-${this.name}`]});
		}

	}

</script>
