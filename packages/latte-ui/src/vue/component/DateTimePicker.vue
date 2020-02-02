<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<DateTimePickerMount class="datetimepicker" type="datetime-local" input-format="YYYY-MM-DD[T]HH:mm" :id="id" :name="name" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">

		<template v-slot="{current, setCurrent, setNow, isOverlay, cancel, select}">
			<template v-if="!isOverlay">
				<div class="panel-body row no-gutters p-0">
					<div class="col-auto">
						<LatteDatepickerCalendar class="panel-blank" ref="picker" :value="current" @input="setCurrent"></LatteDatepickerCalendar>
					</div>
					<div class="col-auto border-left">
						<LatteTimepickerClock class="panel-blank" ref="picker" :value="current" @input="setCurrent"></LatteTimepickerClock>
					</div>
				</div>

				<div class="panel-footer">
					<LatteRipple as="button" class="btn btn-icon btn-text mr-auto" @click="setNow"><Icon name="calendar-today"/></LatteRipple>
					<LatteRipple as="button" class="btn btn-text" v-if="isOverlay" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></LatteRipple>
					<LatteRipple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></LatteRipple>
				</div>
			</template>

			<LatteTabContainer class="panel" v-else>
				<LatteTabBar></LatteTabBar>
				<LatteTab class="panel-body p-0" :label="'Date' | i18n('latte-ui')">
					<LatteDatepickerCalendar class="panel-blank" ref="picker" :value="current" @input="setCurrent"></LatteDatepickerCalendar>
				</LatteTab>
				<LatteTab class="panel-body p-0" :label="'Time' | i18n('latte-ui')">
					<LatteTimepickerClock class="panel-blank" ref="picker" :value="current" @input="setCurrent"></LatteTimepickerClock>
				</LatteTab>
				<div class="panel-footer">
					<LatteRipple as="button" class="btn btn-icon btn-text mr-auto" @click="setNow"><Icon name="calendar-today"/></LatteRipple>
					<LatteRipple as="button" class="btn btn-text" v-if="isOverlay" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></LatteRipple>
					<LatteRipple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></LatteRipple>
				</div>
			</LatteTabContainer>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount.vue";
	import Icon from "./Icon.vue";
	import LatteDatepickerCalendar from "./DatePickerCalendar";
	import LatteTimepickerClock from "./TimePickerClock";
	import LatteRipple from "./Ripple";
	import LatteTabContainer from "./TabContainer";
	import LatteTabBar from "./TabBar";
	import LatteTab from "./Tab";

	export default {

		components: {LatteTab, LatteTabBar, LatteTabContainer, LatteRipple, LatteTimepickerClock, LatteDatepickerCalendar, DateTimePickerMount, Icon},

		inheritAttrs: false,

		name: "latte-datetimepicker",

		props: {
			id: {default: "datetime", type: String},
			name: {default: "datetime", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
