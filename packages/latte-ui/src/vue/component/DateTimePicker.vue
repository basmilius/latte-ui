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
				<div class="row no-gutters">
					<div class="col-auto">
						<latte-datepicker-calendar class="panel-blank" ref="picker" :value="current" @input="setCurrent"></latte-datepicker-calendar>
					</div>
					<div class="col-auto border-left">
						<latte-timepicker-clock class="panel-blank" ref="picker" :value="current" @input="setCurrent"></latte-timepicker-clock>
					</div>
				</div>

				<div class="panel-footer">
					<latte-ripple as="button" class="btn btn-icon btn-text btn-dark" @click="setNow"><Icon name="calendar-today"/></latte-ripple>
					<latte-ripple as="button" class="btn btn-text btn-dark ml-auto" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
					<latte-ripple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></latte-ripple>
				</div>
			</template>

			<latte-tab-container class="panel" v-else>
				<latte-tab-bar></latte-tab-bar>
				<latte-tab :label="'Date' | i18n('latte-ui')">
					<latte-datepicker-calendar class="panel-blank" ref="picker" :value="current" @input="setCurrent"></latte-datepicker-calendar>
				</latte-tab>
				<latte-tab :label="'Time' | i18n('latte-ui')">
					<latte-timepicker-clock class="panel-blank" ref="picker" :value="current" @input="setCurrent"></latte-timepicker-clock>
				</latte-tab>
				<div class="panel-footer">
					<latte-ripple as="button" class="btn btn-icon btn-text btn-dark" @click="setNow"><Icon name="calendar-today"/></latte-ripple>
					<latte-ripple as="button" class="btn btn-text btn-dark ml-auto" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
					<latte-ripple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></latte-ripple>
				</div>
			</latte-tab-container>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount.vue";
	import Icon from "./base/Icon.vue";

	export default {

		components: {DateTimePickerMount, Icon},

		inheritAttrs: false,

		name: "latte-datetimepicker",

		props: {
			id: {default: "datetime", type: String},
			name: {default: "datetime", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
