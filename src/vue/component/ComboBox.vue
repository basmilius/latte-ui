<template>

	<div class="form-control combo-box" tabindex="0" @blur="close" @click="open" @keydown.down="onKeyPressDown" @keydown.enter="onKeyPressEnter" @keydown.esc="onKeyPressEscape" @keydown.up="onKeyPressUp">

		<a class="nav-link combo-box-selection" v-if="selectedOptionTemplate !== null" v-html="selectedOptionTemplate"></a>
		<div class="combo-box-empty" v-else>Select...</div>

		<button class="btn btn-text btn-icon btn-dark form-control-suffix" @click="toggle" type="button"><i class="mdi mdi-chevron-down"></i></button>

		<div class="dropdown" :class="{'is-open': isDropdownOpened}" role="combobox">
			<nav class="nav nav-list">
				<slot></slot>
			</nav>
		</div>
	</div>

</template>

<script>

	export default {

		name: "latte-combo-box",

		props: {

			value: {
				default: null,
				required: false
			}

		},

		data()
		{
			return {
				initialIndex: -1,
				isDropdownOpened: false,
				options: [],
				selectedOptionIndex: -1
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
					return option.$el.innerHTML;

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
				this.$nextTick(() => this.close());

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

<style lang="scss" scoped>
	div.combo-box
	{
		align-items: center;
		padding: 0 16px 0 0;
		z-index: unset;
	}

	a.combo-box-selection
	{
		flex: 1 1 auto;
		pointer-events: none;
	}

	button.form-control-suffix
	{
		color: rgba(var(--color-dark), .5);
		pointer-events: none;
	}

	div.dropdown
	{
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		transition: all 180ms var(--ease-swift-out);
		will-change: opacity, transform;
		z-index: 10;

		&:not(.is-open)
		{
			opacity: 0;
			pointer-events: none;
			transform: translate3d(0, 1rem, 0);
		}
	}
</style>
