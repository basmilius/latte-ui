<template>

	<nav class="nav nav-tabs">
		<a class="nav-link" :class="{'is-active': tab.active}" @click="click(index)" v-for="(tab, index) in tabs">
			<i class="mdi" :class="'mdi-' + tab.icon" v-if="tab.icon !== ''"></i>
			<span v-if="tab.label !== ''">{{ tab.label }}</span>
		</a>
	</nav>

</template>

<script>

	export default {

		name: "latte-tab-bar",

		data()
		{
			return {
				tabs: []
			};
		},

		methods: {

			click(index)
			{
				this.$parent.current = index;
			}

		}

	}

</script>
