<script>

	import { icon } from "../../../js/core";

	export default {

		name: "Icon",

		props: {
			name: {required: true, type: String},
			options: {default: () => ({}), type: Object}
		},

		render(h)
		{
			return icon(this.name, h, this.options);
		}

	}

</script>
