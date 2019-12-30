<template>

	<latte-tab-container class="panel overflow-auto text-left" style="z-index: 0">

		<latte-tab-bar style="position: sticky; left: 0"></latte-tab-bar>

		<latte-tab label="Properties" v-if="properties">
			<table class="table">
				<thead>
				<tr>
					<th></th>
					<th></th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				<template v-for="property of properties">

					<tr>
						<td style="min-width: 300px">
							<div class="column-content justify-content-start">
								<small class="text-muted">Name</small>
								<strong class="text-monospace">{{ property.name }} <span class="badge badge-info" style="font-size: .6rem" v-if="property.required">required</span></strong>
								<span class="text-muted" v-if="property.description">{{ property.description }}</span>
							</div>
						</td>
						<td>
							<div class="column-content justify-content-start">
								<small class="text-muted">Type</small>
								<strong class="text-monospace">{{ property.type }}</strong>
							</div>
						</td>
						<td>
							<div class="column-content justify-content-start">
								<small class="text-muted">Default</small>
								<strong class="text-monospace" v-if="property.default === null">NULL</strong>
								<strong class="text-monospace" v-else>{{ property.default }}</strong>
							</div>
						</td>
					</tr>

				</template>
				</tbody>
			</table>
		</latte-tab>

		<latte-tab label="CSS-vars" v-if="variables">
			<table class="table">
				<template v-for="variable of variables">

					<tr>
						<td style="min-width: 300px">
							<div class="column-content justify-content-start">
								<small class="text-muted">Name</small>
								<strong class="text-monospace">{{ variable.name }}</strong>
								<span class="text-muted" v-if="variable.description">{{ variable.description }}</span>
							</div>
						</td>
						<td>
							<div class="column-content justify-content-start">
								<small class="text-muted">Type</small>
								<strong class="text-monospace">{{ variable.type }}</strong>
							</div>
						</td>
						<td>
							<div class="column-content justify-content-start">
								<small class="text-muted">Default</small>
								<em v-if="variable.default === null">NULL</em>
								<RgbDisplay class="font-weight-bold text-monospace" :rgb="variable.default" v-else-if="variable.type === 'rgb'"/>
								<strong class="text-monospace" v-else>{{ variable.default }}</strong>
							</div>
						</td>
					</tr>

				</template>
			</table>
		</latte-tab>

		<latte-tab label="Events" v-if="events">
			<table class="table">
				<template v-for="event of events">

					<tr>
						<td style="min-width: 300px">
							<div class="column-content justify-content-start">
								<small class="text-muted">Name</small>
								<strong class="text-monospace">{{ event.name }}</strong>
								<span class="text-muted" v-if="event.description">{{ event.description }}</span>
							</div>
						</td>
						<td>
							<div class="column-content justify-content-start">
								<small class="text-muted">Signature</small>
								<strong class="text-monospace">{{ event.signature }}</strong>
							</div>
						</td>
					</tr>

				</template>
			</table>
		</latte-tab>

		<latte-tab label="Slots" v-if="slots">
			{{ slots }}
		</latte-tab>

	</latte-tab-container>

</template>

<script>

	import RgbDisplay from "./RgbDisplay";

	export default {

		name: "ApiExplorer",

		components: {RgbDisplay},

		props: {
			events: {default: undefined, type: Array},
			properties: {default: undefined, type: Array},
			slots: {default: undefined, type: Array},
			variables: {default: undefined, type: Array}
		}

	}

</script>
