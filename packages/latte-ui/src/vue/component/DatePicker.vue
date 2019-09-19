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
			<latte-datepicker-calendar ref="picker" :value="current" @input="setCurrent">

				<template v-slot="{selectedView}">
					<div class="panel-footer" v-if="selectedView === 'dates'">
						<latte-ripple as="button" class="btn btn-icon btn-text btn-dark" @click="setNow"><Icon name="calendar-today"/></latte-ripple>
						<latte-ripple as="button" class="btn btn-text btn-dark ml-auto" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
						<latte-ripple as="button" class="btn btn-contained btn-primary" @click="select"><Icon name="check-circle"/><span>{{ "Set" | i18n("latte-ui") }}</span></latte-ripple>
					</div>
				</template>

			</latte-datepicker-calendar>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount.vue";
	import Icon from "./base/Icon.vue";

	export default {

		components: {Icon, DateTimePickerMount},

		inheritAttrs: false,

		name: "latte-datepicker",

		props: {
			id: {default: "date", type: String},
			name: {default: "date", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
