<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<DateTimePickerMount class="timepicker" type="time" input-format="HH:mm" v-bind="$attrs" v-on="$listeners">

		<template v-slot="{current, setCurrent, cancel, select}">
			<latte-timepicker-clock ref="picker" :value="current" @input="setCurrent">
				<div class="panel-footer justify-content-end">
					<latte-ripple as="button" class="btn btn-text btn-dark" @click="cancel"><span>{{ "Cancel" | i18n("latte-ui") }}</span></latte-ripple>
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

		name: "latte-timepicker",

		props: {
			id: {default: "time", type: String},
			name: {default: "time", type: String},
			placeholder: {default: "", type: String}
		}

	}

</script>
