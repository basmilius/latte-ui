<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<DateTimePickerMount class="timepicker" type="time" input-format="HH:mm" :id="id" :name="name" :placeholder="placeholder" v-bind="$attrs" v-on="$listeners">

		<template v-slot="{current, setCurrent, setNow, cancel, select}">
			<latte-timepicker-clock ref="picker" :value="current" @input="setCurrent">
				<div class="panel-footer">
					<latte-ripple as="button" class="btn btn-icon btn-text btn-dark" @click="setNow"><i class="mdi mdi-calendar-today"></i></latte-ripple>
					<latte-ripple as="button" class="btn btn-text btn-dark ml-auto" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
					<latte-ripple as="button" class="btn btn-contained btn-primary" @click="select"><i class="mdi mdi-check-circle"></i><span>{{ "Set" | i18n("latte-ui") }}</span></latte-ripple>
				</div>
			</latte-timepicker-clock>
		</template>

	</DateTimePickerMount>

</template>

<script>

	import DateTimePickerMount from "./base/DateTimePickerMount";

	export default {

		components: {DateTimePickerMount},

		inheritAttrs: false,

		name: "latte-timepicker",

		props: {
			id: {default: "time", type: String},
			name: {default: "time", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
