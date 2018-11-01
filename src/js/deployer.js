/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { timeout } from "./util/core.js";
import { createElement, querySelectorAll } from "./util/dom.js";

class Connection
{

	constructor()
	{
		this.connected = false;
		this.connection = null;
		const ui = this.ui = new UI();

		this.handlers = {

			"com.basmilius.ideemedia.identitydeploy.message.HELLO"(data)
			{
				ui.notify(`Successfully connected to ${data}!`, 500);
			},

			"com.basmilius.ideemedia.identitydeploy.message.SCSS.WATCHER.COMPILE_ERROR"(data)
			{
				ui.notify(data["Message"], 10000);
			},

			"com.basmilius.ideemedia.identitydeploy.message.SCSS.WATCHER.COMPILED_A_FILE"(data)
			{
				timeout(1100, () =>
				{
					const stylesheets = querySelectorAll("link[rel=stylesheet]");

					stylesheets.forEach(stylesheet =>
					{
						const href = stylesheet.href;

						if ((href || "").indexOf(data["file"]) > -1)
						{
							stylesheet.setAttribute("href", `${data["file"]}?led=${Date.now()}`);
							ui.notify(`Stylesheet update: ${data["file"]}`, 2000);
						}
					});
				});
			}

		};
	}

	connect()
	{
		this.connection = new WebSocket("ws://127.0.0.1:1303/live-update");
		this.connection.addEventListener("close", evt => this.onClose(evt));
		this.connection.addEventListener("message", evt => this.onMessage(evt));
		this.connection.addEventListener("open", () => this.onOpen());
	}

	onClose(evt)
	{
		this.connected = false;

		if (!this.connected)
			this.ui.notify("Could not connect to the Live Update server!");
		else
			this.ui.notify(`${evt.code}: ${evt.reason}`);
	}

	onMessage(evt)
	{
		const data = evt.data;
		const json = JSON.parse(data);

		if (typeof json.id !== "undefined" && typeof this.handlers[json.id] !== "undefined")
			this.handlers[json.id](json.data);
	}

	onOpen()
	{
		this.connected = true;
	}

}

class UI
{

	constructor()
	{
		this.timeout = null;
		this.notification = createElement("div", div =>
		{
			div.style.setProperty("position", "fixed");
			div.style.setProperty("display", "block");
			div.style.setProperty("right", "24px");
			div.style.setProperty("bottom", "24px");
			div.style.setProperty("padding", "12px 18px");
			div.style.setProperty("background", "rgba(38, 42, 45, .95)");
			div.style.setProperty("border-radius", "2px");
			div.style.setProperty("color", "#ffffff");
			div.style.setProperty("font-family", "'Operator Mono', Courier");
			div.style.setProperty("font-size", "13px");
			div.style.setProperty("font-weight", "400");
			div.style.setProperty("opacity", "0");
			div.style.setProperty("outline", "2px solid rgba(255, 255, 255, .6)");
			div.style.setProperty("pointer-events", "none");
			div.style.setProperty("transition", "opacity 60ms cubic-bezier(.55, 0, .1, 1)");
			div.style.setProperty("vertical-align", "middle");
			div.style.setProperty("white-space", "pre-line");
			div.style.setProperty("z-index", "999999999");

			document.body.appendChild(div);
		});
	}

	hide()
	{
		this.notification.style.opacity = "0";
	}

	notify(message, duration = 1000)
	{
		this.notification.innerHTML = message;
		this.show();

		if (this.timeout !== null)
			window.clearTimeout(this.timeout);

		this.timeout = timeout(duration, () => this.remove());
	}

	remove()
	{
		this.timeout = null;
		this.hide();
	}

	show()
	{
		this.notification.style.opacity = "1";
	}

}

export function initializeDeployer()
{
	const connection = new Connection();
	connection.connect();
}
