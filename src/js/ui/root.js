/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

export const rootElement = document.querySelector("body");

/**
 * Creates the root component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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

/**
 * Installs our service worker.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function installServiceWorker()
{
	if (!('serviceWorker' in navigator))
		return;

	if (!window.isSecureContext)
		return;

	navigator.serviceWorker.getRegistration().then(registration =>
	{
		if (registration !== undefined)
			return registration.update();

		navigator.serviceWorker.register('/service-worker.min.js')
			.then(() => console.debug("Service Worker installed!"))
			.catch(err => console.error("Service Worker not installed due to an error.", err));
	});
}

/**
 * Invoked when the url hash is changed.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
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

	window.dispatchEvent(new CustomEvent("latte:hash-change", {detail: parameters}));
}

/**
 * Removes saved=1 from the query string.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function removeQueryString()
{
	let queryString = window.location.search.substr(1);

	if (queryString === "")
		return;

	if (queryString.substr(0, 6) === "saved=")
		history.replaceState(null, '', window.location.pathname || window.location.path);
}
