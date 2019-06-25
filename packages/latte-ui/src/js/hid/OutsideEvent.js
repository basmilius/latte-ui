/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { closest, getCoords } from "../util/dom";

class OutsideEvent
{

	constructor(source)
	{
		this.listeners = [];
		this.source = source;
	}

	addEventListener(type, listener, options = {})
	{
		listener.id = this.listeners.length;

		this.listeners.push(listener);

		const fn = evt =>
		{
			if (this.isWithinSource(evt))
				return;

			listener.apply(this.source, evt);
		};

		document.addEventListener(type, fn, options);
	}

	clearListeners()
	{
		this.listeners = [];
	}

	removeEventListener(type, listener, options = {})
	{
		const index = this.listeners.findIndex(l => l.id === listener.id);

		if (index === -1)
			return;

		document.removeEventListener(type, this.listeners[index], options);

		this.listeners.splice(index, 1);
	}

	isWithinSource(evt)
	{
		const coords = getCoords(evt);

		return coords !== undefined && closest(document.elementFromPoint(coords.x, coords.y), this.source) !== null;
	}

}

export function registerOutsideEvents()
{
	EventTarget.prototype.addOutsideEventListener = function (type, listener, options = {})
	{
		if (this.outsideEvent === undefined)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.addEventListener(type, listener, options);
	};

	EventTarget.prototype.clearOutsideEventListeners = function ()
	{
		if (this.outsideEvent === undefined)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.clearListeners();
	};

	EventTarget.prototype.removeOutsideEventListener = function (type, listener, options = {})
	{
		if (this.outsideEvent === undefined)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.removeEventListener(type, listener, options);
	};
}
