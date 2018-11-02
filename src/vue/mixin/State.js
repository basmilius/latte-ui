import { getCookie, setCookie } from "../../js/util/cookies";
import { querySelectorAll } from "../../js/util/dom";

export default new Vue({

	data()
	{
		return {
			isCompact: getCookie("$ui:collapsed") === true,
			isNavOpen: false
		};
	},

	methods: {

		toggleNav()
		{
			this.isCompact = !this.isCompact;
			this.isNavOpen = !this.isNavOpen;
		}

	},

	watch: {

		isCompact()
		{
			setCookie("$ui:collapsed", this.isCompact);

			if (this.isCompact)
				querySelectorAll("[data-ui-is-compact]").forEach(el => el.classList.add("is-compact"));
			else
				querySelectorAll("[data-ui-is-compact]").forEach(el => el.classList.remove("is-compact"));
		},

		isNavOpen()
		{
			if (this.isNavOpen)
				querySelectorAll("[data-ui-is-nav-open]").forEach(el => el.classList.add("is-nav-open"));
			else
				querySelectorAll("[data-ui-is-nav-open]").forEach(el => el.classList.remove("is-nav-open"));
		}

	}

});
