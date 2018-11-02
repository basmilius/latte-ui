"use strict";

import { dispatch } from "../actions";

export function createRootComponent()
{
	return new Vue({

		el: "main#app",

		mounted()
		{
			installServiceWorker();
			onHashChange();
			removeQueryString();

			window.addEventListener("hashchange", onHashChange, false);
		}

	});
}

function installServiceWorker()
{
	if (!("LatteSW" in window))
		return;

	if (!("serviceWorker" in navigator))
		return;

	if (!window.isSecureContext)
		return;

	navigator.serviceWorker.getRegistration().then(registration =>
	{
		if (registration !== undefined)
			return registration.update();

		navigator.serviceWorker.register("/service-worker.js")
			.then(() => console.debug("Service Worker installed!"))
			.catch(err => console.error("Service Worker not installed due to an error.", err));
	});
}

function onHashChange()
{
	const hash = location.hash.substr(1);

	if (!hash || hash.length === 0)
		return;

	const raw = hash.split("&");
	const parameters = {};

	for (let item of raw)
	{
		const kv = item.split("=", 2);
		let value = kv[1] || null;
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

		parameters[kv[0]] = {value, vars};
	}

	dispatch("latte:hash-change", parameters)
}

function removeQueryString()
{
	let queryString = window.location.search.substr(1);

	if (queryString === "")
		return;

	if (queryString.substr(0, 6) === "saved=")
		history.replaceState(null, '', window.location.pathname || window.location.path);
}
