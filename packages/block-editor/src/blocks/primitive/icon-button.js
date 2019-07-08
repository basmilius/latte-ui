import Vue from "vue";
import { getLatte } from "../../utils";

const L = getLatte();

export const IconToggleButton = Vue.extend({

	name: "IconToggleButton",

	props: {
		icon: {type: String},
		can: {type: Function},
		press: {type: Function},
		pressed: {type: Function}
	},

	beforeDestroy()
	{
		this.tickSubscription.unsubscribe();
	},

	created()
	{
		this.tickSubscription = L.action.on("latte:tick", () =>
		{
			this.canPress = this.can();
			this.isPressed = this.pressed();
		});
	},

	data()
	{
		return {
			canPress: this.can(),
			isPressed: this.pressed(),
			tickSubscription: undefined
		};
	},

	render(h)
	{
		return h(
			"button",
			{
				class: `btn btn-icon ${this.isPressed ? "btn-soft btn-primary" : "btn-text btn-dark"}`,
				domProps: {disabled: !this.canPress},
				on: {click: evt => this.press(evt)}
			},
			[
				h("i", {class: `mdi mdi-${this.icon}`})
			]
		);
	}

});
