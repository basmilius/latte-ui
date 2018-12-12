"use strict";

import { dispatch, on } from "../actions";
import { getCookie, setCookie } from "../util/cookies";
import { interval } from "../core";

export function createRootComponent()
{
	document.body.dataset.theme = document.body.dataset.theme || getCookie("$ui:theme") || "light";

	return new Vue({

		el: "main#app",

		created()
		{
			on("latte:switch-theme", data => this.onSwitchTheme(data));

			window.addEventListener("hashchange", onHashChange, false);
		},

		data()
		{
			return {
				any: {}
			};
		},

		mounted()
		{
			initializeTick();
			onHashChange();
			removeQueryString();
		},

		methods: {

			onSwitchTheme(data)
			{
				if (!("themeId" in data))
					return;

				const {themeId} = data;

				document.body.dataset.theme = themeId;
				setCookie("$ui:theme", themeId);
			}

		}

	});
}

function initializeTick()
{
	interval(100, () => dispatch("latte:tick", window.performance.now()));
}

function onHashChange()
{
	const hash = location.hash.substr(1);

	if (!hash || hash.length === 0)
		return;

	const params = {};

	const data = new URLSearchParams(hash);

	data.forEach((value, key) =>
	{
		let vars = {};

		if (value.indexOf("/") > -1)
		{
			const ad = value.split("/");
			value = ad.shift();

			for (let d of ad)
			{
				const kv = d.split(":", 2);
				vars[kv[0]] = kv[1];
			}
		}

		params[key] = {value, vars};
	});

	dispatch("latte:hash-change", params)
}

function removeQueryString()
{
	let queryString = window.location.search.substr(1);

	if (queryString === "")
		return;

	if (queryString.substr(0, 6) === "saved=")
		history.replaceState(null, '', window.location.pathname || window.location.path);
}
