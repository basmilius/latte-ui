<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="form-control combo-box" tabindex="0" @blur="close" @click="toggle" @keydown.down="onKeyPressDown" @keydown.enter="onKeyPressEnter" @keydown.esc="onKeyPressEscape" @keydown.up="onKeyPressUp">
		<a class="combo-box-selection" :class="selectedOptionClasses" v-if="selectedOptionTemplate !== null" v-html="selectedOptionTemplate"></a>
		<div class="combo-box-empty" v-else>Select...</div>

		<button class="btn btn-text btn-icon btn-dark form-control-suffix" type="button">
			<Icon name="chevron-down"/>
		</button>

		<div class="popup" :class="{'is-open': isDropdownOpened}" role="combobox">
			<div class="popup-body">
				<nav class="nav nav-list">
					<slot></slot>
				</nav>
			</div>
		</div>
	</div>

</template>

<script>

	import { raf } from "../../js/util/dom";
	import Icon from "./base/Icon.vue";

	export default {

		components: {Icon},

		name: "latte-combo-box",

		props: {
			value: {default: null}
		},

		data()
		{
			return {
				initialIndex: -1,
				isDropdownOpened: false,
				options: [],
				selectedOptionIndex: -1,
				selectedOptionClasses: []
			};
		},

		computed: {

			selectedOption()
			{
				const option = this.options[this.selectedOptionIndex];

				if (option !== undefined)
					return option;

				return null;
			},

			selectedOptionTemplate()
			{
				const option = this.selectedOption;

				if (option !== null)
				{
					this.selectedOptionClasses = [...option.$el.classList];

					return option.$el.innerHTML;
				}

				return null;
			}

		},

		methods: {

			close()
			{
				this.initialIndex = -1;
				this.isDropdownOpened = false;
			},

			open()
			{
				this.initialIndex = this.selectedOptionIndex;
				this.isDropdownOpened = true;
			},

			toggle()
			{
				this.isDropdownOpened = !this.isDropdownOpened;
			},

			checkValue()
			{
				this.selectedOptionIndex = this.options.findIndex(option => option.value === this.value);
			},

			registerOption(option)
			{
				this.options.push(option);
				this.checkValue();

				option.$on("select", option => this.onOptionSelect(option));
			},

			unregisterOption(option)
			{
				this.options.splice(this.options.findIndex(o => o === option), 1);
				this.checkValue();
			},

			onKeyPressDown()
			{
				this.open();

				if (this.selectedOptionIndex + 1 >= this.options.length)
					this.selectedOptionIndex = 0;
				else
					this.selectedOptionIndex++;
			},

			onKeyPressEnter()
			{
				this.close();
			},

			onKeyPressEscape(evt)
			{
				if (this.initialIndex !== -1)
					this.selectedOptionIndex = Math.min(Math.max(0, this.initialIndex), this.options.length - 1);

				this.close();

				evt.preventDefault();
			},

			onKeyPressUp()
			{
				this.open();

				if (this.selectedOptionIndex - 1 < 0)
					this.selectedOptionIndex = this.options.length - 1;
				else
					this.selectedOptionIndex--;
			},

			onOptionSelect(option)
			{
				raf(() => this.close(), 50);

				this.selectedOptionIndex = this.options.findIndex(o => o === option);
			}

		},

		watch: {

			selectedOptionIndex()
			{
				this.options.forEach(option => this.$set(option, "active", false));

				if (this.selectedOption !== null)
				{
					this.$emit("input", this.selectedOption.value);
					this.$set(this.selectedOption, "active", true);
				}
				else
				{
					this.$emit("input", null);
				}
			},

			value()
			{
				this.checkValue();
			}

		}

	}

</script>
