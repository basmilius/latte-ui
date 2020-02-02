<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<DateTimePickerMount class="timepicker" type="time" input-format="HH:mm" :id="id" :name="name" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">

		<template v-slot="{current, isOverlay, setCurrent, setNow, cancel, select}">
			<LatteTimepickerClock ref="picker" :value="current" @input="setCurrent">
				<div class="panel-footer">
					<LatteRipple as="button" class="btn btn-icon btn-text mr-auto" @click="setNow"><Icon name="calendar-today"/></LatteRipple>
					<LatteRipple as="button" class="btn btn-text" v-if="isOverlay" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></LatteRipple>
					<LatteRipple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "OK" | i18n("latte-ui") }}</span></LatteRipple>
				</div>
			</LatteTimepickerClock>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount.vue";
	import Icon from "./Icon.vue";
	import LatteTimepickerClock from "./TimePickerClock";
	import LatteRipple from "./Ripple";

	export default {

		components: {LatteRipple, LatteTimepickerClock, DateTimePickerMount, Icon},

		inheritAttrs: false,

		name: "latte-timepicker",

		props: {
			id: {default: "time", type: String},
			name: {default: "time", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
