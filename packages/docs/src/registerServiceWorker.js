/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production")
{
	register(`${process.env.BASE_URL}service-worker.js`, {

		ready()
		{
			console.log("App is being served from cache by a service worker. For more details, visit https://goo.gl/AFskqB");
		},

		registered()
		{
			console.log("Service worker has been registered.");
		},

		cached()
		{
			console.log("Content has been cached for offline use.");
		},

		updatefound()
		{
			console.log("New content is downloading.");
		},

		updated()
		{
			console.log("New content is available; please refresh.");
		},

		offline()
		{
			console.log("No internet connection found. App is running in offline mode.");
		},

		error(error)
		{
			console.error("Error during service worker registration:", error);
		}

	});
}
