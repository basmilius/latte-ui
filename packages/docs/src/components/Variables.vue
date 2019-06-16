<template>

	<div class="panel">
		<div class="panel-header"><h2 class="panel-title m-0">{{ title }}</h2></div>
		<table class="table">
			<thead>
			<tr>
				<th style="width: 270px">
					<div class="column-content"><strong>Property</strong></div>
				</th>
				<th>
					<div class="column-content"><strong>Default value</strong></div>
				</th>
			</tr>
			</thead>
			<tbody class="text-monospace" style="font-size: .8rem">

			<template v-for="v of vars">
				<tr>
					<td>
						<div class="column-content">{{ v.name }}</div>
					</td>
					<td>
						<div class="column-content">

							<template v-if="v.type === 'int' || v.type === 'string'">
								{{ v.default }}
							</template>

							<template v-else-if="v.type === 'rgb'">
								<RgbDisplay :rgb="v.default"/>
							</template>

							<template v-else-if="v.type === 'none'">
								<i>None</i>
							</template>

						</div>
					</td>
				</tr>
			</template>

			</tbody>
		</table>
	</div>

</template>

<script>

	import RgbDisplay from "./RgbDisplay";

	export default {

		name: "Variables",

		components: {RgbDisplay},

		props: {

			title: {
				default: "Properties",
				required: false,
				type: String
			},

			vars: {
				default: [],
				required: true,
				type: Array
			}

		}

	}

</script>

<style lang="scss" scoped>

	div.panel
	{
		--table-padding: 12px 30px;
	}

</style>
