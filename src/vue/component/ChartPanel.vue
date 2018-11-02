<template>

	<div class="panel">
		<div class="panel-header">
			<span class="panel-title">{{ name }}</span>
			<latte-button-dropdown class="ml-auto" icon="dots-vertical" type="list">
				<nav class="nav latte-nav-list">
					<a @click="$refs['chart'].loadChart()" class="nav-link"><i class="mdi mdi-refresh"></i> <span>Refresh chart</span></a>
				</nav>
			</latte-button-dropdown>
		</div>
		<latte-chart ref="chart" :url="url" @change="onChange"></latte-chart>
	</div>

</template>

<script>

	export default {

		name: "latte-chart-panel",

		props: {

			url: {
				required: true,
				type: String
			}

		},

		data()
		{
			return {
				name: ""
			};
		},

		methods: {

			onChange(data)
			{
				this.name = data.name;
			}

		}

	}

</script>
