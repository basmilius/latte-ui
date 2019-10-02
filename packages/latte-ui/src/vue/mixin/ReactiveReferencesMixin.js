import Vue from "vue";

export default {

	beforeCreate()
	{
		const { refs } = this.$options;

		if (!refs)
			return;

		this.$refs = Vue.observable(refs.reduce(($refs, key) =>
		{
			$refs[key] = undefined;
			return $refs;
		}, {}));
	}

};
