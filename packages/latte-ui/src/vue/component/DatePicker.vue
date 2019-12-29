<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<DateTimePickerMount class="datepicker" type="date" input-format="YYYY-MM-DD" :id="id" :name="name" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">

		<template v-slot="{current, setCurrent, setNow, cancel, select}">
			<LatteDatepickerCalendar ref="picker" :value="current" @input="setCurrent">

				<template v-slot="{isOverlay, selectedView}">
					<div class="panel-footer" v-if="selectedView === 'dates'">
						<LatteRipple as="button" class="btn btn-icon btn-text mr-auto" @click="setNow"><Icon name="calendar-today"/></LatteRipple>
						<LatteRipple as="button" class="btn btn-text" @click="cancel" v-if="isOverlay"><span>{{ "Cancel" | i18n("latte-ui") }}</span></LatteRipple>
						<LatteRipple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></LatteRipple>
					</div>
				</template>

			</LatteDatepickerCalendar>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount.vue";
	import Icon from "./Icon.vue";
	import LatteDatepickerCalendar from "./DatePickerCalendar";
	import LatteRipple from "./Ripple";

	export default {

		components: {LatteRipple, LatteDatepickerCalendar, Icon, DateTimePickerMount},

		inheritAttrs: false,

		name: "latte-datepicker",

		props: {
			id: {default: "date", type: String},
			name: {default: "date", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
