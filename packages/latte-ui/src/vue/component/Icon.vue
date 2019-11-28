<script>

	import { icon } from "../../js/core";

	export default {

		name: "latte-icon",

		props: {
			name: {type: String},
			options: {default: () => ({}), type: Object}
		},

		render(h)
		{
			let iconName = this.name;

			if (this.$slots.default && this.$slots.default[0])
				iconName = this.$slots.default[0].text;

			return icon(iconName, h, this.options);
		}

	}

</script>
