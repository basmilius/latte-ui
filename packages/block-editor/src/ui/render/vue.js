import Vue from "vue";

export function simpleRender(h, template)
{
	return h(Vue.extend({
		template
	}));
}
