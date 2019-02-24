<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<nav class="pagination ml-auto" role="navigation">
		<template v-for="entry in pagination">
			<a @click="navigate(entry.page)" class="pagination-item" :class="{'is-current': entry.is_current, 'is-disabled': entry.is_disabled}" role="menuitem">
				<template v-if="entry.is_dots">&hellip;</template>
				<template v-else-if="entry.label === 'first'"><i class="mdi mdi-chevron-double-left"></i></template>
				<template v-else-if="entry.label === 'prev'"><i class="mdi mdi-chevron-left"></i></template>
				<template v-else-if="entry.label === 'next'"><i class="mdi mdi-chevron-right"></i></template>
				<template v-else-if="entry.label === 'last'"><i class="mdi mdi-chevron-double-right"></i></template>
				<template v-else>{{ entry.label }}</template>
			</a>
		</template>
	</nav>

</template>

<script>

	export default {

		name: "latte-pagination",

		props: {

			pagination: {
				type: Array,
				required: true
			}

		},

		methods: {

			navigate(page)
			{
				this.$emit("navigate", page);
			}

		}

	}

</script>